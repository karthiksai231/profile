import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import '../styles/Mascot.css';

const MESSAGES = [
  "Hi there! 👋",
  "I'm watching you! 👀",
  "Nice click! ✨",
  "You're awesome! 🚀",
  "Drag me around! 🎢",
  "Wheee! 🌪️",
  "Coding is fun! 💻",
  "Don't forget to hydrate! 💧",
  "Review my code? 🥺",
  "I love React! ⚛️"
];

const Mascot = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const containerRef = useRef(null);
  const controls = useAnimation();
  const messageTimeoutRef = useRef(null);

  // Eye Tracking Logic
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Blinking Logic
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 4000); // Blink every 4 seconds

    return () => clearInterval(blinkInterval);
  }, []);

  // Click Reaction & Message Logic
  const handleBodyClick = () => {
    // Jump animation
    controls.start({
      y: -30,
      transition: { duration: 0.2, yoyo: 1, ease: 'easeOut' },
    });

    // Show random message
    const randomMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    setMessage(randomMsg);
    setShowMessage(true);

    if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
    messageTimeoutRef.current = setTimeout(() => setShowMessage(false), 3000);
  };

  // Calculate eye translation
  const calculateEyePosition = (eyeXOffset, eyeYOffset) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    
    const rect = containerRef.current.getBoundingClientRect();
    const mascotCenterX = rect.left + rect.width / 2;
    const mascotCenterY = rect.top + rect.height / 2;

    const deltaX = mousePosition.x - (mascotCenterX + eyeXOffset);
    const deltaY = mousePosition.y - (mascotCenterY + eyeYOffset);
    
    const maxMove = 6;
    const angle = Math.atan2(deltaY, deltaX);
    const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 150);
    const moveX = Math.cos(angle) * Math.min(distance / 15, maxMove);
    const moveY = Math.sin(angle) * Math.min(distance / 15, maxMove);

    return { x: moveX, y: moveY };
  };

  const leftEyePos = calculateEyePosition(-15, -10);
  const rightEyePos = calculateEyePosition(15, -10);

  return (
    <motion.div
      className="mascot-container"
      ref={containerRef}
      animate={controls}
      drag
      dragMomentum={false}
      dragConstraints={{ left: 0, right: window.innerWidth - 100, top: 0, bottom: window.innerHeight - 100 }}
      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
      whileTap={{ scale: 0.95 }}
      onClick={handleBodyClick}
    >
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="speech-bubble visible"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.8 }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <svg
        viewBox="0 0 100 100"
        className="mascot-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Antennas */}
        <motion.path
            d="M30 30 L20 10"
            stroke="#6366f1"
            strokeWidth="3"
            strokeLinecap="round"
             animate={{ rotate: [0, -5, 0] }}
             transition={{ repeat: Infinity, duration: 2 }}
        />
        <motion.circle cx="20" cy="10" r="3" fill="#ef4444" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} />

        <motion.path
            d="M70 30 L80 10"
            stroke="#6366f1"
            strokeWidth="3"
             strokeLinecap="round"
             animate={{ rotate: [0, 5, 0] }}
             transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
        />
        <motion.circle cx="80" cy="10" r="3" fill="#ef4444" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }} />


        {/* Body */}
        <rect x="25" y="30" width="50" height="60" rx="15" className="mascot-body" />
        <rect x="35" y="55" width="30" height="25" rx="8" className="mascot-belly" />

        {/* Eyes Container */}
        <g>
            <circle cx="40" cy="45" r="8" className="eye-white" />
            
            {/* Left Pupil (Normal) */}
            {!isBlinking && (
                <motion.circle
                cx="40"
                cy="45"
                r="3.5"
                className="eye-pupil"
                animate={{ x: leftEyePos.x, y: leftEyePos.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
            )}
            {/* Blink State */}
            {isBlinking && <line x1="32" y1="45" x2="48" y2="45" stroke="#333" strokeWidth="2" strokeLinecap="round" />}

            
            <circle cx="60" cy="45" r="8" className="eye-white" />
            
             {/* Right Pupil (Normal) */}
             {!isBlinking && (
                <motion.circle
                cx="60"
                cy="45"
                r="3.5"
                className="eye-pupil"
                animate={{ x: rightEyePos.x, y: rightEyePos.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
             )}
              {/* Blink State */}
             {isBlinking && <line x1="52" y1="45" x2="68" y2="45" stroke="#333" strokeWidth="2" strokeLinecap="round" />}
        </g>

        {/* Mouth - Changes on hover/click */}
        <motion.path
          d="M40 70 Q50 75 60 70"
          stroke="#333"
          strokeWidth="3"
          strokeLinecap="round"
          fill="transparent"
          animate={{ d: showMessage ? "M40 70 Q50 85 60 70" : "M40 70 Q50 75 60 70" }} 
        />
      </svg>
    </motion.div>
  );
};

export default Mascot;
