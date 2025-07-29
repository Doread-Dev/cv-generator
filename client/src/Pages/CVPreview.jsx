import React from "react";
import styles from "../styles/ResumeBuilderPage.module.css";

const CVPreview = ({
  personalInfo,
  summary,
  workExperience,
  education,
  training,
  skills,
  references,
  visibleSections,
}) => {
  return (
    <div className={styles["preview-section"]}>
      <div className={`${styles.character} ${styles.character2}`}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M25,30 L75,30 L75,70 L25,70 Z"
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
      <div className={`${styles.character} ${styles.character3}`}>
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
      <div className={`${styles.character} ${styles.character5}`}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M30,40 L40,30 L60,30 L70,40 L70,60 L60,70 L40,70 L30,60 Z"
            fill="none"
            stroke="#111"
            strokeWidth="2"
            className={styles.inkDrawing}
          />
          <path
            d="M45,45 L55,55 M55,45 L45,55"
            stroke="#111"
            strokeWidth="2"
            className={styles.inkDrawing}
          />
        </svg>
      </div>
      <div className={styles.previewHeader}>
        <h2 className={styles.sectionTitle}>CV Preview</h2>
      </div>
      <div className={styles.cvPreview} id="cv-preview">
        <div className={styles.cvHeader} id="preview-personal">
          <h1 className={styles.cvName} id="preview-name">
            {personalInfo.fullName}
          </h1>
          <p className={styles.cvTitle} id="preview-title">
            {personalInfo.professionalTitle}
          </p>
          <div className={styles.cvContact}>
            <span id="preview-email">
              <i className="fas fa-envelope"></i> {personalInfo.email}
            </span>
            <span id="preview-phone">
              <i className="fas fa-phone"></i> {personalInfo.phone}
            </span>
            <span id="preview-location">
              <i className="fas fa-map-marker-alt"></i> {personalInfo.location}
            </span>
          </div>
        </div>
        {visibleSections.summary && (
          <div className={styles.cvSection} id="preview-summary">
            <h3 className={styles.cvSectionTitle}>Professional Summary</h3>
            <p id="preview-summary-text">{summary}</p>
          </div>
        )}
        {visibleSections.work && workExperience.length > 0 && (
          <div className={styles.cvSection} id="preview-work">
            <h3 className={styles.cvSectionTitle}>Work Experience</h3>
            {workExperience.map((work, index) => (
              <div
                className={styles.cvItem}
                key={index}
                id={`work-exp-${index}`}
              >
                <div className={styles.cvItemHeader}>
                  <div>
                    <h4 className={styles.cvItemTitle}>{work.position}</h4>
                    <p className={styles.cvItemSubtitle}>{work.company}</p>
                  </div>
                  <p className={styles.cvItemDate}>
                    {work.startDate} - {work.endDate}
                  </p>
                </div>
                <p>{work.responsibilities}</p>
              </div>
            ))}
          </div>
        )}
        {visibleSections.education && education.length > 0 && (
          <div className={styles.cvSection} id="preview-education">
            <h3 className={styles.cvSectionTitle}>Education</h3>
            {education.map((edu, index) => (
              <div
                className={styles.cvItem}
                key={index}
                id={`education-${index}`}
              >
                <div className={styles.cvItemHeader}>
                  <div>
                    <h4 className={styles.cvItemTitle}>{edu.institution}</h4>
                    <p className={styles.cvItemSubtitle}>{edu.degree}</p>
                  </div>
                  <p className={styles.cvItemDate}>
                    {edu.eduStart} - {edu.eduEnd}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        {visibleSections.training && training.length > 0 && (
          <div className={styles.cvSection} id="preview-training">
            <h3 className={styles.cvSectionTitle}>Training & Courses</h3>
            <div id="preview-trainings">
              {training.map((train, index) => (
                <div
                  className={styles.cvItem}
                  key={index}
                  id={`training-${index}`}
                >
                  <div className={styles.cvItemHeader}>
                    <div>
                      <h4 className={styles.cvItemTitle}>{train.courseName}</h4>
                      <p className={styles.cvItemSubtitle}>
                        {train.trainingInstitution}
                      </p>
                    </div>
                    <p className={styles.cvItemDate}>{train.trainingDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {visibleSections.skills && (
          <div className={styles.cvSection} id="preview-skills">
            <h3 className={styles.cvSectionTitle}>Skills</h3>
            <div className={styles.cvSkills} id="preview-skills-list">
              {skills.techSkills.split(",").map(
                (skill, index) =>
                  skill.trim() && (
                    <div key={index} className={styles.skillTag}>
                      {skill.trim()}
                    </div>
                  )
              )}
              {skills.softSkills.split(",").map(
                (skill, index) =>
                  skill.trim() && (
                    <div key={index} className={styles.skillTag}>
                      {skill.trim()}
                    </div>
                  )
              )}
            </div>
            {skills.languages.length > 0 && (
              <div style={{ marginTop: "25px" }}>
                <h4
                  style={{
                    fontWeight: 500,
                    marginBottom: "15px",
                    fontSize: "18px",
                  }}
                >
                  Languages
                </h4>
                <div
                  className={styles.languageProficiency}
                  id="preview-languages"
                >
                  {skills.languages.map((lang, index) => (
                    <div className={styles.languageItem} key={index}>
                      <span className={styles.languageNamePreview}>
                        {lang.name}:
                      </span>
                      <span className={styles.languageLevelPreview}>
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {visibleSections.references && references.length > 0 && (
          <div className={styles.cvSection} id="preview-references">
            <h3 className={styles.cvSectionTitle}>References</h3>
            <div className={styles.cvReferences}>
              {references.map((ref, index) => (
                <div
                  className={styles.referenceCard}
                  key={index}
                  id={`reference-${index}`}
                >
                  <div className={styles.referenceName}>{ref.name}</div>
                  <div className={styles.referencePosition}>{ref.position}</div>
                  <div className={styles.referencePosition}>{ref.company}</div>
                  <div className={styles.referenceContact}>{ref.contact}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className={styles.pageBreak}></div>
      </div>
    </div>
  );
};

export default CVPreview;
