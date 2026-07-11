import React from 'react';
import resumeData from '../data/resume.json';
import '../styles/Education.css';

const Education = () => {
  const { education, certifications } = resumeData;

  return (
    <section className="education">
      <div className="education-grid">
        <div className="edu-panel" data-tilt-in>
          <p className="panel-kicker">EDUCATION</p>
          {education.map((edu) => (
            <div key={edu.degree} className="edu-entry">
              <p className="edu-degree">{edu.degree}</p>
              <p className="edu-meta">
                {edu.university} · {edu.period}
              </p>
            </div>
          ))}
        </div>
        <div className="edu-panel" data-tilt-in>
          <p className="panel-kicker">CERTIFIED</p>
          <p className="cert-list">
            {certifications.map((cert) => (
              <span key={cert}>
                {cert.replace(' Certificate', '')}
                <br />
              </span>
            ))}
          </p>
        </div>
        <div className="edu-panel" data-tilt-in>
          <p className="panel-kicker">WRITING</p>
          <p className="cert-list">Occasional engineering notes on Medium.</p>
          <a
            href="https://medium.com/@kartheeksaip"
            target="_blank"
            rel="noopener noreferrer"
            className="panel-link"
          >
            Read on Medium →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Education;
