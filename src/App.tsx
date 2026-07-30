import { BackgroundCanvas } from './components/BackgroundCanvas';
import { useScrollSequence } from './hooks/useScrollSequence';
import './App.css';

export function App() {
  const { currentFrame, isLoading, loadingProgress } = useScrollSequence();

  return (
    <>
      {/* Full-bleed Canvas Background (Stage 2) */}
      <BackgroundCanvas currentFrame={currentFrame} />

      {/* Pre-loader Overlay (Stage 1) */}
      <div className={`loading-screen ${!isLoading ? 'hidden' : ''}`}>
        <div className="loading-box">
          <div className="loading-brand">CRUSSANT</div>
          <div className="loading-subtext">Preloading Kitchen Sequence</div>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="progress-status">{loadingProgress}% Loaded</div>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="site-header">
        <a href="#section-hero" className="brand-logo">
          CRUSSANT
        </a>
        <ul className="nav-links">
          <li>
            <a href="#section-hero">Home</a>
          </li>
          <li>
            <a href="#section-story">Our Story</a>
          </li>
          <li>
            <a href="#section-visit">Visit Atelier</a>
          </li>
        </ul>
        <a href="#section-visit" className="btn-header">
          Order Fresh
        </a>
      </header>

      {/* Main Content Wrapper */}
      <main className="main-wrapper">
        {/* Section 1: Hero */}
        <section id="section-hero" className="hero-section">
          <div className="hero-subtitle-tag">L'Art de la Viennoiserie</div>
          <h1 className="hero-title">
            Artisanal Perfection, <br />
            Baked Fresh Daily
          </h1>
          <p className="hero-description">
            Experience the 72-hour cold fermentation process. From raw dough to golden, flaking crisp layers.
          </p>

          <div className="scroll-indicator">
            <span>Scroll to Unveil</span>
            <div className="scroll-mouse">
              <div className="scroll-wheel"></div>
            </div>
          </div>
        </section>

        {/* Transition Track 1: Hero -> Story (Dough to Baking WebP frames scrub) */}
        <div id="transition-1" className="scroll-track" />

        {/* Section 2: Our Story (Resting State at Frame 40 of Sequence 1) */}
        <section id="section-story" className="section-resting">
          <div className="glass-card">
            <div className="section-label">Our Craft & Legacy</div>
            <h2 className="section-heading">Born in Paris, Perfected in the Hearth</h2>
            <p className="section-body">
              Every morning begins at 3 AM in our stone hearth atelier. We combine organic stone-milled wheat flour with PDO 84% butterfat butter from Normandy. Through precise temperature control and three days of patient fermentation, over 81 delicate layers of dough are folded to creation.
            </p>

            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-title">84% Butterfat</div>
                <div className="feature-desc">Single-origin Charentes-Poitou PDO butter for intense aroma and honeycomb lamination.</div>
              </div>
              <div className="feature-item">
                <div className="feature-title">72-Hour Ferment</div>
                <div className="feature-desc">Slow cold proofing develops complex wild yeast sourdough notes and digestible structure.</div>
              </div>
              <div className="feature-item">
                <div className="feature-title">Stone-Milled Wheat</div>
                <div className="feature-desc">Unbleached heirloom French wheat retaining natural germ oils and mineral depth.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Transition Track 2: Story -> Visit Us (Baking to Finished WebP frames scrub) */}
        <div id="transition-2" className="scroll-track" />

        {/* Section 3: Visit Us (Resting State at Frame 40 of Sequence 2) */}
        <section id="section-visit" className="section-resting">
          <div className="glass-card" style={{ textAlign: 'center' }}>
            <div className="section-label">Visit Our Atelier</div>
            <h2 className="section-heading">Fresh Bakes Out of the Oven Daily</h2>
            <p className="section-body" style={{ maxWidth: '640px', margin: '0 auto 2.5rem' }}>
              Batches drop at 7:00 AM, 11:30 AM, and 3:00 PM. Reserve your box in advance or visit us in the heart of the bakery quarter.
            </p>

            <div className="features-grid" style={{ marginBottom: '2.5rem' }}>
              <div className="feature-item">
                <div className="feature-title">Paris Atelier</div>
                <div className="feature-desc">42 Rue du Pain, 75004 Paris<br />Open Tue–Sun: 7am – 5pm</div>
              </div>
              <div className="feature-item">
                <div className="feature-title">Baking Hours</div>
                <div className="feature-desc">Morning Batch: 7:00 AM<br />Noon Warm Bake: 11:30 AM</div>
              </div>
            </div>

            <a href="#section-hero" className="btn-header" style={{ padding: '0.9rem 2.2rem', fontSize: '1rem' }}>
              Reserve Your Box Now
            </a>
          </div>
        </section>

        {/* Site Footer */}
        <footer className="site-footer">
          <p>© {new Date().getFullYear()} Crussant Bakery. Crafted with passion & precision.</p>
        </footer>
      </main>
    </>
  );
}

export default App;
