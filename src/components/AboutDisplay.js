import React from 'react';
import { aboutContent } from '../data/aboutContent';

const AboutDisplay = () => {
  return (
    <section className="about-display">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="vim-terminal">
          <div className="vim-header">
            <div className="vim-tabs">
              <div className="vim-tab active">{aboutContent.fileName}</div>
            </div>
          </div>
          <div className="vim-content">
            {aboutContent.paragraphs.map((paragraph, index) => (
              <React.Fragment key={index}>
                <div className="vim-line">
                  <span className="vim-text">{paragraph}</span>
                </div>
                {index < aboutContent.paragraphs.length - 1 && (
                  <div className="vim-line">
                    <span className="vim-text"></span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="vim-statusbar">
            <span className="vim-mode">-- NORMAL --</span>
            <span className="vim-position">{aboutContent.lineCount} lines</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDisplay;
