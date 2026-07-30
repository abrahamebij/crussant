import React from 'react';

interface NavbarProps {
  scrollProgress: number;
}

export const Navbar: React.FC<NavbarProps> = ({ scrollProgress }) => {
  // Map current scroll progress to active nav link highlight
  let activeLink = 'menu';
  if (scrollProgress >= 0.33 && scrollProgress < 0.68) {
    activeLink = 'story';
  } else if (scrollProgress >= 0.68) {
    activeLink = 'visit';
  }

  const scrollToPercentage = (targetPercent: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: maxScroll * targetPercent,
      behavior: 'smooth',
    });
  };

  return (
    <header className="site-navbar">
      {/* Far Left: Standalone Logo Wordmark */}
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          scrollToPercentage(0);
        }}
        className="nav-logo"
      >
        <span className="logo-flame">✦</span>
        <span className="logo-text">CRUSSANT</span>
      </a>

      {/* Center / Center-Right: Grouped Single Pill Nav Container */}
      <nav className="nav-pill-container">
        <button
          className={`nav-pill-item ${activeLink === 'menu' ? 'active' : ''}`}
          onClick={() => scrollToPercentage(0)}
        >
          Menu
        </button>
        <button
          className={`nav-pill-item ${activeLink === 'story' ? 'active' : ''}`}
          onClick={() => scrollToPercentage(0.45)}
        >
          Our Story
        </button>
        <button
          className={`nav-pill-item ${activeLink === 'visit' ? 'active' : ''}`}
          onClick={() => scrollToPercentage(0.85)}
        >
          Visit
        </button>
      </nav>

      {/* Far Right: Compact Circular Icon Cluster */}
      <div className="nav-icon-cluster">
        {/* Instagram Icon Button */}
        <button
          className="icon-btn"
          title="Instagram"
          onClick={() => alert('Instagram: @crussant.atelier')}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </button>

        {/* Location Icon Button */}
        <button
          className="icon-btn"
          title="Atelier Location"
          onClick={() => scrollToPercentage(0.85)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </button>

        {/* Cart / Order CTA Icon Button (Amber Accent) */}
        <button
          className="icon-btn icon-btn-cta"
          title="Order Fresh Bakes"
          onClick={() => alert('Reservation cart opened! Reserve your box.')}
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
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </button>
      </div>
    </header>
  );
};
