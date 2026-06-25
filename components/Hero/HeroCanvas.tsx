"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue, useTransform } from "framer-motion";

interface HeroCanvasProps {
  progress: MotionValue<number>;
}

export default function HeroCanvas({ progress }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const frameCount = 300;
  const currentFrame = useTransform(progress, [0, 1], [0, frameCount * 3 - 1]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const preloadImages = () => {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const frameIndex = i.toString().padStart(3, "0");
        img.src = `/images/back/ezgif-frame-${frameIndex}.jpg`;
        
        img.onload = () => {
          loadedCount++;
          if (loadedCount === frameCount) {
            setImages(loadedImages);
            setIsLoaded(true);
          }
        };

        img.onerror = () => {
          console.error(`Failed to load frame ${frameIndex}`);
          setHasError(true);
        };

        loadedImages.push(img);
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!isLoaded || hasError || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      const frameIndex = Math.floor(currentFrame.get()) % frameCount;
      const img = images[frameIndex];

      if (img) {
        // Cover logic for canvas
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = img.width;
        const imgHeight = img.height;
        
        const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const newWidth = imgWidth * ratio;
        const newHeight = imgHeight * ratio;
        const x = (canvasWidth - newWidth) / 2;
        const y = (canvasHeight - newHeight) / 2;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, x, y, newWidth, newHeight);
      }
    };

    const unsubscribe = currentFrame.on("change", render);
    
    // Initial render
    render();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded, hasError, images, currentFrame]);

  if (hasError) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#2A1B0A] to-[#E65100]/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-accent/50 uppercase tracking-widest text-sm font-bold">
            Cinematic Fallback Active
          </p>
        </div>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
    />
  );
}
