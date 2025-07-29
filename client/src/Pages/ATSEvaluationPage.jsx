import React, { useEffect, useState } from "react";
import styles from "../styles/ATSEvaluationPage.module.css";
import CVPreview from "./CVPreview";
import { useLocation, useNavigate } from "react-router-dom";
import { submitCV } from "./saveCV";

const ATSEvaluationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  const atsResult = state.atsResult;
  const [showDetails, setShowDetails] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const printCV = () => {
    window.print();
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(`.${styles.navbar}`);
      if (window.scrollY > 50) {
        navbar.classList.add(styles.scrolled);
      } else {
        navbar.classList.remove(styles.scrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);
    setTimeout(() => {
      document.querySelectorAll(`.${styles.sectionScore}`).forEach((el) => {
        el.style.animationPlayState = "running";
      });
    }, 300);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const personalInfo = state.personalInfo;
  const summary = state.summary;
  const workExperience = state.workExperience;
  const education = state.education;
  const training = state.training;
  const skills = state.skills;
  const references = state.references;
  const visibleSections = state.visibleSections;

  const handleBackToEdit = () => {
    navigate("/ResumeBuilder", {
      state: {
        personalInfo: state.personalInfo,
        summary: state.summary,
        workExperience: state.workExperience,
        education: state.education,
        training: state.training,
        skills: state.skills,
        references: state.references,
        visibleSections: state.visibleSections,
        deletedSections: state.deletedSections, 
      },
    });
  };

  const handleSaveCV = async () => {
    setSaving(true);
    setSaveMessage("");


    const cvData = {
      personalInfo: personalInfo,
      professionalSummary: summary,
      workExperience: workExperience,
      education: education,
      trainingAndCourses: training,
      skills: skills,
      references: references,
      targetedPosition: state.targetedPosition,
      ATSscore: atsResult?.ats_score?.score || 0,
    };

    try {
      const res = await submitCV(cvData);
      
      setSaveMessage("CV saved successfully!");
      console.log("Saved CV:", res);
      setTimeout(() => setSaveMessage(""), 3000);
      navigate("/home")
    } catch (error) {
      console.error("Error saving CV:", error);
      setSaveMessage("Failed to save CV. Please try again.");
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className={styles.pageContainer}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <a href="#" className={styles.logo}>
          CvGenerator
        </a>
        <div className={styles.navLinks}>
          <button className={styles.navBtn}>Logout</button>
        </div>
      </nav>

      <div className={styles.container}>
        <div className={styles.resumePreview}>
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

        <div className={styles.evaluationResults}>
          {atsResult ? (
            <>
              <div className={styles.scoreHeader}>
                <h2 className={styles.overallScore}>
                  Your CV ATS Score: {atsResult.ats_score.score}%
                </h2>
                <div className={styles.scoreGauge}>
                  <svg width="200" height="200" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#e0e0e0"
                      strokeWidth="6"
                    />
                    <circle
                      className={styles.progressCircle}
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#111111"
                      strokeWidth="6"
                      strokeDasharray="340"
                      strokeDashoffset={
                        340 - (atsResult.ats_score.score / 100) * 340
                      }
                      strokeLinecap="round"
                      style={{
                        animation: "progressAnimation 1.5s ease-out forwards",
                      }}
                    />
                  </svg>
                  <div className={styles.gaugeText}>
                    {atsResult.ats_score.score}%
                    <span>{atsResult.ats_score.label}</span>
                  </div>
                </div>
                <p>{atsResult.ats_score.comment}</p>
                {atsResult.ats_score.recommendation &&
                  atsResult.ats_score.recommendation.length > 0 && (
                    <ul style={{ marginTop: 10 }}>
                      {atsResult.ats_score.recommendation.map((rec, i) => (
                        <li key={i} style={{ marginBottom: 4 }}>
                          • {rec}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>

              <button
                className={styles.actionBtn}
                style={{ margin: "20px 0" }}
                onClick={() => setShowDetails((v) => !v)}
              >
                {showDetails ? "Hide Section Details" : "Show Section Details"}
              </button>

              {showDetails && (
                <>
                  {atsResult.sections &&
                    Object.entries(atsResult.sections).map(([key, section]) => (
                      <div className={styles.sectionScore} key={key}>
                        <div className={styles.scoreTitle}>
                          <span>{section.title}</span>
                          <span>{section.score}%</span>
                        </div>
                        <div className={styles.scoreBar}>
                          <div
                            className={styles.scoreProgress}
                            style={{ width: `${section.score}%` }}
                          ></div>
                        </div>
                        <div className={styles.feedback}>
                          <strong>{section.status}:</strong> {section.comment}
                          {section.recommendation &&
                            section.recommendation.length > 0 && (
                              <ul style={{ marginTop: 6 }}>
                                {section.recommendation.map((rec, i) => (
                                  <li key={i} style={{ marginBottom: 2 }}>
                                    • {rec}
                                  </li>
                                ))}
                              </ul>
                            )}
                        </div>
                      </div>
                    ))}
                </>
              )}

              <div className={styles.actionButtons}>
                <button
                  className={`${styles.actionBtn} ${styles.secondaryBtn}`}
                  onClick={handleBackToEdit}
                >
                  <i className="fas fa-edit"></i> Back to Edit
                </button>
                <button
                  className={`${styles.actionBtn} ${styles.primaryBtn}`}
                  onClick={handleSaveCV}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <div className={styles.spinner}></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save"></i> Save CV
                    </>
                  )}
                </button>
              </div>

              {saveMessage && (
                <div
                  className={`${styles.saveMessage} ${
                    saveMessage.includes("successfully")
                      ? styles.success
                      : styles.error
                  }`}
                >
                  <i
                    className={`fas ${
                      saveMessage.includes("successfully")
                        ? "fa-check-circle"
                        : "fa-exclamation-circle"
                    }`}
                  ></i>
                  {saveMessage}
                </div>
              )}
            </>
          ) : (
            <div style={{ color: "gray", fontSize: 18, marginTop: 40 }}>
              No ATS evaluation results found. Please submit your CV for
              analysis.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ATSEvaluationPage;
