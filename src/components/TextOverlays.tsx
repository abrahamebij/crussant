import React, { useEffect, useRef } from 'react';

interface TextOverlaysProps {
  scrollProgress: number;
}

export const TextOverlays: React.FC<TextOverlaysProps> = ({ scrollProgress }) => {
  const m1Ref = useRef<HTMLDivElement | null>(null);
  const m2Ref = useRef<HTMLDivElement | null>(null);
  const m3Ref = useRef<HTMLDivElement | null>(null);
  const m4Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      if (m1Ref.current) m1Ref.current.style.opacity = '0';
      if (m2Ref.current) m2Ref.current.style.opacity = '0';
      if (m3Ref.current) m3Ref.current.style.opacity = '0';
      if (m4Ref.current) {
        m4Ref.current.style.opacity = '1';
        m4Ref.current.style.transform = 'translate(-50%, -50%) scale(1)';
        m4Ref.current.style.pointerEvents = 'auto';
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

    const getRangeProgress = (progress: number, start: number, end: number) => {
      if (progress <= start) return 0;
      if (progress >= end) return 1;
      return (progress - start) / (end - start);
    };

    // Moment 1: Center Intro ("THE PERFECT BAKE") - 0% to 20%
    const op1 = calculateOpacity(scrollProgress, 0.0, 0.04, 0.14, 0.20);
    if (m1Ref.current) {
      m1Ref.current.style.opacity = op1.toFixed(3);
      const r1 = getRangeProgress(scrollProgress, 0.0, 0.20);
      const translateY = (1 - op1) * 20 - r1 * 15;
      const scale = 1.02 - r1 * 0.04;
      m1Ref.current.style.transform = `translate(-50%, -50%) translateY(${translateY}px) scale(${scale})`;
    }

    // Moment 2: Left Side ("TIME IS AN INGREDIENT") - 23% to 48%
    const op2 = calculateOpacity(scrollProgress, 0.23, 0.30, 0.42, 0.49);
    if (m2Ref.current) {
      m2Ref.current.style.opacity = op2.toFixed(3);
      const r2 = getRangeProgress(scrollProgress, 0.23, 0.49);
      const translateX = (1 - op2) * -30;
      const translateY = 15 - r2 * 30;
      m2Ref.current.style.transform = `translateY(${translateY}px) translateX(${translateX}px)`;
    }

    // Moment 3: Right Side ("PUREST PROVENANCE") - 51% to 75%
    const op3 = calculateOpacity(scrollProgress, 0.51, 0.58, 0.68, 0.75);
    if (m3Ref.current) {
      m3Ref.current.style.opacity = op3.toFixed(3);
      const r3 = getRangeProgress(scrollProgress, 0.51, 0.75);
      const translateX = (1 - op3) * 30;
      const translateY = 15 - r3 * 30;
      m3Ref.current.style.transform = `translateY(${translateY}px) translateX(${translateX}px)`;
    }

    // Moment 4: Center Climax ("TASTE THE TRADITION") - 78% to 100%
    let op4 = 0;
    if (scrollProgress >= 0.77) {
      op4 = Math.min(1, (scrollProgress - 0.77) / 0.12);
    }
    if (m4Ref.current) {
      m4Ref.current.style.opacity = op4.toFixed(3);
      const r4 = getRangeProgress(scrollProgress, 0.77, 0.98);
      const translateY = (1 - op4) * 30;
      const scale = 1.04 - r4 * 0.04;
      m4Ref.current.style.transform = `translate(-50%, -50%) translateY(${translateY}px) scale(${scale})`;
      m4Ref.current.style.pointerEvents = op4 > 0.4 ? 'auto' : 'none';
    }
  }, [scrollProgress]);

  return (
    <div className="text-overlay-wrapper">
      {/* Moment 1: Center Opening Hero */}
      <div ref={m1Ref} className="overlay-segment segment-center-hero">
        <h1 className="cinematic-headline">THE PERFECT BAKE</h1>
        <p className="cinematic-subtext">
          Artisanal French viennoiserie, crafted from scratch every dawn.
        </p>
      </div>

      {/* Moment 2: Left-Aligned Story Moment */}
      <div ref={m2Ref} className="overlay-segment segment-left">
        <h2 className="cinematic-headline">
          TIME IS AN <br />
          INGREDIENT
        </h2>
        <p className="cinematic-subtext">
          72-hour slow cold fermentation develops a deep wild aroma and 81 distinct honeycomb layers.
        </p>
      </div>

      {/* Moment 3: Right-Aligned Provenance Moment */}
      <div ref={m3Ref} className="overlay-segment segment-right">
        <h2 className="cinematic-headline">
          PUREST <br />
          PROVENANCE
        </h2>
        <p className="cinematic-subtext">
          84% PDO Normandy butter layered inside stone-milled heirloom organic French wheat.
        </p>
      </div>

      {/* Moment 4: Center Climax with Action Button */}
      <div ref={m4Ref} className="overlay-segment segment-center-final">
        <h2 className="cinematic-headline">TASTE THE TRADITION</h2>
        <p className="cinematic-subtext">
          Fresh from our stone hearth atelier. Hot morning & noon batches daily.
        </p>
        <button
          className="btn-cinematic-cta"
          onClick={() => alert('Order Placed! Your fresh bakes are reserved.')}
        >
          ORDER FRESH
        </button>
      </div>
    </div>
  );
};
