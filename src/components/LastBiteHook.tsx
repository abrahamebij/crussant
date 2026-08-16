import React, { useEffect, useRef, useState } from 'react';

export const LastBiteHook: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [rotation, setRotation] = useState<number>(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowH = window.innerHeight;
            
            // Progress from section entering bottom of screen (1.0) to scrolling off top (-1.0)
            const progress = (windowH - rect.top) / (windowH + rect.height);
            
            // Smoothly rotate to the right (clockwise) from -20deg to +75deg as user scrolls
            const currentRotation = (progress - 0.5) * 90;
            setRotation(currentRotation);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToMenu = () => {
    const menuEl = document.getElementById('section-menu');
    if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="section-hook" ref={sectionRef} className="last-bite-section">
      {/* Background Rotating Bake Disc (Rotates to the right on scroll) */}
      <div className="rotating-bg-wrapper">
        <img
          src="/images/cta_rotating_bake.jpg"
          alt="Artisanal Croissant Masterpiece"
          className="rotating-bg-img"
          style={{
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          }}
        />
        <div className="rotating-bg-overlay"></div>
      </div>

      {/* Foreground Content */}
      <div className="last-bite-container">
        <span className="last-bite-tag">THE LAST BITE</span>
        <h2 className="last-bite-headline">
          ONE BITE AND <br />
          <span className="text-orange-accent">YOU'RE HOOKED.</span>
        </h2>

        <div className="last-bite-buttons-row">
          <button
            className="btn-order-large"
            onClick={() => alert('Order confirmed! Pick up fresh at our atelier.')}
          >
            CLAIM YOUR BOX
          </button>
          <button
            className="btn-view-menu-ghost"
            onClick={scrollToMenu}
          >
            VIEW FULL MENU
          </button>
        </div>
      </div>
    </section>
  );
};
