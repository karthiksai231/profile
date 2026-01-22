import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaMedium, FaLinkedin, FaEnvelope, FaGamepad } from 'react-icons/fa';
import resumeData from '../data/resume.json';
import Modal from './Modal';
import SnakeGame from './SnakeGame';
import '../styles/Hero.css';

const Hero = () => {
  const { name, title, summary, links, email } = resumeData.profile;
  const [isGameOpen, setIsGameOpen] = React.useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Particle Animation Logic
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Create particles
    const createParticles = () => {
      const particleCount = Math.min(window.innerWidth / 10, 100);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
        });
      }
    };
    createParticles();

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 215, 0, 0.5)'; // Gold
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.15)'; // Gold lines

      particles.forEach((p, index) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="home" className="hero">
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="container hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="greeting">
            Hello, I'm
          </motion.p>
          <motion.h1 variants={itemVariants} className="name">
            {name}
          </motion.h1>
          <motion.h2 variants={itemVariants} className="title">
            {title}
          </motion.h2>
          
          <motion.div variants={itemVariants} className="social-links">
            <a href={`mailto:${email}`} aria-label="Email">
              <FaEnvelope />
            </a>
            {links.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                {link.name === 'Github' && <FaGithub />}
                {link.name === 'Medium' && <FaMedium />}
                {/* Add more icons as needed */}
              </a>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="cta-buttons">
            <a href="#contact" className="btn btn-primary">
              Contact Me
            </a>
            <a href="/Kartheek_Pamidimukkala_-_Software_Engineer.pdf" download className="btn btn-outline">
              Download Resume
            </a>
            <button onClick={() => setIsGameOpen(true)} className="btn btn-game">
              Play Snake <FaGamepad style={{ marginLeft: '8px' }} />
            </button>
          </motion.div>
        </motion.div>
      </div>
      <div className="hero-background">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
      </div>

      <Modal isOpen={isGameOpen} onClose={() => setIsGameOpen(false)}>
        <SnakeGame />
      </Modal>
    </section>
  );
};

export default Hero;
