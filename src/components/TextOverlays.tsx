import React, { useEffect, useRef } from 'react';

interface TextOverlaysProps {
  scrollProgress: number;
}

export const TextOverlays: React.FC<TextOverlaysProps> = ({ scrollProgress }) => {
  const m1Ref = useRef<HTMLDivElement | null>(null);
  const m2Ref = useRef<HTMLDivElement | null>(null);
  const m3Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      if (m1Ref.current) m1Ref.current.style.opacity = '0';
      if (m2Ref.current) m2Ref.current.style.opacity = '0';
      if (m3Ref.current) {
        m3Ref.current.style.opacity = '1';
        m3Ref.current.style.transform = 'translate(-50%, -50%) scale(1)';
        m3Ref.current.style.pointerEvents = 'auto';
      }
      return;
    }

    const calculateOpacity = (
      progress: number,
      fadeInStart: number,
      fadeInEnd: number,
      fadeOutStart: number,
      fadeOutEnd: number
    ) => {
      if (progress < fadeInStart || progress > fadeOutEnd) return 0;
      if (progress >= fadeInEnd && progress <= fadeOutStart) return 1;
      if (progress > fadeInStart && progress < fadeInEnd) {
        return (progress - fadeInStart) / (fadeInEnd - fadeInStart);
      }
      if (progress > fadeOutStart && progress < fadeOutEnd) {
        return 1 - (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
      }
      return 0;
    };

    // Moment 1 (Early scroll: 4% - 28%)
    const op1 = calculateOpacity(scrollProgress, 0.04, 0.12, 0.2, 0.28);
    if (m1Ref.current) {
      m1Ref.current.style.opacity = op1.toFixed(3);
      const scale1 = 1.04 - op1 * 0.04;
      m1Ref.current.style.transform = `translate(-50%, 0) scale(${scale1})`;
    }

    // Moment 2 (Mid scroll: 38% - 66%)
    const op2 = calculateOpacity(scrollProgress, 0.38, 0.46, 0.58, 0.66);
    if (m2Ref.current) {
      m2Ref.current.style.opacity = op2.toFixed(3);
      const scale2 = 1.04 - op2 * 0.04;
      m2Ref.current.style.transform = `translate(-50%, 0) scale(${scale2})`;
    }

    // Moment 3 (Late scroll: 74% - 100%)
    let op3 = 0;
    if (scrollProgress >= 0.74) {
      op3 = Math.min(1, (scrollProgress - 0.74) / 0.13);
    }
    if (m3Ref.current) {
      m3Ref.current.style.opacity = op3.toFixed(3);
      const scale3 = 1.04 - op3 * 0.04;
      m3Ref.current.style.transform = `translate(-50%, -50%) scale(${scale3})`;
      m3Ref.current.style.pointerEvents = op3 > 0.4 ? 'auto' : 'none';
    }
  }, [scrollProgress]);

  return (
    <div className="text-overlay-wrapper">
      {/* Moment 1: Early Scroll */}
      <div ref={m1Ref} className="comic-moment moment-top">
        <h2 className="comic-headline">72-Hour Cold Ferment</h2>
      </div>

      {/* Moment 2: Mid Scroll */}
      <div ref={m2Ref} className="comic-moment moment-mid">
        <h2 className="comic-headline">81 Delicate Layers</h2>
      </div>

      {/* Moment 3: Late Scroll */}
      <div ref={m3Ref} className="comic-moment moment-center">
        <h2 className="comic-headline">Golden Perfection</h2>
        <button
          className="btn-amber-glow"
          onClick={() => alert('Reservation confirmed! Fresh bakes reserved.')}
        >
          Reserve Your Fresh Bake
        </button>
      </div>
    </div>
  );
};
