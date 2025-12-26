import React, { useState, useEffect } from 'react';

const TerminalText = ({ text, delay = 0, speed = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let typeTimer;
    let cursorTimer;

    const timer = setTimeout(() => {
      let i = 0;
      typeTimer = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typeTimer);
          cursorTimer = setTimeout(() => setShowCursor(false), 1000);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (typeTimer) clearInterval(typeTimer);
      if (cursorTimer) clearTimeout(cursorTimer);
    };
  }, [text, delay, speed]);

  return (
    <span>
      {displayText}
      {showCursor && <span className="terminal-cursor"></span>}
    </span>
  );
};

const Hero = () => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 2000);
    const buttonsTimer = setTimeout(() => setShowButtons(true), 3500);

    return () => {
      clearTimeout(subtitleTimer);
      clearTimeout(buttonsTimer);
    };
  }, []);

  return (
    <div className="hero">
      <div className="hero-content">
        <div className="terminal-prompt">
          <span className="user">erick</span>
          <span>@</span>
          <span className="host">portfolio</span>
          <span>:</span>
          <span className="path">~</span>
          <span>$ </span>
        </div>

        <h1 className="hero-title">
          <TerminalText text="Hello, I'm Erick Martinez" delay={500} speed={80} />
        </h1>

        {showSubtitle && (
          <p className="hero-subtitle fade-in">
            <TerminalText
              text="Mathematics & Computer Science, Baylor '28"
              delay={0}
              speed={60}
            />
          </p>
        )}

        {showButtons && (
          <div className="cta-buttons fade-in-up">
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get In Touch
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
