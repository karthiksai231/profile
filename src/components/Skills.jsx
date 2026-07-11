import React from 'react';
import resumeData from '../data/resume.json';
import '../styles/Skills.css';

const CUBE_FACES = [
  { label: 'LANGUAGES', items: 'JavaScript · Python · Java · C#', transform: 'translateZ(125px)' },
  { label: 'FRONTEND', items: 'React · AngularJS · HTML/CSS', transform: 'rotateY(90deg) translateZ(125px)' },
  { label: 'BACKEND', items: 'Spring Boot · .NET · Node · Kafka', transform: 'rotateY(180deg) translateZ(125px)' },
  { label: 'CLOUD', items: 'AWS · Azure · Docker · K8s', transform: 'rotateY(270deg) translateZ(125px)' },
  { label: 'DATA', items: 'MySQL · MongoDB · SQL', transform: 'rotateX(90deg) translateZ(125px)' },
  { label: 'PRACTICES', items: 'TDD · CI/CD · Distributed systems', transform: 'rotateX(-90deg) translateZ(125px)' },
];

const Skills = () => {
  const { skills } = resumeData;

  return (
    <section id="skills" className="skills">
      <div className="skills-container">
        <div className="skills-copy">
          <p className="kicker">SKILLS</p>
          <h2 className="section-heading">
            The stack,
            <br />
            from every angle.
          </h2>
          <p className="skills-lede">
            Keep scrolling — the cube turns with you. Languages to clouds,
            front to back.
          </p>
          <div className="skills-chips">
            {skills.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="cube-stage">
          <div id="skills-cube" className="cube">
            {CUBE_FACES.map((face) => (
              <div
                key={face.label}
                className="cube-face"
                style={{ transform: face.transform }}
              >
                <p className="cube-label">{face.label}</p>
                <p className="cube-items">{face.items}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
