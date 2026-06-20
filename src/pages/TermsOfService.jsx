import { Link } from 'react-router-dom';
import './LegalPage.css';

export default function TermsOfService() {
  return (
    <div className="legal-page">
      <div className="legal-hero">
        <div className="container legal-hero__inner">
          <div className="legal-badge">Legal</div>
          <h1>Terms of Service</h1>
          <p>Last updated: May 2025 &nbsp;·&nbsp; Urowala Clinic, Jaipur</p>
        </div>
      </div>

      <div className="container legal-body">
        <aside className="legal-toc">
          <p className="legal-toc__title">Contents</p>
          {[
            ['#acceptance',     'Acceptance of Terms'],
            ['#services',       'Medical Services'],
            ['#appointments',   'Appointments & Cancellations'],
            ['#medical-advice', 'Medical Advice Disclaimer'],
            ['#payment',        'Payments & Fees'],
            ['#conduct',        'User Conduct'],
            ['#intellectual',   'Intellectual Property'],
            ['#liability',      'Limitation of Liability'],
            ['#governing',      'Governing Law'],
            ['#contact',        'Contact Us'],
          ].map(([href, label]) => (
            <a key={href} href={href} className="legal-toc__link">{label}</a>
          ))}
        </aside>

        <article className="legal-content">
          <p className="legal-intro">
            Welcome to Urowala Clinic. By accessing our website or using our services, you agree to be
            bound by these Terms of Service. Please read them carefully before using our services.
          </p>

          <section id="acceptance">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Urowala Clinic website or any of our medical services, you confirm
              that you are at least 18 years of age (or have parental/guardian consent), and that you agree
              to comply with and be bound by these Terms of Service and our Privacy Policy.
            </p>
            <p>
              If you do not agree with any part of these terms, please do not use our website or services.
            </p>
          </section>

          <section id="services">
            <h2>2. Medical Services</h2>
            <p>Urowala Clinic provides specialised medical services in:</p>
            <ul>
            <li>Urology & Andrology (Dr. Mohit Sharma, MCh Urology – AIIMS)</li>
            <li>Laser Urology — URS, PCNL, TURP procedures</li>
            <li>Male Reproductive Health & Infertility</li>
            </ul>
            <p>
              All medical services are provided by qualified, board-certified specialists. Our services are
              subject to availability and may change without notice.
            </p>
          </section>

          <section id="appointments">
            <h2>3. Appointments & Cancellations</h2>
            <ul>
              <li>Appointments can be booked via WhatsApp, phone call, or our website contact form.</li>
              <li>Please arrive <strong>10 minutes before</strong> your scheduled appointment time.</li>
              <li>Cancellations must be made at least <strong>24 hours in advance</strong>. Late cancellations may result in a cancellation fee.</li>
              <li>Urowala Clinic reserves the right to reschedule or cancel appointments due to medical emergencies or unforeseen circumstances.</li>
              <li>Please bring all previous medical reports, prescriptions, and valid ID to your appointment.</li>
            </ul>
          </section>

          <section id="medical-advice">
            <h2>4. Medical Advice Disclaimer</h2>
            <p>
              The information on this website is provided for general informational purposes only and does
              <strong> not constitute professional medical advice</strong>. It should not be used as a
              substitute for professional medical diagnosis, treatment, or advice from a qualified healthcare provider.
            </p>
            <p>
              Always seek the guidance of your physician or other qualified health professional with any
              questions you may have regarding your health or a medical condition. Never disregard professional
              medical advice or delay seeking it because of something you have read on this website.
            </p>
            <p>
              In case of a medical emergency, call emergency services (112) immediately.
            </p>
          </section>

          <section id="payment">
            <h2>5. Payments & Fees</h2>
            <ul>
              <li>Consultation fees are payable at the time of your appointment.</li>
              <li>We accept cash, UPI, debit/credit cards, and major digital payment methods.</li>
              <li>Procedure costs will be communicated to you clearly before any treatment is undertaken.</li>
              <li>Insurance claims assistance is provided for empanelled insurance providers. Please confirm coverage before your visit.</li>
              <li>All fees are subject to applicable taxes as per Government of India regulations.</li>
            </ul>
          </section>

          <section id="conduct">
            <h2>6. User Conduct</h2>
            <p>When using our website, you agree not to:</p>
            <ul>
              <li>Provide false or misleading information</li>
              <li>Use the website for any unlawful or fraudulent purpose</li>
              <li>Attempt to gain unauthorised access to any part of our systems</li>
              <li>Transmit any harmful, offensive, or disruptive content</li>
              <li>Violate the privacy or rights of any other person</li>
            </ul>
          </section>

          <section id="intellectual">
            <h2>7. Intellectual Property</h2>
            <p>
              All content on this website — including text, images, logos, graphics, and design — is the
              intellectual property of Urowala Clinic and is protected under applicable copyright and
              trademark laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, or use any content from this website without
              our express written permission.
            </p>
          </section>

          <section id="liability">
            <h2>8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Urowala Clinic, its doctors, staff, and affiliates
              shall not be liable for any indirect, incidental, special, or consequential damages arising
              from your use of our website or services.
            </p>
            <p>
              Medical outcomes can vary between patients. Results of any treatment or procedure are not
              guaranteed, and individual results may differ based on health condition, lifestyle, and
              other factors.
            </p>
          </section>

          <section id="governing">
            <h2>9. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of
              India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction
              of the courts of Jaipur, Rajasthan.
            </p>
          </section>

          <section id="contact">
            <h2>10. Contact Us</h2>
            <p>If you have questions about these Terms of Service, please contact us:</p>
            <div className="legal-contact-box">
              <div><strong>Urowala Clinic</strong></div>
              <div>122, Mohan Nagar Gate No. 8, Mansarovar Link Road, Jaipur – 302018</div>
              <div>📞 <a href="tel:+918005693060">+91 80056 93060</a></div>
              <div>📧 <a href="mailto:urowala@gmail.com">urowala@gmail.com</a></div>
            </div>
          </section>

          <div className="legal-nav-links">
            <Link to="/privacy" className="btn btn-primary">Read Privacy Policy →</Link>
            <Link to="/" className="btn btn-outline">Back to Home</Link>
          </div>
        </article>
      </div>
    </div>
  );
}

