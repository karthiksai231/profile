import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import resumeData from '../data/resume.json';
import '../styles/Skills.css';

const Skills = () => {
  const { skills } = resumeData;
  const [activeCategory, setActiveCategory] = useState("Languages");

  // Manual categorization with estimated proficiency
  const categorizedSkills = {
    "Languages": [
      { name: "JavaScript", level: 95 },
      { name: "Python", level: 90 },
      { name: "Java", level: 85 },
      { name: "C#", level: 80 },
      { name: "SQL", level: 85 },
      { name: "C++", level: 70 }
    ],
    "Frontend": [
      { name: "React", level: 95 },
      { name: "AngularJS", level: 75 },
      { name: "HTML/CSS", level: 90 }
    ],
    "Backend": [
      { name: "Spring Boot", level: 85 },
      { name: ".NET Core", level: 80 },
      { name: "Node.js", level: 85 },
      { name: "Apache Kafka", level: 75 }
    ],
    "Cloud & DevOps": [
      { name: "Amazon AWS", level: 85 },
      { name: "Microsoft Azure", level: 80 },
      { name: "Docker", level: 85 },
      { name: "Kubernetes", level: 75 },
      { name: "Git", level: 90 }
    ],
    "Databases": [
      { name: "MySQL", level: 85 },
      { name: "MongoDB", level: 80 }
    ]
  };

  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <h2 className="section-title">Technical Expertise</h2>
        
        <div className="skills-container">
          {Object.entries(categorizedSkills).map(([category, items], index) => (
            <motion.div 
              key={category}
              className={`skill-category ${activeCategory === category ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className="category-header" 
                onClick={() => toggleCategory(category)}
              >
                <h3 className="category-title">{category}</h3>
                <span className="toggle-icon">
                  {activeCategory === category ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>

              <AnimatePresence>
                {activeCategory === category && (
                  <motion.div 
                    className="skill-list"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div style={{ padding: '1.5rem 0' }}>
                      {items.map((skill, i) => (
                        <div key={skill.name} className="skill-item">
                          <div className="skill-info">
                            <span>{skill.name}</span>
                            <span>{skill.level}%</span>
                          </div>
                          <div className="skill-bar-bg">
                            <motion.div 
                              className="skill-bar-fill"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
