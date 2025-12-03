import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header 
      className={`header ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container header-container">
        <a href="#home" className="logo">
          KP<span className="dot">.</span>
        </a>

        <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>{link.name}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
