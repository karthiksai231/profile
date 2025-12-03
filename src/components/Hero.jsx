import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaMedium, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import resumeData from '../data/resume.json';
import '../styles/Hero.css';

const Hero = () => {
  const { name, title, summary, links, email } = resumeData.profile;

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

  return (
    <section id="home" className="hero">
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
            <a href="#" className="btn btn-outline">
              Download Resume
            </a>
          </motion.div>
        </motion.div>
      </div>
      <div className="hero-background">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
      </div>
    </section>
  );
};

export default Hero;
