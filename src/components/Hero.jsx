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
          SOFTWARE ENGINEER · RALEIGH, NC
        </p>
        <h1 className="hero-name" data-layer="110">
          {first}
          <br />
          {rest.join(' ')}
        </h1>
        <p className="hero-summary" data-layer="45">
          Eight years building backends that stay fast at scale — Meta, Angi,
          Bandwidth, Lenovo, Citrix. Currently teaching AI agents to do real
          work.
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
            <p className="chip-value chip-value-blue">80%</p>
            <p className="chip-label">faster responses @ Meta</p>
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
