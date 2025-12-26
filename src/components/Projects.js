import React, { useState, useEffect } from 'react';

const TerminalText = ({ text, delay = 0, speed = 60 }) => {
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

const ProjectCard = ({ title, description, contribution, repoLink, demoLink, image, tags, intro, terminalTitle, isActive }) => {
  return (
    <div className={`project-card-carousel ${isActive ? 'active' : 'inactive'}`}>
      <div className="card-top">
        <div className="card-thumbnail">
          {terminalTitle ? (
            <h3 className="card-terminal-title">{terminalTitle}</h3>
          ) : (
            <img src={image || 'https://via.placeholder.com/400x250'} alt={title} />
          )}
          <div className="nvim-chrome"></div>
        </div>
        {tags && tags.length > 0 && (
          <div className="card-tags">
            {tags.map((tag, index) => (
              <span key={index} className="card-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div className="card-bottom">
        <h3 className="card-title">{title}</h3>
        {isActive && (
          <div className="card-content">
            <div className="card-content-wrapper">
              <div className="card-content-section">
                <span className="card-description-label">Description</span>
                <p className="card-description">{description}</p>
              </div>
              {contribution && (
                <div className="card-content-section">
                  <div className="card-contribution">
                    <span className="contribution-label">My Contribution</span>
                    <p>{contribution}</p>
                  </div>
                </div>
              )}
            </div>
            {(repoLink || demoLink) && (
              <div className="card-links">
                {repoLink && (
                  <a href={repoLink} className="card-link" target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                    GitHub
                  </a>
                )}
                {demoLink && (
                  <a href={demoLink} className="card-link" target="_blank" rel="noopener noreferrer">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0z"/>
                      <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
                    </svg>
                    Demo
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Carousel = ({ projects, title, showTitle }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardOffset, setCardOffset] = useState(1000);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  useEffect(() => {
    const updateCardOffset = () => {
      const cardWidth = Math.min(750, window.innerWidth * 0.85);
      setCardOffset(cardWidth + 100);
    };

    updateCardOffset();
    window.addEventListener('resize', updateCardOffset);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', updateCardOffset);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="projects-section">
      <h2 className="section-title">
        {showTitle && <TerminalText text={title} delay={0} speed={50} />}
      </h2>
      <div className="carousel-container">
        <button className="carousel-nav carousel-nav-left" onClick={handlePrev} aria-label="Previous project">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div className="carousel-wrapper">
          <div className="carousel-track-centered">
            {projects.map((project, index) => {
              const offset = index - activeIndex;
              const isActive = index === activeIndex;

              return (
                <div
                  key={index}
                  className={`carousel-slide ${isActive ? 'center' : ''}`}
                  style={{
                    transform: `translateX(calc(-50% + ${offset * cardOffset}px)) scale(${isActive ? 1 : 0.8})`,
                    opacity: isActive ? 1 : 0.3,
                    filter: isActive ? 'blur(0px)' : 'blur(4px)',
                    zIndex: isActive ? 10 : 1,
                    pointerEvents: isActive ? 'auto' : 'none'
                  }}
                >
                  <ProjectCard {...project} isActive={isActive} />
                </div>
              );
            })}
          </div>
        </div>

        <button className="carousel-nav carousel-nav-right" onClick={handleNext} aria-label="Next project">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <div className="carousel-indicators">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const currentWork = [
    {
      title: "Dotfiles & Configs",
      terminalTitle: ".dotfiles",
      intro: "",
      description: "My custom config files including a custom sketchybar that connect to aerospace tiles displaying core information on the current tile. A Iterm + Tmux + Nvim config that overhauls the old terminal. A custom Utilsnips libary inspired by Gilles Catrol and made for LaTeX notes",
      repoLink: "https://github.com/emartinez-06/.dotfiles",
      tags: ["Neovim", "Tmux", "Aerospace", "Iterm", "Utilsnips", "sketchybar"]
    },
    {
      title: "Neovim Setup",
      terminalTitle: "NeoVim",
      intro: "Heavily customized Neovim configuration with modern IDE features",
      description: "A full-featured Neovim setup with LSP, treesitter, auto completion, Git intergration, and custom keybindings tailored to my workflow.",
      repoLink: "https://github.com/emartinez-06/.dotfiles/nvim",
      tags: ["Lua", "Neovim", "LSP", "Git"]
    },
    {
      title: "This Website",
      terminalTitle: "Portfolio",
      intro: "Personal portfolio built with React and Jekyll",
      description: "A modern portfolio website featuring terminal-inspired aesthetics, smooth animations, and a clean, professional design.",
      contribution: "Designed using React components, SCSS for styling, and Jekyll for static site generation.",
      repoLink: "https://github.com/emartinez-06/emartinez-06.github.io",
      demoLink: "https://emartinez-06.github.io",
      tags: ["React", "Jekyll", "SCSS"]
    }
  ];

  const projects = [
      {
      title: "2025 Fall Engagement",
      terminalTitle: "CGB Engagement",
      intro: "Strategic technology consulting for digital transformation",
      description: "A strategic advisory engagement focused on modernizing the technology infrastructure of a commerical manufacturing client to support future scalability.",
      contribution: "Evaluated Enterprise Resource Planning (ERP) suites to consolidate dispersed systems and translated complex technical constraints into actionable business strategies.",
      tags: ["ERP Analysis", "Technical Consulting", "System Architecture"]
    },
    {
      title: "CSI 1430 Capstone: Geometria",
      terminalTitle: "Geometria",
      intro: "Physics-based arcade game with unique gravity mechanics",
      description: "A physics-based arcade game built with C++ and SDL2. Players utilize vector-based mouse aiming to launch a ball at rising colored blocks, managing gravity mechanics and increasing difficulty levels. Features a unique narrative overlay regarding warring geometric clans.",
      contribution: "Collaborated on the implementation of game physics, including velocity vectors, gravity simulation, and hitbox collision detection. Optimized performance by refactoring to pass-by-reference variables and integrated SDL libraries (Plotter, Mixer, TTF) for audio-visual rendering and UI.",
      repoLink: "https://github.com/emartinez-06/Geometria",
      demoLink: "/assets/projects/one/CSI 1430 Group Project N4.G3.pptx",
      tags: ["C++", "SDL2", "Game Physics", "Git"]
    }
    
  ];

  const [showFirstTitle, setShowFirstTitle] = useState(false);
  const [showSecondTitle, setShowSecondTitle] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !showFirstTitle) {
            setShowFirstTitle(true);
            setTimeout(() => setShowSecondTitle(true), 2000);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('projects');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [showFirstTitle]);

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <Carousel
          projects={currentWork}
          title="What I'm Currently Working On"
          showTitle={showFirstTitle}
        />

        <div className="projects-divider"></div>

        <Carousel
          projects={projects}
          title="Projects"
          showTitle={showSecondTitle}
        />
      </div>
    </section>
  );
};

export default Projects;
