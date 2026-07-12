import React from 'react';
import '../styles/TransformScene.css';

// Full-screen cinematic backdrop: the truck-to-mech transformation video
// playing on a continuous loop behind the page content.
const TransformScene = () => (
  <div className="transform-scene" aria-hidden="true">
    <video
      className="transform-video"
      src="/transform.mp4"
      autoPlay
      muted
      loop
      playsInline
    />
    <div className="transform-overlay" />
  </div>
);

export default TransformScene;
