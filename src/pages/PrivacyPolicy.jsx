import { Link } from 'react-router-dom';
import './LegalPage.css';

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <div className="legal-hero">
        <div className="container legal-hero__inner">
          <div className="legal-badge">Legal</div>
          <h1>Privacy Policy</h1>
          <p>Last updated: May 2025 &nbsp;·&nbsp; Urowala Clinic, Jaipur</p>
        </div>
      </div>

      <div className="container legal-body">
        <aside className="legal-toc">
          <p className="legal-toc__title">Contents</p>
          {[
            ['#collection',   'Information We Collect'],
            ['#use',          'How We Use Your Information'],
            ['#sharing',      'Sharing of Information'],
            ['#security',     'Data Security'],
            ['#cookies',      'Cookies'],
            ['#rights',       'Your Rights'],
            ['#children',     'Children\'s Privacy'],
            ['#changes',      'Changes to This Policy'],
            ['#contact',      'Contact Us'],
          ].map(([href, label]) => (
            <a key={href} href={href} className="legal-toc__link">{label}</a>
          ))}
        </aside>

        <article className="legal-content">
          <p className="legal-intro">
            Urowala Clinic ("we", "us", or "our") is committed to protecting the privacy of our patients
            and website visitors. This Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you visit our website or use our services.
          </p>

          <section id="collection">
            <h2>1. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Personal Identification Information:</strong> Name, phone number, email address, date of birth, and gender when you book an appointment or contact us.</li>
              <li><strong>Medical Information:</strong> Health-related information you voluntarily provide for consultation purposes.</li>
              <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, and time spent on our website (collected automatically).</li>
              <li><strong>Communication Data:</strong> Messages sent via our contact form or WhatsApp.</li>
            </ul>
          </section>

          <section id="use">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Schedule and manage appointments</li>
              <li>Provide medical consultation and follow-up care</li>
              <li>Send appointment reminders and health updates</li>
              <li>Improve our website and services</li>
              <li>Respond to enquiries and support requests</li>
              <li>Comply with legal and regulatory obligations</li>
            </ul>
          </section>

          <section id="sharing">
            <h2>3. Sharing of Information</h2>
            <p>We do <strong>not</strong> sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
            <ul>
              <li><strong>With Your Consent:</strong> When you explicitly authorise us to share your information.</li>
              <li><strong>Healthcare Providers:</strong> With specialists or laboratories involved in your care.</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government authority.</li>
              <li><strong>Service Providers:</strong> Trusted third-party vendors who assist us in operating our website (e.g., hosting), under strict confidentiality agreements.</li>
            </ul>
          </section>

          <section id="security">
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organisational security measures to protect your personal
              information against unauthorised access, alteration, disclosure, or destruction. This includes
              encrypted data transmission (HTTPS), access controls, and regular security reviews.
            </p>
            <p>
              However, no method of transmission over the internet or electronic storage is 100% secure.
              While we strive to use commercially acceptable means to protect your data, we cannot guarantee
              absolute security.
            </p>
          </section>

          <section id="cookies">
            <h2>5. Cookies</h2>
            <p>
              Our website may use cookies and similar tracking technologies to enhance your browsing experience.
              Cookies are small files stored on your device. We use them to:
            </p>
            <ul>
              <li>Remember your language preference</li>
              <li>Analyse website traffic and usage patterns</li>
              <li>Improve website functionality</li>
            </ul>
            <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
          </section>

          <section id="rights">
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal data (subject to legal requirements)</li>
              <li>Withdraw consent at any time for non-essential communications</li>
              <li>Lodge a complaint with the relevant data protection authority</li>
            </ul>
            <p>To exercise any of these rights, please contact us at the details below.</p>
          </section>

          <section id="children">
            <h2>7. Children's Privacy</h2>
            <p>
              Our services are not directed to children under the age of 13. We do not knowingly collect
              personal information from children. If you are a parent or guardian and believe your child
              has provided us with personal information, please contact us immediately.
            </p>
          </section>

          <section id="changes">
            <h2>8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any significant
              changes by updating the "Last updated" date at the top of this page. We encourage you to
              review this policy periodically.
            </p>
          </section>

          <section id="contact">
            <h2>9. Contact Us</h2>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:</p>
            <div className="legal-contact-box">
              <div><strong>Urowala Clinic</strong></div>
              <div>122, Mohan Nagar Gate No. 8, Mansarovar Link Road, Jaipur – 302018</div>
              <div>📞 <a href="tel:+919039570761">+91 90395 70761</a></div>
              <div>📧 <a href="mailto:urowala@gmail.com">urowala@gmail.com</a></div>
            </div>
          </section>

          <div className="legal-nav-links">
            <Link to="/terms" className="btn btn-primary">Read Terms of Service →</Link>
            <Link to="/" className="btn btn-outline">Back to Home</Link>
          </div>
        </article>
      </div>
    </div>
  );
}
