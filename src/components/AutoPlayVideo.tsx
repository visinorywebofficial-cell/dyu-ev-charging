'use client';

import React, { useEffect, useRef } from 'react';

interface AutoPlayVideoProps {
  sources: string[];
  className?: string;
  poster?: string;
}

export default function AutoPlayVideo({ sources, className = '', poster }: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly enforce HTML5 autoplay compliance properties on native DOM element
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const attemptPlay = () => {
      video.play().catch((error) => {
        console.warn('Autoplay prevented by browser:', error);
      });
    };

    attemptPlay();

    const handleInteraction = () => {
      if (video.paused) {
        attemptPlay();
      }
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };

    window.addEventListener('touchstart', handleInteraction, { passive: true });
    window.addEventListener('click', handleInteraction, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }, [sources]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={poster}
      className={className}
    >
      {sources.map((src, idx) => (
        <source key={idx} src={src} type="video/mp4" />
      ))}
    </video>
  );
}
