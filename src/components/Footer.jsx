import React from 'react';
import VisitorCounter from './VisitorCounter';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-content">
          <p className="copyright">
            &copy; {currentYear} Kartheek Pamidimukkala. All rights reserved.
          </p>
          <VisitorCounter />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
