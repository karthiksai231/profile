import React from 'react';
import '../styles/Header.css';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Header = () => (
  <header className="header">
    <div className="header-container">
      <a href="#top" className="logo">
        KP<span className="dot">.</span>
      </a>
      <nav className="nav">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={link.name === 'Contact' ? 'nav-accent' : ''}
          >
            {link.name}
          </a>
        ))}
      </nav>
    </div>
  </header>
);

export default Header;
