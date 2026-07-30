export interface FrameSequenceData {
  folder: string;
  totalFrames: number;
  frames: HTMLImageElement[];
  isLoaded: boolean;
}

const frameCache = new Map<string, HTMLImageElement[]>();

/**
 * Preloads all WebP frames for a given folder as HTMLImageElements.
 * Caches results so re-mounting does not re-fetch.
 */
export function preloadFrameSequence(
  folderPath: string,
  totalFrames: number = 40,
  onProgress?: (progress: number, loaded: number, total: number) => void
): Promise<HTMLImageElement[]> {
  if (frameCache.has(folderPath)) {
    const cached = frameCache.get(folderPath)!;
    if (cached.length === totalFrames) {
      if (onProgress) onProgress(1, totalFrames, totalFrames);
      return Promise.resolve(cached);
    }
  }

  return new Promise((resolve) => {
    const images: HTMLImageElement[] = new Array(totalFrames);
    let loadedCount = 0;

    const handleLoad = () => {
      loadedCount++;
      if (onProgress) {
        onProgress(loadedCount / totalFrames, loadedCount, totalFrames);
      }
      if (loadedCount === totalFrames) {
        frameCache.set(folderPath, images);
        resolve(images);
      }
    };

    for (let i = 1; i <= totalFrames; i++) {
      const padIndex = String(i).padStart(3, '0');
      const src = `/${folderPath}/ezgif-frame-${padIndex}.webp`;
      const img = new Image();

      img.onload = handleLoad;
      img.onerror = () => {
        console.warn(`[FramePreloader] Warning: Failed to load frame ${src}`);
        handleLoad();
      };

      img.src = src;
      images[i - 1] = img;
    }
  });
}
