import React from 'react';
import '../styles/Character3D.css';

// Thin wrapper around Google's <model-viewer> web component (loaded in index.html).
// Renders a GLB with a transparent background so characters sit directly on the page.
const Character3D = ({
  src,
  alt,
  className = '',
  autoRotate = false,
  animated = false,
  scrollScrub = false,
  cameraControls = false,
  cameraOrbit,
}) => {
  const flags = {
    ...(autoRotate ? { 'auto-rotate': '' } : {}),
    ...(animated || scrollScrub ? { autoplay: true } : {}),
    ...(scrollScrub ? { 'data-scrub-anim': '' } : {}),
    ...(cameraControls ? { 'camera-controls': '', 'disable-zoom': '' } : {}),
    ...(cameraOrbit ? { 'camera-orbit': cameraOrbit } : {}),
  };

  return (
    <model-viewer
      class={`character-3d ${className}`}
      src={src}
      alt={alt}
      loading="lazy"
      interaction-prompt="none"
      shadow-intensity="0.7"
      shadow-softness="1"
      exposure="1.1"
      {...flags}
    />
  );
};

export default Character3D;
