import React, { useState, useEffect } from "react";
import styles from "../styles/HomePage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [panelActive, setPanelActive] = useState(false);
  const navigate = useNavigate();
  const [userCVs, setUserCVs] = useState([]);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const handleClickOutside = (e) => {
      const profilePanel = document.getElementById("profilePanel");
      const profileBtn = document.getElementById("profileBtn");

      if (
        profilePanel &&
        !profilePanel.contains(e.target) &&
        !profileBtn.contains(e.target) &&
        panelActive
      ) {
        setPanelActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [panelActive]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const cvRes = await axios.get("http://localhost:5000/mycvs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserCVs(cvRes.data.cvs);

        const userRes = await axios.get("http://localhost:5000/userinfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(userRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleViewEdit = () => {
    navigate("/coming-soon", { state: { from: "home" } });
  };

  return (
    <div className={styles.dashboard}>
      {/* Top Navigation */}
      <div className={styles.topNav}>
        <button
          className={styles.profileBtn}
          id="profileBtn"
          onClick={() => setPanelActive(true)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Profile
        </button>
      </div>

      {/* Welcome Section */}
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeContent}>
          <h1 className={styles.welcomeHeading}>
            Welcome back, {userInfo?.fullName}!
          </h1>
          <p className={styles.welcomeText}>
            Craft your perfect CV with our AI-powered builder. Our tool helps
            you create resumes that pass ATS filters and impress hiring
            managers. Start with a template, personalize with your details, and
            let our AI optimize your content for success.
          </p>
          <button
            className={styles.generateBtn}
            onClick={() => navigate("/Templets")}
          >
            Generate your own CV
          </button>
        </div>
      </div>

      {/* CVs Section */}
      <div className={styles.cvsSection}>
        {/* Decorative Characters */}
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

        <div className={`${styles.character} ${styles.character4}`}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M30,40 L50,20 L70,40 L50,60 Z"
              fill="none"
              stroke="#111"
              strokeWidth="2"
            />
            <circle
              cx="50"
              cy="40"
              r="5"
              fill="none"
              stroke="#111"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Conditional Rendering for CVs */}
        {userCVs.length === 0 ? (
          <h2 className={styles.cvsHeader2}>Create Your CVs to appear here.</h2>
        ) : (
          <>
            <h2 className={styles.cvsHeader}>Your CVs</h2>
            <div className={styles.cvList}>
              {userCVs.map((cv, index) => (
                <div key={index} className={styles.cvCard}>
                  <h3 className={styles.cvTitle}>
                    {cv.personalInfo.professionalTitle}
                  </h3>
                  <p className={styles.cvDate}>
                    Created:{" "}
                    {new Date(cv.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <div className={styles.cardActions}>
                    <button className={styles.cardBtn} onClick={handleViewEdit}>
                      View/Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Profile Panel */}
      <div
        className={`${styles.profilePanel} ${
          panelActive ? styles.profilePanelActive : ""
        }`}
        id="profilePanel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.panelHeader}>
          <h2>Your Profile</h2>
          <button
            className={styles.closeBtn}
            onClick={() => setPanelActive(false)}
          >
            ×
          </button>
        </div>

        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            {userInfo?.fullName?.charAt(0).toUpperCase()}
          </div>
          <h3 className={styles.userName}>{userInfo?.fullName}</h3>
          <p className={styles.userEmail}>{userInfo?.email}</p>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{userCVs.length}</div>
            <div className={styles.statLabel}>CVs Created</div>
          </div>
        </div>

        <div className={styles.panelActions}>
          <button className={styles.panelBtn}>Account Settings</button>
          <button className={styles.panelBtn}>Subscription</button>
          <button className={styles.panelBtn}>Help Center</button>
          <button
            className={styles.panelBtn}
            onClick={() => {
              localStorage.clear();
              navigate("/landing");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
