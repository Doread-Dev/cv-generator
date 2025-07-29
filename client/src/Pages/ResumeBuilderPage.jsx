import React, { useState, useEffect } from "react";
import styles from "../styles/ResumeBuilderPage.module.css";
import CVPreview from "./CVPreview";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ResumeBuilderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [deletedOpen, setDeletedOpen] = useState([]);
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "John Doe",
    professionalTitle: "Senior Frontend Developer",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
  });

  const [summary, setSummary] = useState(
    "Experienced frontend developer with 5+ years of expertise in building responsive web applications using React, Vue, and modern JavaScript. Proven track record of delivering high-quality code and leading development teams. Passionate about creating intuitive user experiences and optimizing application performance."
  );

  const [workExperience, setWorkExperience] = useState([
    {
      company: "Tech Innovations Inc.",
      position: "Senior Frontend Developer",
      startDate: "Jan 2020",
      endDate: "Present",
      responsibilities:
        "Developed responsive web applications using React and Vue. Led a team of 5 developers to create a customer dashboard that improved user engagement by 40%. Implemented CI/CD pipeline reducing deployment time by 70%. Mentored junior developers and established frontend coding standards.",
    },
    {
      company: "Digital Solutions LLC",
      position: "Frontend Developer",
      startDate: "Mar 2018",
      endDate: "Dec 2019",
      responsibilities:
        "Developed responsive e-commerce platform using Vue.js. Collaborated with UX team to implement design system components. Optimized frontend performance, achieving 95+ Lighthouse score.",
    },
  ]);

  const [education, setEducation] = useState([
    {
      institution: "Stanford University",
      degree: "Bachelor of Science in Computer Science",
      eduStart: "2014",
      eduEnd: "2018",
    },
  ]);

  const [training, setTraining] = useState([
    {
      courseName: "Advanced React Course",
      trainingInstitution: "Coursera",
      trainingDate: "2023",
    },
    {
      courseName: "Modern JavaScript Patterns",
      trainingInstitution: "Udemy",
      trainingDate: "2022",
    },
  ]);

  const [skills, setSkills] = useState({
    techSkills:
      "React, JavaScript, TypeScript, HTML/CSS, Vue.js, Redux, Responsive Design, Git, CI/CD",
    softSkills: "Team Leadership, Communication, Problem Solving",
    languages: [
      { name: "English", level: "Native" },
      { name: "Spanish", level: "Fluent" },
      { name: "French", level: "Intermediate" },
    ],
  });

  const [references, setReferences] = useState([
    {
      name: "Sarah Johnson",
      position: "Engineering Manager",
      company: "Tech Innovations Inc.",
      contact: "sarah@example.com | +1 (555) 123-4567",
    },
    {
      name: "Michael Chen",
      position: "Senior Developer",
      company: "Digital Solutions LLC",
      contact: "michael@example.com | +1 (555) 987-6543",
    },
  ]);

  const [targetPosition, setTargetPosition] = useState("Frontend Developer");

  const [deletedSections, setDeletedSections] = useState([]);
  const [visibleSections, setVisibleSections] = useState({
    personal: true,
    summary: true,
    work: true,
    education: true,
    training: true,
    skills: true,
    references: true,
  });

  const [openBlocks, setOpenBlocks] = useState({
    personal: false,
    summary: false,
    work: false,
    education: false,
    training: false,
    skills: false,
    references: false,
  });

  const [aiPrompts, setAiPrompts] = useState({
    summary: false,
    work: Array(workExperience.length).fill(false),
    skills: false,
  });

  const [loadingATS, setLoadingATS] = useState(false);
  const [atsError, setATSError] = useState(null);

  const [aiSummaryPrompt, setAiSummaryPrompt] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState(null);

  const [aiWorkPrompts, setAiWorkPrompts] = useState(
    Array(workExperience.length).fill("")
  );
  const [loadingWork, setLoadingWork] = useState(
    Array(workExperience.length).fill(false)
  );
  const [workErrors, setWorkErrors] = useState(
    Array(workExperience.length).fill(null)
  );

  useEffect(() => {
    if (location.state) {
      const {
        personalInfo: navPersonalInfo,
        summary: navSummary,
        workExperience: navWork,
        education: navEdu,
        training: navTraining,
        skills: navSkills,
        references: navRefs,
        visibleSections: navVisible,
        deletedSections: navDeleted,
      } = location.state;

      if (navPersonalInfo) setPersonalInfo(navPersonalInfo);
      if (navSummary) setSummary(navSummary);
      if (navWork) {
        setWorkExperience(navWork);
        setAiWorkPrompts(Array(navWork.length).fill(""));
        setLoadingWork(Array(navWork.length).fill(false));
        setWorkErrors(Array(navWork.length).fill(null));
      }
      if (navEdu) setEducation(navEdu);
      if (navTraining) setTraining(navTraining);
      if (navSkills) setSkills(navSkills);
      if (navRefs) setReferences(navRefs);
      if (navVisible) setVisibleSections(navVisible);
      if (navDeleted) setDeletedSections(navDeleted);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const LoadingSpinner = () => (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      <span>Analyzing your CV...</span>
    </div>
  );

  const toggleDeletedSection = (section) => {
    if (deletedOpen.includes(section)) {
      setDeletedOpen(deletedOpen.filter((sec) => sec !== section));
    } else {
      setDeletedOpen([...deletedOpen, section]);
    }
  };

  const toggleAIPrompt = (section, index = null) => {
    if (index !== null) {
      const newWorkPrompts = [...aiPrompts.work];
      newWorkPrompts[index] = !newWorkPrompts[index];
      setAiPrompts({ ...aiPrompts, work: newWorkPrompts });
    } else {
      setAiPrompts({ ...aiPrompts, [section]: !aiPrompts[section] });
    }
  };

  const toggleBlock = (block) => {
    setOpenBlocks({ ...openBlocks, [block]: !openBlocks[block] });
  };

  const deleteSection = (section) => {
    setVisibleSections({ ...visibleSections, [section]: false });
    setDeletedSections([...deletedSections, section]);
  };

  const restoreSection = (section) => {
    setVisibleSections({ ...visibleSections, [section]: true });
    setDeletedSections(deletedSections.filter((sec) => sec !== section));
  };

  const addPosition = () => {
    setWorkExperience([
      ...workExperience,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
      },
    ]);
    setAiPrompts({ ...aiPrompts, work: [...aiPrompts.work, false] });
    setAiWorkPrompts([...aiWorkPrompts, ""]);
    setLoadingWork([...loadingWork, false]);
    setWorkErrors([...workErrors, null]);
  };

  const removePosition = (index) => {
    const newWork = [...workExperience];
    newWork.splice(index, 1);
    setWorkExperience(newWork);

    const newPrompts = [...aiPrompts.work];
    newPrompts.splice(index, 1);
    setAiPrompts({ ...aiPrompts, work: newPrompts });

    const newAiWorkPrompts = [...aiWorkPrompts];
    newAiWorkPrompts.splice(index, 1);
    setAiWorkPrompts(newAiWorkPrompts);

    const newLoadingWork = [...loadingWork];
    newLoadingWork.splice(index, 1);
    setLoadingWork(newLoadingWork);

    const newWorkErrors = [...workErrors];
    newWorkErrors.splice(index, 1);
    setWorkErrors(newWorkErrors);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      {
        institution: "",
        degree: "",
        eduStart: "",
        eduEnd: "",
      },
    ]);
  };

  const removeEducation = (index) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
    setEducation(newEducation);
  };

  const addTraining = () => {
    setTraining([
      ...training,
      {
        courseName: "",
        trainingInstitution: "",
        trainingDate: "",
      },
    ]);
  };

  const removeTraining = (index) => {
    const newTraining = [...training];
    newTraining.splice(index, 1);
    setTraining(newTraining);
  };

  const addLanguage = () => {
    setSkills({
      ...skills,
      languages: [...skills.languages, { name: "", level: "Native" }],
    });
  };

  const removeLanguage = (index) => {
    const newLanguages = [...skills.languages];
    newLanguages.splice(index, 1);
    setSkills({ ...skills, languages: newLanguages });
  };

  const addReference = () => {
    setReferences([
      ...references,
      {
        name: "",
        position: "",
        company: "",
        contact: "",
      },
    ]);
  };

  const removeReference = (index) => {
    const newReferences = [...references];
    newReferences.splice(index, 1);
    setReferences(newReferences);
  };

  const printCV = () => {
    window.print();
  };

  const generateAISummary = async () => {
    if (!aiSummaryPrompt.trim()) {
      setSummaryError("Please provide some information about your experience.");
      return;
    }

    setLoadingSummary(true);
    setSummaryError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ai/improve-summary",
        {
          summaryText: aiSummaryPrompt,
          targetedPosition: targetPosition,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setSummary(response.data.improvedSummary);
      setAiSummaryPrompt("");
      setAiPrompts({ ...aiPrompts, summary: false });
    } catch (error) {
      setSummaryError(
        error.response?.data?.error ||
          error.message ||
          "Failed to generate summary. Please try again."
      );
    } finally {
      setLoadingSummary(false);
    }
  };

  const generateAIWorkExperience = async (index) => {
    if (!aiWorkPrompts[index]?.trim()) {
      const newWorkErrors = [...workErrors];
      newWorkErrors[index] =
        "Please provide some information about your responsibilities.";
      setWorkErrors(newWorkErrors);
      return;
    }

    const newLoadingWork = [...loadingWork];
    newLoadingWork[index] = true;
    setLoadingWork(newLoadingWork);

    const newWorkErrors = [...workErrors];
    newWorkErrors[index] = null;
    setWorkErrors(newWorkErrors);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ai/improve-responsibility",
        {
          responsibilityText: aiWorkPrompts[index],
          professionalTitle: workExperience[index].position || targetPosition,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const newWork = [...workExperience];
      newWork[index].responsibilities = response.data.improvedResponsibility;
      setWorkExperience(newWork);

      const newAiWorkPrompts = [...aiWorkPrompts];
      newAiWorkPrompts[index] = "";
      setAiWorkPrompts(newAiWorkPrompts);

      const newAiPrompts = { ...aiPrompts };
      newAiPrompts.work[index] = false;
      setAiPrompts(newAiPrompts);
    } catch (error) {
      const newWorkErrors = [...workErrors];
      newWorkErrors[index] =
        error.response?.data?.error ||
        error.message ||
        "Failed to generate description. Please try again.";
      setWorkErrors(newWorkErrors);
    } finally {
      const newLoadingWork = [...loadingWork];
      newLoadingWork[index] = false;
      setLoadingWork(newLoadingWork);
    }
  };

  const buildCVPayload = () => {
    const cvData = {};
    if (visibleSections.personal) {
      cvData.personalInfo = {
        fullName: personalInfo.fullName,
        professionalTitle: personalInfo.professionalTitle,
        email: personalInfo.email,
        phone: personalInfo.phone,
        location: personalInfo.location,
      };
    }
    if (visibleSections.summary) {
      cvData.professionalSummary = summary;
    }
    if (visibleSections.work) {
      cvData.workExperience = workExperience.map((w) => ({
        company: w.company,
        position: w.position,
        duration: `${w.startDate} - ${w.endDate}`
          .replace(/\s*-\s*$/, "")
          .trim(),
        responsibilityAndAchievement: w.responsibilities,
      }));
    }
    if (visibleSections.education) {
      cvData.education = education.map((e) => ({
        institution: e.institution,
        degree: e.degree,
        duration: `${e.eduStart} - ${e.eduEnd}`.replace(/\s*-\s*$/, "").trim(),
      }));
    }
    if (visibleSections.training) {
      cvData.trainingAndCourses = training.map((t) => ({
        name: t.courseName,
        provider: t.trainingInstitution,
        duration: t.trainingDate,
      }));
    }
    if (visibleSections.skills) {
      cvData.skills = {
        technicalSkills: skills.techSkills
          ? skills.techSkills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        softSkills: skills.softSkills
          ? skills.softSkills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        languages: skills.languages
          ? skills.languages.map((l) => `${l.name} - ${l.level}`)
          : [],
      };
    }
    if (visibleSections.references) {
      cvData.references = references.map((r) => ({
        name: r.name,
        position: r.position,
        company: r.company,
        contact: r.contact,
      }));
    }
    return {
      targetedPosition: personalInfo.professionalTitle || targetPosition,
      cvData,
    };
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setNavbarScrolled(true);
      } else {
        setNavbarScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setAiWorkPrompts(Array(workExperience.length).fill(""));
    setLoadingWork(Array(workExperience.length).fill(false));
    setWorkErrors(Array(workExperience.length).fill(null));
  }, [workExperience.length]);

  return (
    <div className={styles.resumeBuilderPage}>
      {/* Navbar */}
      <nav
        className={`${styles.navbar} ${navbarScrolled ? styles.scrolled : ""}`}
      >
        <button className={styles["nav-btn3"]} onClick={() => navigate(-1)}>
          <svg
            className={styles.backIcon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
        <a href="#" className={styles.logo}>
          CV Generator
        </a>
        <div className={styles["nav-buttons"]}>
          <button
            className={styles["nav-btn"]}
            onClick={() => {
              localStorage.clear();
              navigate("/landing");
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <div className={styles["builder-container"]}>
        {/* Form Section */}
        <div className={styles["form-section"]}>
          {/* Decorative characters */}
          <div className={styles.character}>
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

          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Build Your CV</h2>
          </div>

          {/* Target Position Section */}
          <div className={styles.targetPositionSection}>
            <div className={styles.positionSelectContainer}>
              <label>
                <i className="fas fa-briefcase"></i> Target Position
              </label>
              <div className={styles.formGroup}>
                <select
                  id="position-type"
                  value={targetPosition}
                  onChange={(e) => setTargetPosition(e.target.value)}
                >
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>Full Stack Developer</option>
                  <option>UI/UX Designer</option>
                  <option>DevOps Engineer</option>
                  <option>Data Scientist</option>
                  <option>Product Manager</option>
                </select>
              </div>
            </div>
          </div>

          {/* Personal Info Block */}
          {visibleSections.personal && (
            <div
              className={`${styles.formBlock} ${
                openBlocks.personal ? styles.openBlock : ""
              }`}
              id="personal-block"
            >
              <div
                className={styles.blockHeader}
                onClick={() => toggleBlock("personal")}
              >
                <div className={styles.blockTitle}>
                  <i className="fas fa-user"></i> Personal Information
                </div>
                <div className={styles.blockActions}>
                  <i
                    className={`fas ${
                      openBlocks.personal ? "fa-chevron-up" : "fa-chevron-down"
                    } ${styles.collapsibleIcon}`}
                  ></i>
                </div>
              </div>
              <div className={styles.blockContent}>
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={personalInfo.fullName}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        fullName: e.target.value,
                      })
                    }
                    placeholder="John Doe"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Professional Title</label>
                  <input
                    type="text"
                    value={personalInfo.professionalTitle}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        professionalTitle: e.target.value,
                      })
                    }
                    placeholder="Frontend Developer"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        email: e.target.value,
                      })
                    }
                    placeholder="john@example.com"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        phone: e.target.value,
                      })
                    }
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Location</label>
                  <input
                    type="text"
                    value={personalInfo.location}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        location: e.target.value,
                      })
                    }
                    placeholder="San Francisco, CA"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Summary Block */}
          {visibleSections.summary && (
            <div
              className={`${styles.formBlock} ${
                openBlocks.summary ? styles.openBlock : ""
              }`}
              id="summary-block"
            >
              <div
                className={styles.blockHeader}
                onClick={() => toggleBlock("summary")}
              >
                <div className={styles.blockTitle}>
                  <i className="fas fa-file-alt"></i> Professional Summary
                </div>
                <div className={styles.blockActions}>
                  <button
                    className={styles.deleteBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSection("summary");
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                  <i
                    className={`fas ${
                      openBlocks.summary ? "fa-chevron-up" : "fa-chevron-down"
                    } ${styles.collapsibleIcon}`}
                  ></i>
                </div>
              </div>
              <div className={styles.blockContent}>
                <div className={styles.formGroup}>
                  <label>Summary</label>
                  <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Experienced developer with 5+ years in..."
                  ></textarea>
                </div>
                <div
                  className={styles.aiToggle}
                  onClick={() => toggleAIPrompt("summary")}
                >
                  <span>
                    <i className="fas fa-magic"></i> Make it with AI
                  </span>
                  <i
                    className={`fas fa-chevron-right ${
                      aiPrompts.summary ? styles.rotated : ""
                    }`}
                  ></i>
                </div>
                {aiPrompts.summary && (
                  <div className={styles.aiPrompt}>
                    <p>Tell AI about your experience:</p>
                    <textarea
                      value={aiSummaryPrompt}
                      onChange={(e) => setAiSummaryPrompt(e.target.value)}
                      placeholder="I'm a frontend developer with 5 years experience in React and Vue..."
                      disabled={loadingSummary}
                    ></textarea>
                    {summaryError && (
                      <div className={styles.errorMessage}>
                        <i className="fas fa-exclamation-triangle"></i>
                        {summaryError}
                      </div>
                    )}
                    <button
                      onClick={generateAISummary}
                      disabled={loadingSummary}
                      className={loadingSummary ? styles.loading : ""}
                    >
                      {loadingSummary ? (
                        <>
                          <div className={styles.spinner}></div>
                          Generating...
                        </>
                      ) : (
                        "Generate Summary"
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Work Experience Block */}
          {visibleSections.work && (
            <div
              className={`${styles.formBlock} ${
                openBlocks.work ? styles.openBlock : ""
              }`}
              id="work-block"
            >
              <div
                className={styles.blockHeader}
                onClick={() => toggleBlock("work")}
              >
                <div className={styles.blockTitle}>
                  <i className="fas fa-building"></i> Work Experience
                </div>
                <div className={styles.blockActions}>
                  <button
                    className={styles.deleteBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSection("work");
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                  <i
                    className={`fas ${
                      openBlocks.work ? "fa-chevron-up" : "fa-chevron-down"
                    } ${styles.collapsibleIcon}`}
                  ></i>
                </div>
              </div>
              <div className={styles.blockContent}>
                <div id="work-experience-container">
                  {workExperience.map((work, index) => (
                    <div
                      className={styles.positionContainer}
                      key={index}
                      data-index={index}
                    >
                      <button
                        className={styles.removeBtn}
                        onClick={() => removePosition(index)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                      <div className={styles.formGroup}>
                        <label>Company</label>
                        <input
                          type="text"
                          value={work.company}
                          onChange={(e) => {
                            const newWork = [...workExperience];
                            newWork[index].company = e.target.value;
                            setWorkExperience(newWork);
                          }}
                          placeholder="Tech Innovations Inc."
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Position</label>
                        <input
                          type="text"
                          value={work.position}
                          onChange={(e) => {
                            const newWork = [...workExperience];
                            newWork[index].position = e.target.value;
                            setWorkExperience(newWork);
                          }}
                          placeholder="Frontend Developer"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Duration</label>
                        <div className={styles.dateInputGroup}>
                          <input
                            type="text"
                            value={work.startDate}
                            onChange={(e) => {
                              const newWork = [...workExperience];
                              newWork[index].startDate = e.target.value;
                              setWorkExperience(newWork);
                            }}
                            placeholder="Start (MM/YYYY)"
                          />
                          <input
                            type="text"
                            value={work.endDate}
                            onChange={(e) => {
                              const newWork = [...workExperience];
                              newWork[index].endDate = e.target.value;
                              setWorkExperience(newWork);
                            }}
                            placeholder="End (MM/YYYY)"
                          />
                        </div>
                      </div>
                      <div className={styles.formGroup}>
                        <label>Responsibilities & Achievements</label>
                        <textarea
                          value={work.responsibilities}
                          onChange={(e) => {
                            const newWork = [...workExperience];
                            newWork[index].responsibilities = e.target.value;
                            setWorkExperience(newWork);
                          }}
                          placeholder="Developed responsive web applications using React..."
                        ></textarea>
                      </div>
                      <div
                        className={styles.aiToggle}
                        onClick={() => toggleAIPrompt("work", index)}
                      >
                        <span>
                          <i className="fas fa-magic"></i> Make it with AI
                        </span>
                        <i
                          className={`fas fa-chevron-right ${
                            aiPrompts.work[index] ? styles.rotated : ""
                          }`}
                        ></i>
                      </div>
                      {aiPrompts.work[index] && (
                        <div className={styles.aiPrompt}>
                          <p>Tell AI about this position:</p>
                          <textarea
                            value={aiWorkPrompts[index] || ""}
                            onChange={(e) => {
                              const newAiWorkPrompts = [...aiWorkPrompts];
                              newAiWorkPrompts[index] = e.target.value;
                              setAiWorkPrompts(newAiWorkPrompts);
                            }}
                            placeholder="I worked as a frontend developer at Tech Innovations for 3 years. I used React daily and led a team of 3 developers..."
                            disabled={loadingWork[index]}
                          ></textarea>
                          {workErrors[index] && (
                            <div className={styles.errorMessage}>
                              <i className="fas fa-exclamation-triangle"></i>
                              {workErrors[index]}
                            </div>
                          )}
                          <button
                            onClick={() => generateAIWorkExperience(index)}
                            disabled={loadingWork[index]}
                            className={loadingWork[index] ? styles.loading : ""}
                          >
                            {loadingWork[index] ? (
                              <>
                                <div className={styles.spinner}></div>
                                Generating...
                              </>
                            ) : (
                              "Generate Description"
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  className={`${styles["nav-btn"]} ${styles.fullWidth}`}
                  onClick={addPosition}
                >
                  <i className="fas fa-plus"></i> Add Another Position
                </button>
              </div>
            </div>
          )}

          {/* Education Block */}
          {visibleSections.education && (
            <div
              className={`${styles.formBlock} ${
                openBlocks.education ? styles.openBlock : ""
              }`}
              id="education-block"
            >
              <div
                className={styles.blockHeader}
                onClick={() => toggleBlock("education")}
              >
                <div className={styles.blockTitle}>
                  <i className="fas fa-graduation-cap"></i> Education
                </div>
                <div className={styles.blockActions}>
                  <button
                    className={styles.deleteBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSection("education");
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                  <i
                    className={`fas ${
                      openBlocks.education ? "fa-chevron-up" : "fa-chevron-down"
                    } ${styles.collapsibleIcon}`}
                  ></i>
                </div>
              </div>
              <div className={styles.blockContent}>
                <div id="educations-container">
                  {education.map((edu, index) => (
                    <div
                      className={styles.educationContainer}
                      key={index}
                      data-index={index}
                    >
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeEducation(index)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                      <div className={styles.formGroup}>
                        <label>Institution</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => {
                            const newEdu = [...education];
                            newEdu[index].institution = e.target.value;
                            setEducation(newEdu);
                          }}
                          placeholder="Stanford University"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Degree</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => {
                            const newEdu = [...education];
                            newEdu[index].degree = e.target.value;
                            setEducation(newEdu);
                          }}
                          placeholder="Bachelor of Science in Computer Science"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Duration</label>
                        <div className={styles.dateInputGroup}>
                          <input
                            type="text"
                            value={edu.eduStart}
                            onChange={(e) => {
                              const newEdu = [...education];
                              newEdu[index].eduStart = e.target.value;
                              setEducation(newEdu);
                            }}
                            placeholder="Start (MM/YYYY)"
                          />
                          <input
                            type="text"
                            value={edu.eduEnd}
                            onChange={(e) => {
                              const newEdu = [...education];
                              newEdu[index].eduEnd = e.target.value;
                              setEducation(newEdu);
                            }}
                            placeholder="End (MM/YYYY)"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className={`${styles["nav-btn"]} ${styles.fullWidth}`}
                  onClick={addEducation}
                >
                  <i className="fas fa-plus"></i> Add Another Education
                </button>
              </div>
            </div>
          )}

          {/* Training & Courses Block */}
          {visibleSections.training && (
            <div
              className={`${styles.formBlock} ${
                openBlocks.training ? styles.openBlock : ""
              }`}
              id="training-block"
            >
              <div
                className={styles.blockHeader}
                onClick={() => toggleBlock("training")}
              >
                <div className={styles.blockTitle}>
                  <i className="fas fa-certificate"></i> Training & Courses
                </div>
                <div className={styles.blockActions}>
                  <button
                    className={styles.deleteBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSection("training");
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                  <i
                    className={`fas ${
                      openBlocks.training ? "fa-chevron-up" : "fa-chevron-down"
                    } ${styles.collapsibleIcon}`}
                  ></i>
                </div>
              </div>
              <div className={styles.blockContent}>
                <div id="trainings-container">
                  {training.map((train, index) => (
                    <div
                      className={styles.trainingContainer}
                      key={index}
                      data-index={index}
                    >
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeTraining(index)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                      <div className={styles.formGroup}>
                        <label>Course/Training Name</label>
                        <input
                          type="text"
                          value={train.courseName}
                          onChange={(e) => {
                            const newTraining = [...training];
                            newTraining[index].courseName = e.target.value;
                            setTraining(newTraining);
                          }}
                          placeholder="Advanced React Course"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Institution/Provider</label>
                        <input
                          type="text"
                          value={train.trainingInstitution}
                          onChange={(e) => {
                            const newTraining = [...training];
                            newTraining[index].trainingInstitution =
                              e.target.value;
                            setTraining(newTraining);
                          }}
                          placeholder="Coursera"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Date/Duration</label>
                        <input
                          type="text"
                          value={train.trainingDate}
                          onChange={(e) => {
                            const newTraining = [...training];
                            newTraining[index].trainingDate = e.target.value;
                            setTraining(newTraining);
                          }}
                          placeholder="2023"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className={`${styles["nav-btn"]} ${styles.fullWidth}`}
                  onClick={addTraining}
                >
                  <i className="fas fa-plus"></i> Add Another Training/Course
                </button>
              </div>
            </div>
          )}

          {/* Skills Block */}
          {visibleSections.skills && (
            <div
              className={`${styles.formBlock} ${
                openBlocks.skills ? styles.openBlock : ""
              }`}
              id="skills-block"
            >
              <div
                className={styles.blockHeader}
                onClick={() => toggleBlock("skills")}
              >
                <div className={styles.blockTitle}>
                  <i className="fas fa-code"></i> Skills
                </div>
                <div className={styles.blockActions}>
                  <button
                    className={styles.deleteBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSection("skills");
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                  <i
                    className={`fas ${
                      openBlocks.skills ? "fa-chevron-up" : "fa-chevron-down"
                    } ${styles.collapsibleIcon}`}
                  ></i>
                </div>
              </div>
              <div className={styles.blockContent}>
                <div className={styles.formGroup}>
                  <label>Technical Skills (comma separated)</label>
                  <input
                    type="text"
                    value={skills.techSkills}
                    onChange={(e) =>
                      setSkills({ ...skills, techSkills: e.target.value })
                    }
                    placeholder="React, JavaScript, CSS, HTML"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Soft Skills (comma separated)</label>
                  <input
                    type="text"
                    value={skills.softSkills}
                    onChange={(e) =>
                      setSkills({ ...skills, softSkills: e.target.value })
                    }
                    placeholder="Team Leadership, Communication"
                  />
                </div>

                {/* Languages section */}
                <div className={styles.formGroup}>
                  <label>Languages</label>
                  <div id="languages-container">
                    {skills.languages.map((lang, index) => (
                      <div
                        className={styles.languageContainer}
                        key={index}
                        data-index={index}
                      >
                        <input
                          type="text"
                          className={styles.languageName}
                          value={lang.name}
                          onChange={(e) => {
                            const newLanguages = [...skills.languages];
                            newLanguages[index].name = e.target.value;
                            setSkills({ ...skills, languages: newLanguages });
                          }}
                          placeholder="English"
                        />
                        <select
                          className={styles.languageLevel}
                          value={lang.level}
                          onChange={(e) => {
                            const newLanguages = [...skills.languages];
                            newLanguages[index].level = e.target.value;
                            setSkills({ ...skills, languages: newLanguages });
                          }}
                        >
                          <option value="Native">Native</option>
                          <option value="Fluent">Fluent</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Basic">Basic</option>
                        </select>
                        <button
                          className={`${styles.removeBtn} ${styles.languageRemove}`}
                          onClick={() => removeLanguage(index)}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    className={`${styles["nav-btn"]} ${styles.fullWidth}`}
                    onClick={addLanguage}
                  >
                    <i className="fas fa-plus"></i> Add Language
                  </button>
                </div>

                <div
                  className={styles.aiToggle}
                  onClick={() => toggleAIPrompt("skills")}
                >
                  <span>
                    <i className="fas fa-magic"></i> Make it with AI
                  </span>
                  <i
                    className={`fas fa-chevron-right ${
                      aiPrompts.skills ? styles.rotated : ""
                    }`}
                  ></i>
                </div>
                {aiPrompts.skills && (
                  <div className={styles.aiPrompt}>
                    <p>Tell AI about your role and experience:</p>
                    <textarea placeholder="I'm a frontend developer with 5 years experience. I've worked with React, TypeScript, and CSS frameworks..."></textarea>
                    <button>Suggest Skills</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* References Block */}
          {visibleSections.references && (
            <div
              className={`${styles.formBlock} ${
                openBlocks.references ? styles.openBlock : ""
              }`}
              id="references-block"
            >
              <div
                className={styles.blockHeader}
                onClick={() => toggleBlock("references")}
              >
                <div className={styles.blockTitle}>
                  <i className="fas fa-users"></i> References
                </div>
                <div className={styles.blockActions}>
                  <button
                    className={styles.deleteBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSection("references");
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                  <i
                    className={`fas ${
                      openBlocks.references
                        ? "fa-chevron-up"
                        : "fa-chevron-down"
                    } ${styles.collapsibleIcon}`}
                  ></i>
                </div>
              </div>
              <div className={styles.blockContent}>
                <div id="references-container">
                  {references.map((ref, index) => (
                    <div
                      className={styles.referenceContainer}
                      key={index}
                      data-index={index}
                    >
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeReference(index)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                      <div className={styles.formGroup}>
                        <label>Name</label>
                        <input
                          type="text"
                          value={ref.name}
                          onChange={(e) => {
                            const newRefs = [...references];
                            newRefs[index].name = e.target.value;
                            setReferences(newRefs);
                          }}
                          placeholder="Sarah Johnson"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Position</label>
                        <input
                          type="text"
                          value={ref.position}
                          onChange={(e) => {
                            const newRefs = [...references];
                            newRefs[index].position = e.target.value;
                            setReferences(newRefs);
                          }}
                          placeholder="Engineering Manager"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Company</label>
                        <input
                          type="text"
                          value={ref.company}
                          onChange={(e) => {
                            const newRefs = [...references];
                            newRefs[index].company = e.target.value;
                            setReferences(newRefs);
                          }}
                          placeholder="Tech Innovations Inc."
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Contact</label>
                        <input
                          type="text"
                          value={ref.contact}
                          onChange={(e) => {
                            const newRefs = [...references];
                            newRefs[index].contact = e.target.value;
                            setReferences(newRefs);
                          }}
                          placeholder="sarah@example.com | +1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className={`${styles["nav-btn"]} ${styles.fullWidth}`}
                  onClick={addReference}
                >
                  <i className="fas fa-plus"></i> Add Another Reference
                </button>
              </div>
            </div>
          )}

          {/* Deleted sections area */}
          {deletedSections.length > 0 && (
            <div
              className={styles.deletedSectionsBlock}
              id="deleted-sections-block"
            >
              <h3 className={styles.deletedSectionsTitle}>
                <i className="fas fa-trash-restore"></i> Deleted Sections
              </h3>
              <div id="deleted-sections-container">
                {deletedSections.map((section) => (
                  <div
                    key={section}
                    className={`${styles.formBlock} ${styles.deletedSection}`}
                  >
                    <div
                      className={styles.blockHeader}
                      onClick={() => toggleDeletedSection(section)}
                    >
                      <div className={styles.blockTitle}>
                        {section === "personal" && (
                          <>
                            <i className="fas fa-user"></i> Personal Information
                          </>
                        )}
                        {section === "summary" && (
                          <>
                            <i className="fas fa-file-alt"></i> Professional
                            Summary
                          </>
                        )}
                        {section === "work" && (
                          <>
                            <i className="fas fa-building"></i> Work Experience
                          </>
                        )}
                        {section === "education" && (
                          <>
                            <i className="fas fa-graduation-cap"></i> Education
                          </>
                        )}
                        {section === "training" && (
                          <>
                            <i className="fas fa-certificate"></i> Training &
                            Courses
                          </>
                        )}
                        {section === "skills" && (
                          <>
                            <i className="fas fa-code"></i> Skills
                          </>
                        )}
                        {section === "references" && (
                          <>
                            <i className="fas fa-users"></i> References
                          </>
                        )}
                      </div>
                      <div className={styles.blockActions}>
                        <i
                          className={`fas ${
                            deletedOpen.includes(section)
                              ? "fa-chevron-up"
                              : "fa-chevron-down"
                          } ${styles.collapsibleIcon}`}
                        ></i>
                      </div>
                    </div>
                    {deletedOpen.includes(section) && (
                      <div className={styles.blockContent}>
                        <button
                          className={styles.restoreBtn}
                          onClick={() => restoreSection(section)}
                        >
                          <i className="fas fa-undo"></i> Restore Section
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className={styles.actionbtns}>
            <button className={styles["nav-btn2"]} onClick={printCV}>
              <i className="fas fa-print"></i> Print
            </button>
            <p>or</p>
            <button
              className={`${styles.checkBtn} ${
                loadingATS ? styles.loading : ""
              }`}
              onClick={async () => {
                setLoadingATS(true);
                setATSError(null);
                try {
                  const payload = buildCVPayload();
                  const response = await axios.post(
                    "http://localhost:5000/api/ai/evaluate-cv",
                    payload,
                    { headers: { "Content-Type": "application/json" } }
                  );
                  navigate("/ATSEvaluation", {
                    state: {
                      personalInfo,
                      summary,
                      workExperience,
                      education,
                      training,
                      skills,
                      references,
                      visibleSections,
                      deletedSections,
                      atsResult: response.data,
                    },
                  });
                } catch (err) {
                  setATSError(
                    err.response?.data?.error ||
                      err.message ||
                      "Failed to evaluate CV."
                  );
                } finally {
                  setLoadingATS(false);
                }
              }}
              disabled={loadingATS}
            >
              {loadingATS ? (
                <LoadingSpinner />
              ) : (
                <>
                  <i className="fas fa-search"></i> Check ATS Score
                </>
              )}
            </button>
            {atsError && (
              <div className={styles.errorMessage}>
                <i className="fas fa-exclamation-triangle"></i>
                {atsError}
              </div>
            )}
          </div>
        </div>

        {/* Preview Section */}
        <CVPreview
          personalInfo={personalInfo}
          summary={summary}
          workExperience={workExperience}
          education={education}
          training={training}
          skills={skills}
          references={references}
          visibleSections={visibleSections}
        />
      </div>
    </div>
  );
};

export default ResumeBuilderPage;
