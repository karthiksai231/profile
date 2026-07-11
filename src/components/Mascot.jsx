import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import '../styles/Mascot.css';

const MESSAGES = [
  "Hello friend! ✨",
  "I'm Lumi! 🌟",
  "So shiny! 💎",
  "Let's build! 🚀",
  "You're a star! ⭐",
  "Draggable! 🛸",
  "Need a hand? 🤖",
  "Zzzz... 😴",
  "Waking up! ☀️",
  "Whoa! Dizzy! 🌀"
];

import resumeData from '../data/resume.json';

const GLOBAL_MESSAGES = [
  "Nice click! 🖱️",
  "Working hard? 💪",
  "I saw that! 👁️",
  "Interesting choice! 🤔",
  "Click click! 🎵",
  "On it! 🫡",
  "Good one! 👍",
  "Roger that! 🤖"
];

const Lumi = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const [isDizzy, setIsDizzy] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [particles, setParticles] = useState([]);
  
  const containerRef = useRef(null);
  const controls = useAnimation();
  const idleTimeoutRef = useRef(null);
  const messageTimeoutRef = useRef(null);
  
  // Motion values for drag velocity to detect dizziness
  const x = useMotionValue(0);
  const xVelocity = useMotionValue(0);
  
  useEffect(() => {
    // Determine velocity to trigger dizziness
    const unsubscribeX = x.on('change', (latest) => {
      const vel = x.getVelocity();
      if (Math.abs(vel) > 1500 && !isDizzy) {
        triggerDizzy();
      }
    });
    return () => unsubscribeX();
  }, [isDizzy, x]);

  // Activity Monitor (Sleep Logic) & Global Click Listener
  useEffect(() => {
    const resetIdleTimer = () => {
      if (isSleeping) {
        setIsSleeping(false);
        controls.start({ y: 0, scale: 1, rotate: 0, transition: { type: "spring" } });
        setMessage("I'm awake! ☀️");
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
      }
      
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(() => {
        setIsSleeping(true);
      }, 5000); // Sleep after 5s of inactivity
    };

    const handleGlobalClick = (event) => {
      resetIdleTimer();
      
      // Ignore if clicking the mascot itself (handled by handleBodyClick)
      if (event.target.closest('.mascot-container')) return;

      const target = event.target;
      const tag = target.tagName.toLowerCase();
      const text = target.innerText || "";
      const parentSection = target.closest('section');
      const sectionId = parentSection ? parentSection.id : "";
      
      // Deep Inspection for Resume Content
      const jobCard = target.closest('.timeline-item');
      const eduCard = target.closest('.edu-card');
      const certCard = target.closest('.cert-card');
      const skillItem = target.closest('.skill-item') || (sectionId === 'skills' && target.tagName === 'SPAN' ? target : null);

      let contextMsg = "";

      // 1. Specific Content Detection
      if (jobCard) {
        const company = jobCard.querySelector('.job-company')?.innerText;
        const role = jobCard.querySelector('.job-role')?.innerText;
        if (company) {
            contextMsg = [
                `Worked at ${company}! 🏢`,
                `${company} was great! 💼`,
                `${role}? Impressive! 🌟`
            ][Math.floor(Math.random() * 3)];
        }
      } else if (eduCard) {
          const school = eduCard.querySelector('.edu-school')?.innerText;
          const degree = eduCard.querySelector('.edu-degree')?.innerText;
          if (school) {
              contextMsg = [
                  `Studied at ${school}! 🎓`,
                  `${degree} is tough! 🧠`,
                  "Go Aggies? (maybe) 🏈"
              ][Math.floor(Math.random() * 3)];
          }
      } else if (certCard) {
          contextMsg = "Certified pro! 📜";
      } else if (skillItem) {
          const skillName = skillItem.innerText;
           contextMsg = [
              `${skillName} is useful! 🛠️`,
              `I know ${skillName} too! 🤖`,
              "Great tech stack! 💻"
          ][Math.floor(Math.random() * 3)];
      } 
      // 2. Fallback to Section/Tag Detection
      else if (!contextMsg) {
          if (tag === 'button' || target.closest('button')) {
            contextMsg = ["Action time! 🎬", "Boop! 👆", "Processing... ⚙️"][Math.floor(Math.random() * 3)];
          } else if (tag === 'a' || target.closest('a')) {
             contextMsg = ["Going somewhere? 🌍", "Nice link! 🔗", "Exploring! 🧭"][Math.floor(Math.random() * 3)];
          } else if (tag === 'input' || tag === 'textarea') {
             contextMsg = ["Typing mode! ✍️", "Tell me more! 📝", "Input detected! 💾"][Math.floor(Math.random() * 3)];
          } else if (tag === 'img') {
             contextMsg = ["Nice pic! 📸", "Visuals! 🎨", "Looking good! 🖼️"][Math.floor(Math.random() * 3)];
          } else if (sectionId === 'contact' || text.includes('Contact')) {
             contextMsg = ["Say hi! 👋", "Let's connect! 🤝", "Drop a message! 📩"][Math.floor(Math.random() * 3)];
          } else if (sectionId === 'skills') {
             contextMsg = ["So many skills! 🧠", "Power level > 9000! ⚡", "Tech stack! 📚"][Math.floor(Math.random() * 3)];
          } else if (sectionId === 'projects') {
             contextMsg = ["I like this one! 🏗️", "Cool build! 🛠️", "Awesome work! 🏆"][Math.floor(Math.random() * 3)];
          } else {
             contextMsg = GLOBAL_MESSAGES[Math.floor(Math.random() * GLOBAL_MESSAGES.length)];
          }
      }

      // 3. Small Animation (Hop)
      controls.start({
        y: -10,
        scale: 1.05,
        transition: { duration: 0.15, yoyo: 1 }
      });

      // 4. Show Message
      setMessage(contextMsg);
      setShowMessage(true);

      if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
      messageTimeoutRef.current = setTimeout(() => setShowMessage(false), 2000);
    };

    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
      resetIdleTimer();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleGlobalClick); // Replaced simple resetIdleTimer with full handler
    resetIdleTimer(); // Init

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleGlobalClick);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
    };
  }, [isSleeping, controls]);

  // Blinking Logic
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (!isSleeping && !isDizzy) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 3500); 

    return () => clearInterval(blinkInterval);
  }, [isSleeping, isDizzy]);

  const triggerDizzy = () => {
    setIsDizzy(true);
    setMessage("Whoa! Too fast! 🌀");
    setShowMessage(true);
    setTimeout(() => {
      setIsDizzy(false);
      setShowMessage(false);
    }, 2000);
  };

  const handleBodyClick = (e) => {
    // Prevent global handler from firing
    e.stopPropagation();

    // Create particles
    const rect = e.target.getBoundingClientRect();
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: 0, // Relative to center
      y: 0,
      angle: (i / 8) * 360,
    }));
    setParticles(prev => [...prev, ...newParticles]);
    
    // Animate Body
    controls.start({
      scale: [1, 1.2, 0.9, 1.1, 1],
      rotate: [0, -10, 10, -5, 5, 0],
      transition: { duration: 0.5 }
    });

    if (!isSleeping) {
      const randomMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
      setMessage(randomMsg);
      setShowMessage(true);
      if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
      messageTimeoutRef.current = setTimeout(() => setShowMessage(false), 3000);
    }
  };

  // Eye calculation
  const calculateEyePosition = (eyeXOffset, eyeYOffset) => {
    if (!containerRef.current || isSleeping || isDizzy) return { x: 0, y: 0 };
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = mousePosition.x - (centerX + eyeXOffset);
    const deltaY = mousePosition.y - (centerY + eyeYOffset);
    const angle = Math.atan2(deltaY, deltaX);
    const distance = Math.min(Math.sqrt(deltaX**2 + deltaY**2), 200);
    
    const moveX = Math.cos(angle) * (distance / 15);
    const moveY = Math.sin(angle) * (distance / 15);
    
    return { x: Math.min(Math.max(moveX, -8), 8), y: Math.min(Math.max(moveY, -8), 8) };
  };

  const leftEyePos = calculateEyePosition(-20, -10);
  const rightEyePos = calculateEyePosition(20, -10);

  return (
    <motion.div
      className="mascot-container"
      ref={containerRef}
      drag
      dragConstraints={{ left: 0, right: window.innerWidth - 140, top: 0, bottom: window.innerHeight - 140 }}
      whileHover={{ scale: 1.05 }}
      animate={controls}
      style={{ x }}
      onClick={handleBodyClick}
    >
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="speech-bubble"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.8 }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <svg viewBox="0 0 200 200" className="mascot-svg">
        <defs>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(165, 180, 252, 0.4)" />
            <stop offset="100%" stopColor="rgba(165, 180, 252, 0)" />
          </radialGradient>
        </defs>

        {/* Ambient Glow */}
        <motion.circle cx="100" cy="100" r="80" fill="url(#glow)" 
           animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
           transition={{ loop: Infinity, duration: 3, ease: "easeInOut" }}
        />

        {/* Floating Halo Ring */}
        <motion.path
            d="M 50, 100 a 50,15 0 1,0 100,0 a 50,15 0 1,0 -100,0" // Ellipse path
            fill="none"
            stroke="#a5b4fc"
            strokeWidth="3"
            strokeDasharray="10 10"
            animate={{ rotate: 360 }}
            transition={{ loop: Infinity, duration: 8, ease: "linear" }}
            style={{ originX: "50%", originY: "50%" }}
        />

        {/* Main Body (Organic Blob Shape) */}
        <motion.path
          d="M100,40 C140,40 170,70 170,110 C170,150 140,180 100,180 C60,180 30,150 30,110 C30,70 60,40 100,40 Z"
          fill="url(#bodyGrad)"
          animate={{
             d: isSleeping 
                ? "M100,60 C140,60 170,80 170,120 C170,150 140,170 100,170 C60,170 30,150 30,120 C30,80 60,60 100,60 Z" // Squished when sleeping
                : [
                  "M100,40 C140,40 170,70 170,110 C170,150 140,180 100,180 C60,180 30,150 30,110 C30,70 60,40 100,40 Z",
                  "M100,35 C145,35 175,65 175,105 C175,145 145,175 100,175 C55,175 25,145 25,105 C25,65 55,35 100,35 Z",
                  "M100,40 C140,40 170,70 170,110 C170,150 140,180 100,180 C60,180 30,150 30,110 C30,70 60,40 100,40 Z"
                ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Face Group */}
        <motion.g animate={{ y: isSleeping ? 10 : 0 }}>
             {/* Left Eye */}
            <g transform="translate(70, 90)">
                {isDizzy ? (
                     <motion.path d="M-10,-10 L10,10 M-10,10 L10,-10" stroke="white" strokeWidth="4" strokeLinecap="round" animate={{ rotate: 360 }} transition={{ loop: Infinity, duration: 1 }} />
                ) : isSleeping ? (
                    <path d="M-10,0 Q0,10 10,0" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
                ) : (
                    <>
                        <ellipse cx="0" cy="0" rx="12" ry="14" className="eye-white" />
                        {!isBlinking && (
                            <motion.circle cx="0" cy="0" r="6" className="eye-pupil" 
                             animate={{ x: leftEyePos.x, y: leftEyePos.y }}
                            />
                        )}
                        {isBlinking && <path d="M-10,2 L10,2" stroke="#1e1b4b" strokeWidth="3" />}
                    </>
                )}
            </g>

            {/* Right Eye */}
            <g transform="translate(130, 90)">
                 {isDizzy ? (
                     <motion.path d="M-10,-10 L10,10 M-10,10 L10,-10" stroke="white" strokeWidth="4" strokeLinecap="round" animate={{ rotate: 360 }} transition={{ loop: Infinity, duration: 1 }} />
                ) : isSleeping ? (
                    <path d="M-10,0 Q0,10 10,0" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
                ) : (
                    <>
                        <ellipse cx="0" cy="0" rx="12" ry="14" className="eye-white" />
                        {!isBlinking && (
                             <motion.circle cx="0" cy="0" r="6" className="eye-pupil" 
                               animate={{ x: rightEyePos.x, y: rightEyePos.y }}
                             />
                        )}
                        {isBlinking && <path d="M-10,2 L10,2" stroke="#1e1b4b" strokeWidth="3" />}
                    </>
                )}
            </g>

            {/* Mouth */}
            <motion.path 
                d={isSleeping ? "M90,120 Q100,125 110,120" : showMessage ? "M90,120 Q100,135 110,120" : "M90,115 Q100,125 110,115"}
                className="mouth"
                animate={{ scale: showMessage ? 1.2 : 1 }}
                style={{ originX: "50%", originY: "50%" }}
            />
            
            {/* Cheeks */}
            <circle cx="60" cy="110" r="6" fill="#f472b6" opacity="0.6" />
            <circle cx="140" cy="110" r="6" fill="#f472b6" opacity="0.6" />
        </motion.g>
        
        {/* Zzz Particles when sleeping */}
        <AnimatePresence>
            {isSleeping && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <motion.text x="140" y="50" fill="white" fontSize="20" fontWeight="bold"
                     animate={{ y: [0, -20], opacity: [0, 1, 0], x: [0, 10] }}
                     transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    >Z</motion.text>
                     <motion.text x="160" y="40" fill="white" fontSize="16" fontWeight="bold"
                     animate={{ y: [0, -20], opacity: [0, 1, 0], x: [0, 10] }}
                     transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >Z</motion.text>
                </motion.g>
            )}
        </AnimatePresence>
      </svg>
      
      {/* Click Particles */}
      {particles.map((p) => (
          <motion.div
            key={p.id}
            className="particle"
            initial={{ opacity: 1, x: 70, y: 70, scale: 0 }}
            animate={{ 
                x: 70 + Math.cos(p.angle * Math.PI / 180) * 80, 
                y: 70 + Math.sin(p.angle * Math.PI / 180) * 80, 
                opacity: 0, 
                scale: 1 
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ 
                background: "#fbbf24", 
                width: "8px", 
                height: "8px", 
                borderRadius: "50%" 
            }}
            onAnimationComplete={() => setParticles(prev => prev.filter(item => item.id !== p.id))}
          />
      ))}
    </motion.div>
  );
};

export default Lumi;
