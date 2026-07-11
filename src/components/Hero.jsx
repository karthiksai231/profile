import React from 'react';
import resumeData from '../data/resume.json';
import '../styles/Hero.css';

const Hero = () => {
  const { name } = resumeData.profile;
  const [first, ...rest] = name.split(' ');

  return (
    <section id="top" className="hero">
      <div className="hero-glow hero-glow-1" data-depth="-0.35" />
      <div className="hero-glow hero-glow-2" data-depth="-0.2" />
      <div className="hero-grid-floor" />

      <div id="hero-scene" className="hero-scene">
        <p className="hero-kicker" data-layer="60">
          SENIOR SOFTWARE ENGINEER · RALEIGH, NC
        </p>
        <h1 className="hero-name" data-layer="110">
          {first}
          <br />
          {rest.join(' ')}
        </h1>
        <p className="hero-summary" data-layer="45">
          Ten years building distributed systems that stay fast at scale —
          Meta, Angi, Bandwidth, Lenovo, Citrix. Currently leading AI-native
          platforms at Meta: multi-agent workflows, RAG, and evals.
        </p>
        <div className="hero-ctas" data-layer="80">
          <a href="#contact" className="btn btn-primary">
            Get in touch
          </a>
          <a href="#experience" className="btn btn-outline">
            See the work ↓
          </a>
        </div>

        <div className="hero-chip hero-chip-left" data-layer="150">
          <div className="chip-card chip-gold">
            <p className="chip-value">300%</p>
            <p className="chip-label">perf gain @ Lenovo</p>
          </div>
        </div>
        <div className="hero-chip hero-chip-right" data-layer="130">
          <div className="chip-card chip-blue">
            <p className="chip-value chip-value-blue">90%</p>
            <p className="chip-label">faster audit responses @ Meta</p>
          </div>
        </div>
      </div>

      <div className="scroll-hint">
        <span>SCROLL</span>
        <span className="scroll-line" />
      </div>
    </section>
  );
};

export default Hero;
