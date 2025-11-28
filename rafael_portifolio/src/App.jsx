import { useState, useEffect, useRef } from "react";
import "./App.css";
import project1Image from "./assets/images/project-1.jpg";
import project2Image from "./assets/images/project-2.jpg";
import project3Image from "./assets/images/project-3.jpg";
import linkedinPicture from "./assets/images/picture.jpg";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoAdvanceTimerRef = useRef(null);

  // Sample projects data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: "Is it worth to play? Project",
      description:
        "Full-stack web development project that implemented an AI-driven data aggregation tool that streamlined video game discovery by combining live web data and structured summaries, improving user decision-making.",
      image: project1Image,
      link: "https://is-it-worth-to-play-project.vercel.app/",
    },
    {
      id: 2,
      title: "Sniper Master",
      description:
        "Conceptualized and designed levels, puzzles, and gameplay systems to ensure balanced character utility, engaging challenges, and cohesive visual design.",
      image: project2Image,
      link: "https://www.crazygames.com/game/sniper-master",
    },
    {
      id: 3,
      title: "Clickermon",
      description:
        "Designed and balanced core game systems and progression while coordinating with the team to develop innovative concepts and maintain engaging gameplay.",
      image: project3Image,
      link: "https://www.crazygames.com/game/clickermon",
    },
  ];

  const resetAutoAdvance = () => {
    if (autoAdvanceTimerRef.current) {
      clearInterval(autoAdvanceTimerRef.current);
    }
    autoAdvanceTimerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 20000);
  };

  useEffect(() => {
    resetAutoAdvance();
    return () => {
      if (autoAdvanceTimerRef.current) {
        clearInterval(autoAdvanceTimerRef.current);
      }
    };
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
    resetAutoAdvance();
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    resetAutoAdvance();
  };

  const handleCarouselClick = (e) => {
    const carouselWidth = e.currentTarget.offsetWidth;
    const clickX = e.clientX - e.currentTarget.getBoundingClientRect().left;

    if (clickX < carouselWidth / 2) {
      goToPrevious();
    } else {
      goToNext();
    }
  };

  return (
    <div className="app">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Rafael Piñeiro</h1>
        <p className="hero-subtitle">
          Full Stack Web Developer and Game Designer
        </p>
      </div>

      {/* Projects Section */}
      <div className="projects-section">
        <h2 className="section-title">Projects</h2>
        <div className="carousel-container" onClick={handleCarouselClick}>
          <div
            className="carousel-track"
            style={{
              transform: `translateX(calc(20% - ${(currentIndex + 1) * 60}% - ${
                (currentIndex + 1) * 2
              }rem))`,
            }}
          >
            {/* Last item at the beginning for seamless loop */}
            <div
              className={`carousel-item ${
                currentIndex === 0 ? "previous" : ""
              }`}
            >
              <div className="carousel-item-content">
                <img
                  src={projects[projects.length - 1].image}
                  alt={projects[projects.length - 1].title}
                  className="carousel-image"
                />
                <div className="carousel-text">
                  <h3 className="carousel-title">
                    {projects[projects.length - 1].title}
                  </h3>
                  <p className="carousel-description">
                    {projects[projects.length - 1].description}
                  </p>
                  {projects[projects.length - 1].link && (
                    <a
                      href={projects[projects.length - 1].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="carousel-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Project →
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Original projects */}
            {projects.map((project, index) => {
              const isActive = index === currentIndex;
              const isPrevious =
                index ===
                (currentIndex - 1 + projects.length) % projects.length;
              const isNext = index === (currentIndex + 1) % projects.length;

              return (
                <div
                  key={project.id}
                  className={`carousel-item ${isActive ? "active" : ""} ${
                    isPrevious ? "previous" : ""
                  } ${isNext ? "next" : ""}`}
                >
                  <div className="carousel-item-content">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="carousel-image"
                    />
                    <div className="carousel-text">
                      <h3 className="carousel-title">{project.title}</h3>
                      <p className="carousel-description">
                        {project.description}
                      </p>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="carousel-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Project →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* First item at the end for seamless loop */}
            <div
              className={`carousel-item ${
                currentIndex === projects.length - 1 ? "next" : ""
              }`}
            >
              <div className="carousel-item-content">
                <img
                  src={projects[0].image}
                  alt={projects[0].title}
                  className="carousel-image"
                />
                <div className="carousel-text">
                  <h3 className="carousel-title">{projects[0].title}</h3>
                  <p className="carousel-description">
                    {projects[0].description}
                  </p>
                  {projects[0].link && (
                    <a
                      href={projects[0].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="carousel-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Project →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-indicators">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-indicator ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                  resetAutoAdvance();
                }}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-image-container">
            <img
              src={linkedinPicture}
              alt="Rafael Piñeiro"
              className="about-image"
            />
          </div>
          <div className="about-text-container">
            <p className="about-text">
              My name is Rafael Pinheiro, and I am a 26-year-old professional
              with four years of experience in game design, including the
              development of educational courses for schools. I have since
              expanded my expertise into full-stack web development, with a
              particular focus on back-end API architecture while also embracing
              the challenges of front-end development. I am proficient in
              English and have two years of experience as an English teacher.
              Additionally, I have served as a product manager, working closely
              with cross-functional teams to oversee product development and
              contributing to the organization of events that support strategic
              objectives.
            </p>
            <div className="about-buttons">
              <a
                href="https://www.linkedin.com/in/rafael-pinheiro-a630b5197/"
                target="_blank"
                rel="noopener noreferrer"
                className="about-button about-button-linkedin"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/rafaelpinheiro12"
                target="_blank"
                rel="noopener noreferrer"
                className="about-button about-button-github"
              >
                GitHub
              </a>
              <a
                href="https://drive.google.com/file/d/1KqQ9gG3kjuIhpSrWrA4J1eYZQmjs59SE/view?usp=sharing"
                download
                className="about-button about-button-cv"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
