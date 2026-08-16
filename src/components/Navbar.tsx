import React, { useEffect, useState } from 'react';

interface NavbarProps {
  scrollProgress: number;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      const menuEl = document.getElementById('section-menu');
      const atelierEl = document.getElementById('section-atelier');
      const storyEl = document.getElementById('section-story');
      const hookEl = document.getElementById('section-hook');

      if (hookEl && hookEl.getBoundingClientRect().top <= vh * 0.4) {
        setActiveSection('contact');
      } else if (storyEl && storyEl.getBoundingClientRect().top <= vh * 0.4) {
        setActiveSection('story');
      } else if (atelierEl && atelierEl.getBoundingClientRect().top <= vh * 0.4) {
        setActiveSection('atelier');
      } else if (menuEl && menuEl.getBoundingClientRect().top <= vh * 0.4) {
        setActiveSection('menu');
      } else {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="site-navbar">
      {/* Brand Logo on Left */}
      <a
        href="#section-hero"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('section-hero');
        }}
        className="nav-logo"
      >
        <span className="logo-text">CRUSSANT</span>
      </a>

      {/* Center Nav Links */}
      <nav className="nav-links-clean">
        <button
          className={`nav-link-btn ${activeSection === 'menu' ? 'active' : ''}`}
          onClick={() => scrollToSection('section-menu')}
        >
          Menu
        </button>
        <button
          className={`nav-link-btn ${activeSection === 'atelier' ? 'active' : ''}`}
          onClick={() => scrollToSection('section-atelier')}
        >
          Atelier
        </button>
        <button
          className={`nav-link-btn ${activeSection === 'story' ? 'active' : ''}`}
          onClick={() => scrollToSection('section-story')}
        >
          Story
        </button>
        <button
          className={`nav-link-btn ${activeSection === 'contact' ? 'active' : ''}`}
          onClick={() => scrollToSection('section-hook')}
        >
          Contact
        </button>
      </nav>

      {/* Right Side: Cart Icon & Order Pill */}
      <div className="nav-right-group">
        <button
          className="nav-cart-btn"
          title="Shopping Cart"
          onClick={() => alert('Your cart has 1 fresh baked item.')}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </button>

        <button
          className="btn-order-pill"
          onClick={() => scrollToSection('section-hook')}
        >
          ORDER NOW
        </button>
      </div>
    </header>
  );
};
