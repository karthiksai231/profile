import React, { createContext, useContext, useState } from 'react';
import useSound from 'use-sound';

const SoundContext = createContext();

export const useSoundManager = () => useContext(SoundContext);

// Using public URLs for better quality
const SOUNDS = {
  pop: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.m4a',
  click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.m4a',
  success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.m4a',
  hover: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.m4a'
};

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  
  const [playPop] = useSound(SOUNDS.pop, { volume: 0.5, soundEnabled: !isMuted });
  const [playClick] = useSound(SOUNDS.click, { volume: 0.5, soundEnabled: !isMuted });
  const [playSuccess] = useSound(SOUNDS.success, { volume: 0.4, soundEnabled: !isMuted });
  const [playHover] = useSound(SOUNDS.hover, { volume: 0.1, soundEnabled: !isMuted });

  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playPop, playClick, playSuccess, playHover }}>
      {children}
    </SoundContext.Provider>
  );
};
