import React from 'react';
import { motion } from 'framer-motion';
import resumeData from '../data/resume.json';
import '../styles/Experience.css';

const Experience = () => {
  const { employment } = resumeData;

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div className="timeline">
          {employment.map((job, index) => (
            <motion.div 
              key={index} 
              className="timeline-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="timeline-content">
                <div className="job-header">
                  <h3 className="job-role">{job.role}</h3>
                  <span className="job-company">{job.company}</span>
                  <span className="job-period">{job.period}</span>
                  <span className="job-location">{job.location}</span>
                </div>
                <ul className="job-achievements">
                  {job.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
