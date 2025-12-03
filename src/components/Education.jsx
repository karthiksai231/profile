import React from 'react';
import { motion } from 'framer-motion';
import resumeData from '../data/resume.json';
import '../styles/Education.css';

const Education = () => {
  const { education, certifications } = resumeData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section id="education" className="section education">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="education-grid"
        >
          <div className="education-column">
            <h2 className="section-title">Education</h2>
            {education.map((edu, index) => (
              <motion.div key={index} className="edu-card" variants={itemVariants}>
                <h3 className="edu-degree">{edu.degree}</h3>
                <span className="edu-school">{edu.university}</span>
                <span className="edu-period">{edu.period}</span>
                <span className="edu-location">{edu.location}</span>
              </motion.div>
            ))}
          </div>

          <div className="education-column">
            <h2 className="section-title">Certifications</h2>
            {certifications.map((cert, index) => (
              <motion.div key={index} className="cert-card" variants={itemVariants}>
                <h3 className="cert-name">{cert}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
