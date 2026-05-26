// Shared utility for reading saved doctor photo positions from localStorage
const STORAGE_KEY = 'urowala_photo_positions';

export function getPhotoPosition(key, fallback = '50% 20%') {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    return saved[key] || fallback;
  } catch {
    return fallback;
  }
}

export function savePhotoPositions(positions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
}

export function loadPhotoPositions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}
