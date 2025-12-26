import React from 'react';
import { createRoot } from 'react-dom/client';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

const App = () => {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </>
  );
};

const heroNode = document.getElementById('react-hero');

if (heroNode) {
  const root = createRoot(heroNode);
  root.render(<App />);
}
