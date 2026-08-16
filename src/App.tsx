import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Navbar } from './components/Navbar';
import { TextOverlays } from './components/TextOverlays';
import { SignatureBakes } from './components/SignatureBakes';
import { InteractiveAtelier } from './components/InteractiveAtelier';
import { EditorialQuote } from './components/EditorialQuote';
import { LastBiteHook } from './components/LastBiteHook';
import { useScrollSequence } from './hooks/useScrollSequence';
import './App.css';

export function App() {
  const { currentFrame, isLoading, loadingProgress, totalFrames, scrollProgress } =
    useScrollSequence();

  // Allocate 50px of vertical scroll per frame for smooth deliberate hero scrubbing
  const heroScrollHeight = Math.max(3000, totalFrames * 50);

  return (
    <>
      {/* Top Floating Navbar */}
      {!isLoading && <Navbar scrollProgress={scrollProgress} />}

      {/* Full-bleed Canvas Background (Pinned during hero animation) */}
      <BackgroundCanvas currentFrame={currentFrame} />

      {/* Atmospheric Hero Text Overlay Moments */}
      {!isLoading && <TextOverlays scrollProgress={scrollProgress} />}

      {/* Initial Loading Screen Overlay */}
      <div className={`loading-screen ${!isLoading ? 'hidden' : ''}`}>
        <div className="loading-box">
          <div className="loading-brand">CRUSSANT</div>
          <div className="loading-subtext">Preloading Continuous Sequence</div>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="progress-status">{loadingProgress}% Loaded</div>
        </div>
      </div>

      {/* Main Page Flow */}
      <main className="main-wrapper">
        {/* 1. Hero Continuous Scroll Track */}
        <div
          id="section-hero"
          className="continuous-scroll-track"
          style={{ height: `${heroScrollHeight}px` }}
        />

        {/* 2. Signature Bakes / Menu Section (Screenshots 1 & 2) */}
        <SignatureBakes />

        {/* 3. Interactive Atelier / Custom Box Builder (Screenshot 3) */}
        <InteractiveAtelier />

        {/* 4. Chef Philosophy Quote (Screenshot 4) */}
        <EditorialQuote />

        {/* 5. The Last Bite Hook (Screenshot 5) */}
        <LastBiteHook />
      </main>
    </>
  );
}

export default App;
