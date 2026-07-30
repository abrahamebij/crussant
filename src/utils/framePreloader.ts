export interface CombinedSequenceData {
  frames: HTMLImageElement[];
  totalFrames: number;
  isLoaded: boolean;
}

const frameCache = new Map<string, HTMLImageElement[]>();

/**
 * Preloads WebP frames for a single folder path.
 */
function preloadFolderFrames(
  folderPath: string,
  totalFrames: number = 40,
  onFolderProgress?: (loaded: number, total: number) => void
): Promise<HTMLImageElement[]> {
  if (frameCache.has(folderPath)) {
    const cached = frameCache.get(folderPath)!;
    if (onFolderProgress) onFolderProgress(cached.length, cached.length);
    return Promise.resolve(cached);
  }

  return new Promise((resolve) => {
    const images: HTMLImageElement[] = new Array(totalFrames);
    let loadedCount = 0;

    const handleLoad = () => {
      loadedCount++;
      if (onFolderProgress) {
        onFolderProgress(loadedCount, totalFrames);
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

/**
 * Preloads multiple frame folders back-to-back into one unified continuous frame array.
 */
export async function preloadContinuousSequence(
  folders: string[],
  framesPerFolder: number = 40,
  onProgress?: (progress: number, loaded: number, total: number) => void
): Promise<HTMLImageElement[]> {
  const totalExpected = folders.length * framesPerFolder;
  const folderCounts = new Array(folders.length).fill(0);

  const folderPromises = folders.map((folder, folderIdx) => {
    return preloadFolderFrames(folder, framesPerFolder, (loaded) => {
      folderCounts[folderIdx] = loaded;
      const combinedLoaded = folderCounts.reduce((a, b) => a + b, 0);
      if (onProgress) {
        onProgress(combinedLoaded / totalExpected, combinedLoaded, totalExpected);
      }
    });
  });

  const results = await Promise.all(folderPromises);

  // Flatten into a single continuous array: folder 1 frames followed immediately by folder 2 frames
  const combinedFrames: HTMLImageElement[] = [];
  results.forEach((folderFrames) => {
    combinedFrames.push(...folderFrames);
  });

  return combinedFrames;
}
