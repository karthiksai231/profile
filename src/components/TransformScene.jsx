import React, { useEffect, useRef } from 'react';
import '../styles/TransformScene.css';

// Full-screen cinematic backdrop: the truck-to-mech transformation video
// playing on a continuous loop behind the page content.
const TransformScene = () => {
  const videoRef = useRef(null);

  // Autoplay can be interrupted on mobile / power-saver; keep nudging playback.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => {
      if (v.paused) v.play().catch(() => {});
    };
    tryPlay();
    v.addEventListener('canplay', tryPlay);
    v.addEventListener('pause', tryPlay);
    document.addEventListener('visibilitychange', tryPlay);
    window.addEventListener('touchstart', tryPlay, { passive: true });
    window.addEventListener('click', tryPlay);
    return () => {
      v.removeEventListener('canplay', tryPlay);
      v.removeEventListener('pause', tryPlay);
      document.removeEventListener('visibilitychange', tryPlay);
      window.removeEventListener('touchstart', tryPlay);
      window.removeEventListener('click', tryPlay);
    };
  }, []);

  return (
    <div className="transform-scene" aria-hidden="true">
      <video
        ref={videoRef}
        className="transform-video"
        src="/transform.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="transform-overlay" />
    </div>
  );
};

export default TransformScene;
