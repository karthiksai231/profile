import React from 'react';
import { motion } from 'framer-motion';
import resumeData from '../data/resume.json';
import '../styles/Skills.css';

const Skills = () => {
  const { skills } = resumeData;

  // Manual categorization for better display
  const categories = {
    "Languages": ["JavaScript", "Python", "Java", "C#", "C++", "SQL"],
    "Frontend": ["React", "AngularJS", "HTML/CSS"],
    "Backend": ["Spring Boot", ".NET Core", "Node.js", "Apache Kafka"],
    "Cloud & DevOps": ["Amazon AWS", "Microsoft Azure", "Docker", "Kubernetes", "Git"],
    "Databases": ["MySQL", "MongoDB"]
  };

  // Flatten skills to check against resume data to ensure we don't miss any
  // For now, we'll just use the categories and map the resume skills to them or just display all as tags if categorization is too strict.
  // Let's stick to a simple tag cloud for now to be safe and inclusive of all skills in the resume.
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section id="skills" className="section skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <motion.div 
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <motion.div 
              key={index} 
              className="skill-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05, backgroundColor: 'var(--color-primary)', color: 'var(--color-bg)' }}
            >
              {skill}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
