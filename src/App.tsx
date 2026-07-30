import { BackgroundCanvas } from './components/BackgroundCanvas';
import { TextOverlays } from './components/TextOverlays';
import { useScrollSequence } from './hooks/useScrollSequence';
import './App.css';

export function App() {
  const { currentFrame, isLoading, loadingProgress, totalFrames, scrollProgress } =
    useScrollSequence();

  // Pacing: allocate 60px of vertical scroll per frame for smooth deliberate scrubbing
  const containerHeight = Math.max(3000, totalFrames * 60);

  return (
    <>
      {/* Full-bleed Canvas Background (Pinned full viewport) */}
      <BackgroundCanvas currentFrame={currentFrame} />

      {/* Atmospheric Text Overlay Moments (GSAP / ScrollTrigger scroll-percentage driven) */}
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

      {/* Single Continuous Scroll Track */}
      <main className="main-wrapper">
        <div
          className="continuous-scroll-track"
          style={{ height: `${containerHeight}px` }}
        />
      </main>
    </>
  );
}

export default App;
