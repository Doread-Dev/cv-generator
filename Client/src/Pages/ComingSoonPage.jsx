import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/ComingSoonPage.module.css";

const ComingSoonPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isFromTemplates = location.state?.from === "templates";
  const isFromHome = location.state?.from === "home";

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.illustration}>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="100"
              cy="100"
              r="60"
              fill="none"
              stroke="#111"
              strokeWidth="3"
            />
            <circle cx="100" cy="100" r="5" fill="#111" />
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="70"
              stroke="#111"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="100"
              y1="100"
              x2="130"
              y2="100"
              stroke="#111"
              strokeWidth="3"
              strokeLinecap="round"
            />

          
          </svg>
        </div>

        <h1 className={styles.title}>
          {isFromTemplates ? "Template Coming Soon" : "Coming Soon"}
        </h1>
        <p className={styles.subtitle}>
          {isFromTemplates
            ? "This template is currently under development. You can try the 'Minimalist' template which is fully functional now!"
            : "We're working hard to bring you the CV editing feature. This functionality will be available soon!"}
        </p>

        <div className={styles.features}>
          {isFromTemplates ? (
            <>
              <div className={styles.feature}>
                <h3>More Templates</h3>
                <p>We're adding more beautiful templates soon</p>
              </div>

              <div className={styles.feature}>
                <h3>Faster Creation</h3>
                <p>Quick and easy CV building process</p>
              </div>

              <div className={styles.feature}>
                <h3>Responsive Design</h3>
                <p>Perfect CVs for all devices</p>
              </div>
            </>
          ) : (
            <>
              <div className={styles.feature}>
                <h3>Edit CVs</h3>
                <p>Modify and update your existing CVs</p>
              </div>

              <div className={styles.feature}>
                <h3>Track Changes</h3>
                <p>See your CV evolution over time</p>
              </div>

              <div className={styles.feature}>
                <h3>Version Control</h3>
                <p>Manage multiple versions of your CV</p>
              </div>
            </>
          )}
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            ← Go Back
          </button>
          {isFromTemplates && (
            <button
              className={styles.tryBtn}
              onClick={() => navigate("/Templets")}
            >
              Try Minimalist Template
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
