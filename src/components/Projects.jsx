import React from 'react';
import '../styles/Projects.css';

// Replace these placeholders with real projects:
// { title, description, link, image }
const PROJECTS = [null, null];

const Projects = () => (
  <section id="projects" className="projects">
    <div className="projects-container">
      <p className="kicker center">PROJECTS</p>
      <h2 className="section-heading center projects-heading">Selected work</h2>
      <div className="projects-grid">
        {PROJECTS.map((project, i) => (
          <div key={i} data-tilt-card={i % 2 === 0 ? 'left' : 'right'}>
            {project ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
              >
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </a>
            ) : (
              <div className="project-slot">
                Project slot — add details in Projects.jsx
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
