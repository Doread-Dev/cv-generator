import React, { useState, useEffect } from "react";
import styles from "../styles/LandingPage.module.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (e) => {
    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.08)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div className={styles.landingPageWrapper}>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <a href="#" className={styles.logo}>
          CvGenerator
        </a>
        <div className={styles.navLinks}>
          <button className={styles.navBtn} onClick={() => navigate("/Login")}>
            Login
          </button> 
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={`${styles.character} ${styles.character1}`}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="50"
              cy="35"
              r="10"
              fill="none"
              stroke="#111"
              strokeWidth="2"
            />
            <path
              d="M50,45 L50,65 M40,55 L60,55"
              stroke="#111"
              strokeWidth="2"
            />
            <path
              d="M40,70 Q50,80 60,70"
              stroke="#111"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        <div className={`${styles.character} ${styles.character2}`}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="50"
              cy="35"
              r="10"
              fill="none"
              stroke="#111"
              strokeWidth="2"
            />
            <path
              d="M50,45 L50,75 M40,55 L60,55"
              stroke="#111"
              strokeWidth="2"
            />
            <circle cx="40" cy="30" r="2" fill="#111" />
            <circle cx="60" cy="30" r="2" fill="#111" />
          </svg>
        </div>

        <div className={`${styles.character} ${styles.character3}`}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M30,30 L70,30 L70,70 L30,70 Z"
              fill="none"
              stroke="#111"
              strokeWidth="2"
            />
            <path
              d="M40,40 L40,60 M50,40 L50,60 M60,40 L60,60"
              stroke="#111"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroHeadline}>
            Build a CV that speaks your truth — and passes the filters.
          </h1>
          <p className={styles.heroSubhead}>
            An AI tool to craft personalized resumes that get through the ATS
            and into human hands.
          </p>
          <button
            className={styles.ctaButton}
            onClick={() => navigate("/Login")}
          >
            Start Creating
          </button>
        </div>

        <div className={styles.heroImage}>
          <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <rect
              x="150"
              y="20"
              width="400"
              height="340"
              rx="4"
              stroke="#111"
              fill="none"
              strokeWidth="2"
            />
            <line
              x1="200"
              y1="60"
              x2="500"
              y2="60"
              stroke="#111"
              strokeWidth="0"
              className={styles.cvLine}
            />
            <line
              x1="200"
              y1="100"
              x2="500"
              y2="100"
              stroke="#111"
              strokeWidth="1"
              className={styles.cvLine}
            />
            <line
              x1="200"
              y1="120"
              x2="500"
              y2="120"
              stroke="#111"
              strokeWidth="1"
              className={styles.cvLine}
            />
            <line
              x1="200"
              y1="140"
              x2="500"
              y2="140"
              stroke="#111"
              strokeWidth="1"
              className={styles.cvLine}
            />
            <line
              x1="200"
              y1="180"
              x2="300"
              y2="180"
              stroke="#111"
              strokeWidth="1"
              className={styles.cvLine}
            />
            <line
              x1="200"
              y1="200"
              x2="500"
              y2="200"
              stroke="#111"
              strokeWidth="1"
              className={styles.cvLine}
            />
            <line
              x1="200"
              y1="220"
              x2="500"
              y2="220"
              stroke="#111"
              strokeWidth="1"
              className={styles.cvLine}
            />
            <line
              x1="200"
              y1="250"
              x2="300"
              y2="250"
              stroke="#111"
              strokeWidth="1"
              className={styles.cvLine}
            />
            <line
              x1="200"
              y1="270"
              x2="500"
              y2="270"
              stroke="#111"
              strokeWidth="1"
              className={styles.cvLine}
            />
            <line
              x1="200"
              y1="290"
              x2="500"
              y2="290"
              stroke="#111"
              strokeWidth="1"
              className={styles.cvLine}
            />
            <g className={styles.pen}>
              <line
                x1="-5"
                y1="0"
                x2="5"
                y2="0"
                stroke="#111"
                strokeWidth="2"
              />
              <polygon points="-5,-3 5,-3 0,-10" fill="#111" />
            </g>
          </svg>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>How It Works</h2>

        <div className={styles.featuresGrid}>
          <div
            className={styles.featureCard}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.featureIcon}>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="15"
                  y="15"
                  width="70"
                  height="70"
                  fill="none"
                  stroke="#111"
                  strokeWidth="2"
                />
                <path
                  d="M25,30 L45,30 M25,40 L75,40 M25,50 L65,50 M25,60 L55,60"
                  stroke="#111"
                  strokeWidth="2"
                />
                <circle
                  cx="75"
                  cy="25"
                  r="5"
                  fill="none"
                  stroke="#111"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Smart Resume Templates</h3>
            <p className={styles.featureDesc}>
              Professionally designed templates that adapt to your industry and
              experience level, ensuring your resume makes the right impression.
            </p>
          </div>

          <div
            className={styles.featureCard}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.featureIcon}>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M30,30 L50,50 L40,70 L60,60 L70,70 L50,50"
                  fill="none"
                  stroke="#111"
                  strokeWidth="2"
                />
                <circle
                  cx="50"
                  cy="30"
                  r="8"
                  fill="none"
                  stroke="#111"
                  strokeWidth="2"
                />
                <circle
                  cx="30"
                  cy="50"
                  r="5"
                  fill="none"
                  stroke="#111"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>
              Built-in AI Writing Assistant
            </h3>
            <p className={styles.featureDesc}>
              Our AI helps you articulate your experience powerfully while
              maintaining your authentic voice and personal style.
            </p>
          </div>

          <div
            className={styles.featureCard}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.featureIcon}>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M25,40 L75,40 L75,70 L25,70 Z"
                  fill="none"
                  stroke="#111"
                  strokeWidth="2"
                />
                <path
                  d="M40,50 L60,50 M40,60 L60,60"
                  stroke="#111"
                  strokeWidth="2"
                />
                <circle
                  cx="50"
                  cy="25"
                  r="10"
                  fill="none"
                  stroke="#111"
                  strokeWidth="2"
                />
                <path d="M50,15 L50,35" stroke="#111" strokeWidth="2" />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>ATS Score & Feedback System</h3>
            <p className={styles.featureDesc}>
              Get instant analysis of how well your resume will perform with
              Applicant Tracking Systems and actionable tips for improvement.
            </p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>
          © 2025 CV Generator. Crafting authentic career stories since day one.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
