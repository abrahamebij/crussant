import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Top Grid */}
        <div className="footer-top-grid">
          {/* Column 1: Brand & Bio */}
          <div className="footer-col footer-brand-col">
            <a href="#section-hero" onClick={scrollToTop} className="footer-logo">
              <img src="/logo.png" alt="Crussant Logo" className="footer-logo-img" />
              <span className="footer-logo-text">CRUSSANT</span>
            </a>
            <p className="footer-tagline">
              Artisanal French viennoiserie perfected in the hearth. 72-hour cold fermented, PDO Normandy butter, baked fresh daily.
            </p>
            <div className="footer-social-links">
              <a href="#instagram" className="social-icon-btn" title="Instagram" onClick={(e) => e.preventDefault()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#tiktok" className="social-icon-btn" title="TikTok" onClick={(e) => e.preventDefault()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a href="#twitter" className="social-icon-btn" title="X / Twitter" onClick={(e) => e.preventDefault()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">NAVIGATION</h4>
            <ul className="footer-links">
              <li><a href="#section-hero">The Experience</a></li>
              <li><a href="#section-menu">Signature Bakes</a></li>
              <li><a href="#section-atelier">Build Masterpiece Box</a></li>
              <li><a href="#section-story">Chef Philosophy</a></li>
              <li><a href="#section-hook">Order Online</a></li>
            </ul>
          </div>

          {/* Column 3: Atelier Locations & Hours */}
          <div className="footer-col">
            <h4 className="footer-heading">ATELIER & HOURS</h4>
            <div className="footer-info-block">
              <p className="info-title">Paris Atelier</p>
              <p className="info-text">42 Rue du Pain, 75004 Paris</p>
              <p className="info-meta">Tue – Sun: 7:00 AM – 5:00 PM</p>
            </div>
            <div className="footer-info-block">
              <p className="info-title">Fresh Batch Drops</p>
              <p className="info-text">Morning: 7:00 AM | Noon: 11:30 AM | Afternoon: 3:00 PM</p>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="footer-col footer-newsletter-col">
            <h4 className="footer-heading">FIRST BATCH ALERTS</h4>
            <p className="newsletter-desc">
              Subscribe to receive morning batch drop times and exclusive seasonal pastry reveals.
            </p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="btn-newsletter">
                {subscribed ? '✓ JOINED' : 'SUBSCRIBE'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} CRUSSANT ATELIER. ALL RIGHTS RESERVED.
          </p>
          <div className="footer-legal-links">
            <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <span>•</span>
            <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a>
            <span>•</span>
            <button className="btn-back-to-top" onClick={scrollToTop}>
              BACK TO TOP ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
