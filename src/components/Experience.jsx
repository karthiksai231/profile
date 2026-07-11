import React from 'react';
import resumeData from '../data/resume.json';
import '../styles/Experience.css';

const Experience = () => {
  const { employment } = resumeData;

  return (
    <section id="experience" className="experience">
      <div className="experience-container">
        <p className="kicker center">EXPERIENCE</p>
        <h2 className="section-heading center">
          Five companies. One habit:
          <br />
          make it faster.
        </h2>
        <div className="job-list">
          {employment.map((job, index) => {
            const side = index % 2 === 0 ? 'left' : 'right';
            return (
              <div key={job.company} data-tilt-card={side} className="job-tilt">
                <div className={`job-card job-card-${side}`}>
                  <div className="job-top">
                    <h3 className="job-company">{job.company}</h3>
                    <span className="job-period">{job.period}</span>
                  </div>
                  <p className="job-role">
                    {job.role} · {job.location}
                  </p>
                  <ul className="job-achievements">
                    {job.achievements.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
