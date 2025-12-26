import React from 'react';

const About = () => {
  return (
    <section id="about" className="section about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="vim-terminal">
          <div className="vim-header">
            <div className="vim-tabs">
              <div className="vim-tab active">about.md</div>
            </div>
          </div>
          <div className="vim-content">
            <div className="vim-line">
              <span className="vim-text">I'm currently pursuing a double major in Mathematics and Computer Science at Baylor University. I'm honing my skills through relevant coursework, whether in Data Structures and Algorithms or Multivariable Calculus and Linear Algebra.</span>
            </div>
            <div className="vim-line">
              <span className="vim-text"></span>
            </div>
            <div className="vim-line">
              <span className="vim-text">I have a primary interest in AI and Agentic workflows for automation, orchestrating big data to deliver actionable business insights, learning the why behind concepts rather than just the how, and the intersection of a technical mind with a client-facing position.</span>
            </div>
          </div>
          <div className="vim-statusbar">
            <span className="vim-mode">-- VISUAL --</span>
            <span className="vim-position">2 lines</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
