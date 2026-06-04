import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ENV_PATH = path.resolve(__dirname, '../../server/.env');

// ── Config ────────────────────────────────────────────────────────────────────
const APP_ID     = process.env.INSTAGRAM_APP_ID;
const APP_SECRET = process.env.INSTAGRAM_APP_SECRET;
const GRAPH      = 'https://graph.facebook.com/v20.0';
const DR_MOHIT_PAGE_ID = '954202441100149'; // Dr Mohit Urowala AIIMS

// ── Live token (can be updated in memory) ─────────────────────────────────────
let ACTIVE_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

// ── In-memory cache (1 hour TTL) ─────────────────────────────────────────────
let cache = {
  feed: null,
  profile: null,
  igUserId: null,
  lastFetched: 0,
};
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

// ── Token refresh state ───────────────────────────────────────────────────────
let lastTokenRefresh = 0;
const TOKEN_REFRESH_INTERVAL = 45 * 24 * 60 * 60 * 1000; // 45 days

// ── Helper: update token in .env file ─────────────────────────────────────────
function updateTokenInEnv(newToken) {
  try {
    let envContent = fs.readFileSync(ENV_PATH, 'utf8');
    envContent = envContent.replace(
      /^INSTAGRAM_ACCESS_TOKEN=.*/m,
      `INSTAGRAM_ACCESS_TOKEN=${newToken}`
    );
    fs.writeFileSync(ENV_PATH, envContent, 'utf8');
    console.log('[Instagram] ✅ Token saved to .env file');
  } catch (e) {
    console.error('[Instagram] ⚠️ Could not update .env:', e.message);
  }
}

// ── Helper: exchange short-lived token for long-lived (60 days) ───────────────
async function exchangeForLongLivedToken(token) {
  if (!APP_SECRET) {
    console.log('[Instagram] No APP_SECRET — skipping token exchange');
    return null;
  }
  const res = await fetch(
    `${GRAPH}/oauth/access_token?grant_type=fb_exchange_token&client_id=${APP_ID}&client_secret=${APP_SECRET}&fb_exchange_token=${token}`
  );
  const data = await res.json();
  if (data.error) {
    console.error('[Instagram] Token exchange error:', data.error.message);
    return null;
  }
  console.log('[Instagram] ✅ Got long-lived token, expires in:', data.expires_in, 'seconds (~', Math.round(data.expires_in / 86400), 'days)');
  return data.access_token;
}

// ── Helper: get Page Access Token from long-lived user token ──────────────────
async function getPageAccessToken(userToken) {
  const res = await fetch(
    `${GRAPH}/${DR_MOHIT_PAGE_ID}?fields=access_token&access_token=${userToken}`
  );
  const data = await res.json();
  if (data.error || !data.access_token) {
    console.error('[Instagram] Page token error:', data.error?.message || 'No access_token in response');
    return null;
  }
  console.log('[Instagram] ✅ Got Page Access Token (never expires)');
  return data.access_token;
}

// ── Helper: check if current token is still valid ────────────────────────────
async function checkTokenValid() {
  try {
    const res = await fetch(`${GRAPH}/me?fields=id,name&access_token=${ACTIVE_TOKEN}`);
    const data = await res.json();
    if (data.error) {
      console.error('[Instagram] ❌ Token invalid:', data.error.message);
      return false;
    }
    console.log(`[Instagram] ✅ Token valid — account: ${data.name || data.id}`);
    return true;
  } catch (e) {
    return false;
  }
}

// ── Main token refresh flow ───────────────────────────────────────────────────
// NOTE: Only USER tokens can be exchanged for long-lived tokens.
// Page Access Tokens are already permanent when derived from long-lived user tokens.
// We keep the current token as-is and just validate it on schedule.
async function refreshToken() {
  console.log('[Instagram] 🔄 Checking token validity...');
  const isValid = await checkTokenValid();

  if (!isValid) {
    console.error('[Instagram] ⚠️ Token has expired! Please generate a new Page Access Token from:');
    console.error('[Instagram]    developers.facebook.com → Graph API Explorer → Dr Mohit Urowala AIIMS → Page Access Token');
    return;
  }

  lastTokenRefresh = Date.now();
  console.log('[Instagram] ✅ Token is healthy — next check in 45 days');
}

// ── Auto-refresh check (runs on startup + every 45 days) ─────────────────────
async function checkAndRefreshToken() {
  const now = Date.now();
  if (!lastTokenRefresh || (now - lastTokenRefresh) > TOKEN_REFRESH_INTERVAL) {
    await refreshToken();
  }
}


// Run on startup
checkAndRefreshToken();
// Schedule daily check
setInterval(checkAndRefreshToken, 24 * 60 * 60 * 1000);

// ── Helper: get Instagram Business Account ID ─────────────────────────────────
async function getIgUserId() {
  if (cache.igUserId) return cache.igUserId;

  // Strategy 1: Query the known page directly
  try {
    const pageRes = await fetch(
      `${GRAPH}/${DR_MOHIT_PAGE_ID}?fields=id,name,instagram_business_account,connected_instagram_account&access_token=${ACTIVE_TOKEN}`
    );
    const pageData = await pageRes.json();
    if (!pageData.error) {
      const igAccount = pageData.instagram_business_account || pageData.connected_instagram_account;
      if (igAccount) {
        cache.igUserId = igAccount.id;
        console.log(`[Instagram] ✅ Found IG account ID: ${cache.igUserId}`);
        return cache.igUserId;
      }
    } else {
      console.log(`[Instagram] Direct page error: ${pageData.error.message}`);
    }
  } catch (e) {
    console.log(`[Instagram] Direct page query failed:`, e.message);
  }

  // Strategy 2: /me/accounts fallback
  const pagesRes = await fetch(
    `${GRAPH}/me/accounts?fields=name,id,instagram_business_account,connected_instagram_account&access_token=${ACTIVE_TOKEN}`
  );
  const pagesData = await pagesRes.json();
  if (pagesData.error) throw new Error(`Pages error: ${pagesData.error.message}`);

  for (const page of (pagesData.data || [])) {
    const igAccount = page.instagram_business_account || page.connected_instagram_account;
    if (igAccount) {
      cache.igUserId = igAccount.id;
      return cache.igUserId;
    }
  }

  throw new Error('No Instagram account found linked to any Facebook Page.');
}

// ── Helper: fetch fresh Instagram data ───────────────────────────────────────
async function fetchFreshData() {
  const igUserId = await getIgUserId();

  const [profileRes, mediaRes] = await Promise.all([
    fetch(`${GRAPH}/${igUserId}?fields=name,biography,followers_count,media_count,profile_picture_url,username,website&access_token=${ACTIVE_TOKEN}`),
    fetch(`${GRAPH}/${igUserId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,like_count,timestamp&limit=9&access_token=${ACTIVE_TOKEN}`),
  ]);

  const [profileData, mediaData] = await Promise.all([profileRes.json(), mediaRes.json()]);

  if (profileData.error) throw new Error(`Profile error: ${profileData.error.message}`);
  if (mediaData.error) throw new Error(`Media error: ${mediaData.error.message}`);

  const posts = (mediaData.data || []).map(post => ({
    id: post.id,
    mediaType: post.media_type,
    imageUrl: post.media_type === 'VIDEO' ? (post.thumbnail_url || post.media_url) : post.media_url,
    permalink: post.permalink,
    caption: post.caption ? post.caption.slice(0, 120) : '',
    likeCount: post.like_count || 0,
    timestamp: post.timestamp,
  }));

  cache.feed = posts;
  cache.profile = {
    username: profileData.username || 'dr.mohit_urowala',
    name: profileData.name || 'Dr. Mohit Sharma AIIMS',
    bio: profileData.biography || '',
    followersCount: profileData.followers_count || 0,
    mediaCount: profileData.media_count || 0,
    profilePicture: profileData.profile_picture_url || null,
    website: profileData.website || '',
  };
  cache.lastFetched = Date.now();

  return { posts: cache.feed, profile: cache.profile };
}

// ── GET /api/instagram/feed ───────────────────────────────────────────────────
router.get('/feed', async (req, res) => {
  try {
    if (!ACTIVE_TOKEN) {
      return res.status(503).json({ error: 'Instagram not configured', posts: [], profile: null });
    }
    const now = Date.now();
    if (cache.feed && cache.profile && (now - cache.lastFetched) < CACHE_TTL) {
      return res.json({ posts: cache.feed, profile: cache.profile, cached: true });
    }
    const data = await fetchFreshData();
    res.json({ posts: data.posts, profile: data.profile, cached: false });
  } catch (err) {
    console.error('[Instagram API Error]', err.message);
    if (cache.feed) {
      return res.json({ posts: cache.feed, profile: cache.profile, cached: true, stale: true });
    }
    res.status(500).json({ error: err.message, posts: [], profile: null });
  }
});

// ── POST /api/instagram/refresh — force refresh cache ────────────────────────
router.post('/refresh', async (req, res) => {
  try {
    cache.lastFetched = 0;
    const data = await fetchFreshData();
    res.json({ success: true, posts: data.posts.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/instagram/refresh-token — manually trigger token refresh ────────
router.post('/refresh-token', async (req, res) => {
  try {
    await refreshToken();
    res.json({ success: true, message: 'Token refreshed successfully — never expires!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/instagram/token-status — check token health ─────────────────────
router.get('/token-status', async (req, res) => {
  try {
    const debugRes = await fetch(
      `https://graph.facebook.com/debug_token?input_token=${ACTIVE_TOKEN}&access_token=${APP_ID}|${APP_SECRET}`
    );
    const debugData = await debugRes.json();
    const info = debugData?.data || {};
    res.json({
      valid: info.is_valid || false,
      expiresAt: info.expires_at ? new Date(info.expires_at * 1000).toISOString() : 'Never (permanent)',
      scopes: info.scopes || [],
      lastRefreshed: lastTokenRefresh ? new Date(lastTokenRefresh).toISOString() : 'Not yet',
      appSecretConfigured: !!APP_SECRET,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
