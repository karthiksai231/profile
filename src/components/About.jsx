import React from 'react';
import '../styles/About.css';

const About = () => (
  <section id="about" className="about">
    <div className="about-content" data-tilt-in>
      <p className="kicker">ABOUT</p>
      <p className="about-statement">
        I build <span className="accent">scalable, high-performance systems</span> —
        back-end services, cloud infrastructure on AWS and Azure, and
        microservices with test-driven development. CI/CD, distributed systems,
        and a habit of leaving things faster than I found them.
      </p>
    </div>
  </section>
);

export default About;
