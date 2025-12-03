import React from 'react';
import { motion } from 'framer-motion';
import resumeData from '../data/resume.json';
import '../styles/About.css';

const About = () => {
  const { summary } = resumeData.profile;

  return (
    <section id="about" className="section about">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <p className="about-text">{summary}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
