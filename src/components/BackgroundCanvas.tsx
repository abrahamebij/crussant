import React, { useEffect, useRef } from 'react';

interface BackgroundCanvasProps {
  currentFrame: HTMLImageElement | null;
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ currentFrame }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, displayWidth, displayHeight);

      if (currentFrame && currentFrame.complete && currentFrame.naturalWidth > 0) {
        const imgW = currentFrame.naturalWidth;
        const imgH = currentFrame.naturalHeight;
        const imgAspect = imgW / imgH;
        const screenAspect = displayWidth / displayHeight;

        let drawW = displayWidth;
        let drawH = displayHeight;
        let offsetX = 0;
        let offsetY = 0;

        if (screenAspect > imgAspect) {
          drawH = displayWidth / imgAspect;
          offsetY = (displayHeight - drawH) / 2;
        } else {
          drawW = displayHeight * imgAspect;
          offsetX = (displayWidth - drawW) / 2;
        }

        ctx.drawImage(currentFrame, offsetX, offsetY, drawW, drawH);
      } else {
        // Dark placeholder gradient while frame is loading
        const grad = ctx.createRadialGradient(
          displayWidth / 2,
          displayHeight / 2,
          100,
          displayWidth / 2,
          displayHeight / 2,
          displayWidth
        );
        grad.addColorStop(0, '#1c1512');
        grad.addColorStop(1, '#090706');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, displayWidth, displayHeight);
      }

      // Subtle ambient vignette overlay to enhance text readability & depth
      const vignette = ctx.createRadialGradient(
        displayWidth / 2,
        displayHeight / 2,
        displayWidth * 0.35,
        displayWidth / 2,
        displayHeight / 2,
        displayWidth * 0.8
      );
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0.15)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.65)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      ctx.restore();
    };

    render();

    const handleResize = () => {
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentFrame]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};
