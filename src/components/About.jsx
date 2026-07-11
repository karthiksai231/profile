import React from 'react';
import '../styles/About.css';

const About = () => (
  <section id="about" className="about">
    <div className="about-content" data-tilt-in>
      <p className="kicker">ABOUT</p>
      <p className="about-statement">
        I build <span className="accent">AI-native platforms on distributed-systems
        foundations</span> — multi-agent workflows, RAG pipelines, MCP connectors,
        and eval harnesses that turn ambiguous business workflows into reliable
        internal apps. Ten years of Python backend engineering, data
        architecture, and a habit of leaving things faster than I found them.
      </p>
    </div>
  </section>
);

export default About;
