import React from 'react';

interface NavbarProps {
  scrollProgress: number;
}

export const Navbar: React.FC<NavbarProps> = ({ scrollProgress }) => {
  let activeLink = 'menu';
  if (scrollProgress >= 0.22 && scrollProgress < 0.50) {
    activeLink = 'story';
  } else if (scrollProgress >= 0.50 && scrollProgress < 0.77) {
    activeLink = 'provenance';
  } else if (scrollProgress >= 0.77) {
    activeLink = 'contact';
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
      {/* Brand Logo on Left */}
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          scrollToPercentage(0);
        }}
        className="nav-logo"
      >
        <span className="logo-text">CRUSSANT</span>
      </a>

      {/* Center Nav Links */}
      <nav className="nav-links-clean">
        <button
          className={`nav-link-btn ${activeLink === 'menu' ? 'active' : ''}`}
          onClick={() => scrollToPercentage(0)}
        >
          Menu
        </button>
        <button
          className={`nav-link-btn ${activeLink === 'story' ? 'active' : ''}`}
          onClick={() => scrollToPercentage(0.35)}
        >
          Story
        </button>
        <button
          className={`nav-link-btn ${activeLink === 'provenance' ? 'active' : ''}`}
          onClick={() => scrollToPercentage(0.63)}
        >
          Local
        </button>
        <button
          className={`nav-link-btn ${activeLink === 'contact' ? 'active' : ''}`}
          onClick={() => scrollToPercentage(0.9)}
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
          onClick={() => scrollToPercentage(0.9)}
        >
          ORDER NOW
        </button>
      </div>
    </header>
  );
};
