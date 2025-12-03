import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaMedium, FaEnvelope, FaPhone } from 'react-icons/fa';
import resumeData from '../data/resume.json';
import '../styles/Contact.css';

const Contact = () => {
  const { email, phone, links } = resumeData.profile;

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="contact-content"
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="contact-text">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div className="contact-links">
            <a href={`mailto:${email}`} className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span>{email}</span>
            </a>
            <a href={`tel:${phone}`} className="contact-item">
              <FaPhone className="contact-icon" />
              <span>{phone}</span>
            </a>
          </div>

          <div className="social-links-large">
             {links.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="social-btn">
                {link.name === 'Github' && <FaGithub />}
                {link.name === 'Medium' && <FaMedium />}
                <span>{link.name}</span>
              </a>
            ))}
          </div>

          <footer className="footer">
            <p>© {new Date().getFullYear()} Kartheek Pamidimukkala. Built with React & Vite.</p>
          </footer>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
