import React from 'react';

export const EditorialQuote: React.FC = () => {
  return (
    <section id="section-story" className="quote-section">
      <div className="quote-container">
        <blockquote className="editorial-quote">
          “In the center of Paris, time is measured by the rising of dough and the crackling of hearth heat. We brought that rhythm to you.”
        </blockquote>
        <cite className="editorial-author">— CHEF ANTOINE DUBOIS, MASTER BOULANGER</cite>
      </div>
    </section>
  );
};
