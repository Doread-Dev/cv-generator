import React from "react";
import styles from "../styles/TempletsPage.module.css";
import { useNavigate } from "react-router-dom";

const TempletsPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleTemplateClick = (templateName) => {
    if (templateName === "Minimalist") {
      navigate("/ResumeBuilder");
    } else {
      navigate("/coming-soon", { state: { from: "templates" } });
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={handleBack}>
          <svg
            className={styles.backIcon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="#111111"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
        <h1 className={styles.pageTitle}>
          Choose your preferred resume template
        </h1>
      </header>

      <main className={styles.mainContent}>
        <div className={`${styles.inkSplash} ${styles.splash1}`}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20,20 Q40,5 60,20 T100,40 Q85,60 60,80 T20,60 Q5,40 20,20 Z"
              fill="#111"
            />
          </svg>
        </div>

        <div className={`${styles.inkSplash} ${styles.splash2}`}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M30,10 Q60,0 80,30 T70,80 Q40,90 20,60 T30,10 Z"
              fill="#111"
            />
          </svg>
        </div>

        <div className={styles.templatesGrid}>
          <div className={styles.templateCard}>
            <div className={styles.templatePreview}>
              <div className={styles.resumeMockup}>
                <div className={styles.resumeHeader}>
                  <div className={styles.resumeName}>JOHN DOE</div>
                  <div className={styles.resumeTitle}>
                    Senior Product Designer
                  </div>
                </div>

                <div className={styles.resumeSection}>
                  <div className={styles.sectionTitle}>Experience</div>
                  <div className={`${styles.resumeLine} ${styles.long}`}></div>
                  <div className={styles.sectionContent}>
                    Lead Designer · TechCorp · 2018-Present
                  </div>
                  <div
                    className={`${styles.resumeLine} ${styles.medium}`}
                  ></div>
                  <div className={styles.sectionContent}>
                    Senior Designer · DesignStudio · 2015-2018
                  </div>
                </div>

                <div className={styles.resumeSection}>
                  <div className={styles.sectionTitle}>Education</div>
                  <div className={`${styles.resumeLine} ${styles.long}`}></div>
                  <div className={styles.sectionContent}>
                    MFA Design · Design University · 2013
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.templateName}>Minimalist</div>
            <a
              href="#"
              className={styles.chooseBtn}
              onClick={(e) => {
                e.preventDefault();
                handleTemplateClick("Minimalist");
              }}
            >
              Choose Template
            </a>
          </div>

          <div className={styles.templateCard}>
            <div className={styles.templatePreview}>
              <div className={styles.resumeMockup} style={{ display: "flex" }}>
                <div
                  style={{
                    width: "45%",
                    borderRight: "var(--border)",
                    paddingRight: "15px",
                  }}
                >
                  <div className={styles.resumeName}>JANE SMITH</div>
                  <div
                    className={styles.resumeTitle}
                    style={{ marginBottom: "20px" }}
                  >
                    Marketing Director
                  </div>
                </div>
                <div style={{ width: "55%", paddingLeft: "15px" }}>
                  <div className={styles.resumeSection}>
                    <div className={styles.sectionTitle}>Experience</div>
                    <div
                      className={`${styles.resumeLine} ${styles.long}`}
                    ></div>
                    <div className={styles.sectionContent}>
                      Marketing Director · BrandCo · 2020-Present
                    </div>
                  </div>
                  <div className={styles.resumeSection}>
                    <div className={styles.sectionTitle}>Contact</div>
                    <div className={styles.sectionContent}>
                      email@example.com
                      <br />
                      +1234567890
                      <br />
                      linkedin.com/in/jane
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.templateName}>Classic</div>
            <a
              href="#"
              className={styles.chooseBtn}
              onClick={(e) => {
                e.preventDefault();
                handleTemplateClick("Classic");
              }}
            >
              Choose Template
            </a>
          </div>

          <div className={styles.templateCard}>
            <div className={styles.templatePreview}>
              <div className={styles.resumeMockup}>
                <div
                  className={styles.resumeHeader}
                  style={{ textAlign: "center" }}
                >
                  <div className={styles.resumeName}>MICHAEL BROWN</div>
                  <div className={styles.resumeTitle}>Software Engineer</div>
                </div>

                <div className={styles.resumeSection}>
                  <div className={styles.sectionTitle}>Skills</div>
                  <div className={`${styles.resumeLine} ${styles.long}`}></div>
                  <div className={styles.sectionContent}>
                    JavaScript · React · Node.js · Python
                  </div>
                </div>

                <div className={styles.resumeSection}>
                  <div className={styles.sectionTitle}>Projects</div>
                  <div className={`${styles.resumeLine} ${styles.long}`}></div>
                  <div className={styles.sectionContent}>
                    E-commerce Platform · Fintech Dashboard · AI Assistant
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.templateName}>Modern</div>
            <a
              href="#"
              className={styles.chooseBtn}
              onClick={(e) => {
                e.preventDefault();
                handleTemplateClick("Modern");
              }}
            >
              Choose Template
            </a>
          </div>

          <div className={styles.templateCard}>
            <div className={styles.templatePreview}>
              <div className={styles.resumeMockup}>
                <div className={styles.resumeHeader}>
                  <div className={styles.resumeName}>SARAH JOHNSON</div>
                  <div className={styles.resumeTitle}>UX Researcher</div>
                </div>

                <div className={styles.resumeSection}>
                  <div className={styles.sectionTitle}>Experience</div>
                  <div className={`${styles.resumeLine} ${styles.long}`}></div>
                  <div className={styles.sectionContent}>
                    Senior UX Researcher · TechInnovate · 2019-Present
                  </div>
                  <div
                    className={`${styles.resumeLine} ${styles.medium}`}
                  ></div>
                  <div className={styles.sectionContent}>
                    UX Designer · CreativeSolutions · 2016-2019
                  </div>
                </div>

                <div className={styles.resumeSection}>
                  <div className={styles.sectionTitle}>Education</div>
                  <div className={`${styles.resumeLine} ${styles.long}`}></div>
                  <div className={styles.sectionContent}>
                    PhD Cognitive Psychology · University of Design
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.templateName}>Academic</div>
            <a
              href="#"
              className={styles.chooseBtn}
              onClick={(e) => {
                e.preventDefault();
                handleTemplateClick("Academic");
              }}
            >
              Choose Template
            </a>
          </div>

          <div className={styles.templateCard}>
            <div className={styles.templatePreview}>
              <div
                className={styles.resumeMockup}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div className={styles.resumeHeader}>
                    <div className={styles.resumeName}>DAVID WILSON</div>
                    <div className={styles.resumeTitle}>Financial Analyst</div>
                  </div>
                </div>

                <div>
                  <div className={styles.resumeSection}>
                    <div className={styles.sectionTitle}>Certifications</div>
                    <div
                      className={`${styles.resumeLine} ${styles.long}`}
                    ></div>
                    <div className={styles.sectionContent}>
                      CFA Level III · CPA · Financial Risk Manager
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.templateName}>Corporate</div>
            <a
              href="#"
              className={styles.chooseBtn}
              onClick={(e) => {
                e.preventDefault();
                handleTemplateClick("Corporate");
              }}
            >
              Choose Template
            </a>
          </div>

          <div className={styles.templateCard}>
            <div className={styles.templatePreview}>
              <div className={styles.resumeMockup}>
                <div
                  className={styles.resumeHeader}
                  style={{ textAlign: "right" }}
                >
                  <div className={styles.resumeName}>EMMA THOMPSON</div>
                  <div className={styles.resumeTitle}>Art Director</div>
                </div>

                <div className={styles.resumeSection}>
                  <div className={styles.sectionTitle}>Exhibitions</div>
                  <div className={`${styles.resumeLine} ${styles.long}`}></div>
                  <div className={styles.sectionContent}>
                    Solo Show · Gallery One · 2022
                  </div>
                  <div
                    className={`${styles.resumeLine} ${styles.medium}`}
                  ></div>
                  <div className={styles.sectionContent}>
                    Group Exhibition · Modern Art Museum
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.templateName}>Creative</div>
            <a
              href="#"
              className={styles.chooseBtn}
              onClick={(e) => {
                e.preventDefault();
                handleTemplateClick("Creative");
              }}
            >
              Choose Template
            </a>
          </div>
        </div>

        <div className={styles.illustration}>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="100"
              cy="80"
              r="20"
              fill="none"
              stroke="#111"
              strokeWidth="3"
            />
            <path
              d="M100,100 L100,150 M80,120 L120,120"
              stroke="#111"
              strokeWidth="3"
            />
            <path
              d="M100,150 Q80,180 70,170 T50,160"
              stroke="#111"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M100,150 Q120,180 130,170 T150,160"
              stroke="#111"
              strokeWidth="3"
              fill="none"
            />

            <path
              d="M140,100 Q160,90 170,100"
              stroke="#111"
              strokeWidth="3"
              fill="none"
            />
            <path d="M170,100 L180,90" stroke="#111" strokeWidth="3" />

            <rect
              x="180"
              y="80"
              width="40"
              height="50"
              rx="3"
              fill="none"
              stroke="#111"
              strokeWidth="2"
            />
            <rect
              x="175"
              y="85"
              width="40"
              height="50"
              rx="3"
              fill="none"
              stroke="#111"
              strokeWidth="2"
            />
            <rect
              x="170"
              y="90"
              width="40"
              height="50"
              rx="3"
              fill="none"
              stroke="#111"
              strokeWidth="2"
            />

            <line
              x1="175"
              y1="100"
              x2="205"
              y2="100"
              stroke="#111"
              strokeWidth="1"
            />
            <line
              x1="175"
              y1="110"
              x2="205"
              y2="110"
              stroke="#111"
              strokeWidth="1"
            />
            <line
              x1="175"
              y1="120"
              x2="195"
              y2="120"
              stroke="#111"
              strokeWidth="1"
            />

            <line
              x1="180"
              y1="105"
              x2="210"
              y2="105"
              stroke="#111"
              strokeWidth="1"
            />
            <line
              x1="180"
              y1="115"
              x2="210"
              y2="115"
              stroke="#111"
              strokeWidth="1"
            />

            <line
              x1="185"
              y1="110"
              x2="215"
              y2="110"
              stroke="#111"
              strokeWidth="1"
            />
            <line
              x1="185"
              y1="120"
              x2="200"
              y2="120"
              stroke="#111"
              strokeWidth="1"
            />
          </svg>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          © 2025 Cv Generator. Crafting authentic career stories since day one.
        </p>
      </footer>
    </div>
  );
};

export default TempletsPage;
