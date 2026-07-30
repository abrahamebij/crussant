import { useEffect, useState } from 'react';
import { preloadFrameSequence } from '../utils/framePreloader';

export interface UseScrollSequenceReturn {
  currentFrame: HTMLImageElement | null;
  isLoading: boolean;
  loadingProgress: number; // 0 to 100
  sequence1Loaded: boolean;
  sequence2Loaded: boolean;
}

const SEQ1_FOLDER = 'crussant-dough-to-baking-webp';
const SEQ2_FOLDER = 'crussant-baking-to-finished-webp';
const TOTAL_FRAMES = 40;

export function useScrollSequence(): UseScrollSequenceReturn {
  const [seq1Frames, setSeq1Frames] = useState<HTMLImageElement[]>([]);
  const [seq2Frames, setSeq2Frames] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentFrame, setCurrentFrame] = useState<HTMLImageElement | null>(null);

  // Preload all WebP frames on mount
  useEffect(() => {
    let active = true;

    let p1 = 0;
    let p2 = 0;

    const updateCombinedProgress = () => {
      if (!active) return;
      const combined = Math.round(((p1 + p2) / 2) * 100);
      setLoadingProgress(combined);
    };

    Promise.all([
      preloadFrameSequence(SEQ1_FOLDER, TOTAL_FRAMES, (prog) => {
        p1 = prog;
        updateCombinedProgress();
      }),
      preloadFrameSequence(SEQ2_FOLDER, TOTAL_FRAMES, (prog) => {
        p2 = prog;
        updateCombinedProgress();
      }),
    ]).then(([f1, f2]) => {
      if (!active) return;
      setSeq1Frames(f1);
      setSeq2Frames(f2);
      setIsLoading(false);
      if (f1.length > 0) {
        setCurrentFrame(f1[0]);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  // Update current frame based on scroll position
  useEffect(() => {
    if (isLoading || seq1Frames.length === 0 || seq2Frames.length === 0) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Section positions (obtained dynamically from DOM elements if available)
      const trans1El = document.getElementById('transition-1');
      const storyEl = document.getElementById('section-story');
      const trans2El = document.getElementById('transition-2');
      const visitEl = document.getElementById('section-visit');

      if (!trans1El || !storyEl || !trans2El) {
        // Fallback default frame
        setCurrentFrame(seq1Frames[0]);
        return;
      }

      const t1Rect = trans1El.getBoundingClientRect();
      const storyRect = storyEl.getBoundingClientRect();
      const t2Rect = trans2El.getBoundingClientRect();
      const visitRect = visitEl ? visitEl.getBoundingClientRect() : null;

      // Check where user is on the page:
      // 1. Before or inside Hero:
      if (t1Rect.top > 0) {
        setCurrentFrame(seq1Frames[0]);
        return;
      }

      // 2. Inside Transition 1 track (Dough -> Baking):
      if (t1Rect.top <= 0 && t1Rect.bottom >= viewportHeight) {
        if (reducedMotion) {
          setCurrentFrame(seq1Frames[39]);
          return;
        }
        const totalScrollDist = t1Rect.height - viewportHeight;
        const currentScroll = -t1Rect.top;
        const progress = Math.max(0, Math.min(1, currentScroll / totalScrollDist));
        const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));
        setCurrentFrame(seq1Frames[frameIdx]);
        return;
      }

      // 3. Resting in "Our Story" section (between T1 and T2):
      if (t1Rect.bottom < viewportHeight && t2Rect.top > 0) {
        setCurrentFrame(seq1Frames[TOTAL_FRAMES - 1]);
        return;
      }

      // 4. Inside Transition 2 track (Baking -> Finished):
      if (t2Rect.top <= 0 && t2Rect.bottom >= viewportHeight) {
        if (reducedMotion) {
          setCurrentFrame(seq2Frames[39]);
          return;
        }
        const totalScrollDist = t2Rect.height - viewportHeight;
        const currentScroll = -t2Rect.top;
        const progress = Math.max(0, Math.min(1, currentScroll / totalScrollDist));
        const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));
        setCurrentFrame(seq2Frames[frameIdx]);
        return;
      }

      // 5. Resting in "Visit Us" section or below:
      if (t2Rect.bottom < viewportHeight) {
        setCurrentFrame(seq2Frames[TOTAL_FRAMES - 1]);
        return;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, seq1Frames, seq2Frames]);

  return {
    currentFrame,
    isLoading,
    loadingProgress,
    sequence1Loaded: seq1Frames.length > 0,
    sequence2Loaded: seq2Frames.length > 0,
  };
}
