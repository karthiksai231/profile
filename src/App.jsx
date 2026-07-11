import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Character3D from './components/Character3D';
import { initScrollFX } from './effects/scrollFX';
import './App.css';

function App() {
  useEffect(() => initScrollFX({ intensity: 6 }), []);

  return (
    <div className="App">
      <Character3D
        src="/models/greeter.glb"
        alt="Robot mascot companion"
        className="character-3d-fixed"
        scrollScrub
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
