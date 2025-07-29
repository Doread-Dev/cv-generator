import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/LoginPage.module.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        userData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Registration failed" };
    }
  };

  const loginUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        userData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target.elements.name?.value;
    const email = e.target.elements.email?.value;
    const password = e.target.elements.password?.value;
    const confirmPassword = e.target.elements.confirmPassword?.value;

    try {
      if (isLogin) {
        const data = await loginUser({ email, password });
        localStorage.setItem("token", data.token);
        alert("Login successful! Redirecting...");
      } else {
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        const data = await registerUser({
          fullName,
          email,
          password,
          confirmPassword,
        });
        localStorage.setItem("token", data.token);
        alert("Account created successfully! Redirecting...");
      }
      navigate("/Home");
    } catch (err) {
      alert(err.message || "Something went wrong");
      console.error("Auth error:", err);
    }
  };

  const handleFormToggle = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className={styles.splitContainer}>
      <div className={styles.illustrationSide}>
        <div className={styles.animatedBackground}></div>
        <img
          src="/illustration.svg"
          alt="CV Generator Illustration"
          className={styles.deskCharacter}
        />
      </div>

      <div className={styles.formSide}>
        <div className={styles.authContainer}>
          <div className={styles.logo}>CvGenerator</div>
          <h2 className={styles.authTitle}>
            {isLogin ? "Welcome Back" : "Create Your Account"}
          </h2>
          <p className={styles.authSubtitle}>
            {isLogin
              ? "Continue building your professional story"
              : "Build a CV that speaks your truth — and passes the filters"}
          </p>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={styles.formInput}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.formInput}
                placeholder="you@example.com"
                required
              />
              {!isLogin && (
                <span className={styles.helperText}>
                  We'll never share your email with anyone else
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>
                {isLogin ? "Password" : "Create Password"}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={styles.formInput}
                placeholder={
                  isLogin ? "Enter your password" : "Create a strong password"
                }
                required
              />
              {!isLogin && (
                <span className={styles.helperText}>
                  Use 8+ characters with a mix of letters, numbers & symbols
                </span>
              )}
            </div>

            {!isLogin && (
              <div className={styles.formGroup}>
                <label htmlFor="confirm-password" className={styles.formLabel}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirmPassword"
                  className={styles.formInput}
                  placeholder="Re-enter your password"
                  required
                />
              </div>
            )}

            {isLogin && (
              <div className={styles.formGroup}>
                <span className={styles.helperText}>
                  <a href="#" style={{ color: "#111", textDecoration: "none" }}>
                    Forgot password?
                  </a>
                </span>
              </div>
            )}

            <button type="submit" className={styles.submitBtn}>
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          <div className={styles.divider}>
            <div className={styles.dividerLine}></div>
            <div className={styles.dividerText}>or</div>
            <div className={styles.dividerLine}></div>
          </div>

          <div className={styles.socialLogin}>
            <div className={styles.socialBtn}>
              <svg
                className={styles.socialIcon}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12C24 5.37258 18.6274 0 12 0Z" />
              </svg>
            </div>
            <div className={styles.socialBtn}>
              <svg
                className={styles.socialIcon}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23.954 4.569C23.69 3.659 22.925 3 22.026 3H1.974C1.079 3 0.31 3.659 0.046 4.569C0 4.739 0 4.912 0 5.091V18.909C0 19.088 0 19.261 0.046 19.431C0.31 20.341 1.079 21 1.974 21H22.026C22.925 21 23.69 20.341 23.954 19.431C24 19.261 24 19.088 24 18.909V5.091C24 4.912 24 4.739 23.954 4.569ZM7.15 18.025H3.6V9.6H7.15V18.025ZM5.375 8.006C4.161 8.006 3.181 7.025 3.181 5.812C3.181 4.6 4.161 3.619 5.375 3.619C6.588 3.619 7.569 4.6 7.569 5.812C7.569 7.025 6.588 8.006 5.375 8.006ZM20.419 18.025H16.869V13.662C16.869 12.244 16.844 10.438 14.944 10.438C13.019 10.438 12.75 12.012 12.75 13.569V18.025H9.2V9.6H12.6V11.225H12.644C13.075 10.431 14.131 9.587 15.731 9.587C19.044 9.587 20.419 11.6 20.419 13.112V18.025Z" />
              </svg>
            </div>
            <div className={styles.socialBtn}>
              <svg
                className={styles.socialIcon}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12C0 17.302 3.438 21.8 8.207 23.387C8.806 23.498 9 23.126 9 22.81V20.576C5.662 21.302 4.967 19.16 4.967 19.16C4.421 17.773 3.634 17.404 3.634 17.404C2.545 16.659 3.717 16.675 3.717 16.675C4.922 16.759 5.556 17.912 5.556 17.912C6.626 19.746 8.363 19.216 9.048 18.909C9.155 18.134 9.466 17.604 9.81 17.305C7.145 17.001 4.343 15.973 4.343 11.375C4.343 10.064 4.812 8.994 5.579 8.153C5.455 7.85 5.044 6.629 5.696 4.977C5.696 4.977 6.704 4.655 8.997 6.207C9.954 5.941 10.98 5.808 12 5.803C13.02 5.808 14.047 5.941 15.006 6.207C17.297 4.655 18.303 4.977 18.303 4.977C18.956 6.629 18.545 7.85 18.421 8.153C19.191 8.994 19.656 10.065 19.656 11.375C19.656 15.983 16.849 16.998 14.177 17.295C14.607 17.667 15 18.397 15 19.517V22.81C15 23.129 15.192 23.504 15.801 23.386C20.566 21.797 24 17.3 24 12C24 5.373 18.627 0 12 0Z" />
              </svg>
            </div>
          </div>

          <div className={styles.switchText}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span className={styles.switchLink} onClick={handleFormToggle}>
              {isLogin ? "Create account" : "Login here"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
