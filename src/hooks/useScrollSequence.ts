import { useEffect, useState } from 'react';
import { preloadContinuousSequence } from '../utils/framePreloader';

export interface UseScrollSequenceReturn {
  currentFrame: HTMLImageElement | null;
  isLoading: boolean;
  loadingProgress: number; // 0 to 100
  totalFrames: number;
  currentFrameIndex: number;
  scrollProgress: number; // 0.0 to 1.0
}

const SEQUENCE_FOLDERS = [
  'crussant-dough-to-baking-webp',
  'crussant-baking-to-finished-webp',
];
const FRAMES_PER_FOLDER = 40;

export function useScrollSequence(): UseScrollSequenceReturn {
  const [allFrames, setAllFrames] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentFrame, setCurrentFrame] = useState<HTMLImageElement | null>(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Preload continuous WebP frame sequence across all folders
  useEffect(() => {
    let active = true;

    preloadContinuousSequence(SEQUENCE_FOLDERS, FRAMES_PER_FOLDER, (prog) => {
      if (active) {
        setLoadingProgress(Math.round(prog * 100));
      }
    }).then((loadedFrames) => {
      if (!active) return;
      setAllFrames(loadedFrames);
      setIsLoading(false);
      if (loadedFrames.length > 0) {
        setCurrentFrame(loadedFrames[0]);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  // Map total page scroll linearly to single continuous frame index
  useEffect(() => {
    if (isLoading || allFrames.length === 0) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, scrollY / maxScroll));

      setScrollProgress(progress);

      if (reducedMotion) {
        const lastIdx = allFrames.length - 1;
        setCurrentFrameIndex(lastIdx);
        setCurrentFrame(allFrames[lastIdx]);
        return;
      }

      const frameIdx = Math.min(allFrames.length - 1, Math.floor(progress * allFrames.length));
      setCurrentFrameIndex(frameIdx);
      setCurrentFrame(allFrames[frameIdx]);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, allFrames]);

  return {
    currentFrame,
    isLoading,
    loadingProgress,
    totalFrames: allFrames.length,
    currentFrameIndex,
    scrollProgress,
  };
}
