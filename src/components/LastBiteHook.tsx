import React from 'react';

export const LastBiteHook: React.FC = () => {
  return (
    <section id="section-hook" className="last-bite-section">
      <div className="last-bite-container">
        <span className="last-bite-tag">THE LAST BITE</span>
        <h2 className="last-bite-headline">
          ONE BITE AND <br />
          <span className="text-red-accent">YOU'RE HOOKED.</span>
        </h2>
        <div className="last-bite-cta-wrap">
          <button
            className="btn-order-large"
            onClick={() => alert('Order confirmed! Pick up fresh at our atelier.')}
          >
            ORDER FRESH BAKES
          </button>
        </div>
      </div>
    </section>
  );
};
