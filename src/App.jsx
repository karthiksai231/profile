import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Mascot from './components/Mascot';
import { SoundProvider } from './components/SoundManager';
import './App.css';

function App() {
  return (
    <SoundProvider>
      <div className="App">
        <Header />
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Education />
          <Blog />
          <Contact />
        </main>
        <Footer />
        <Mascot />
      </div>
    </SoundProvider>
  );
}

export default App;
