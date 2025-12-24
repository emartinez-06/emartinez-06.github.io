import React from 'react';
import { createRoot } from 'react-dom/client';
import Hero from './components/Hero';

const heroNode = document.getElementById('react-hero');

if (heroNode) {
  const root = createRoot(heroNode);
  root.render(<Hero />);
}
