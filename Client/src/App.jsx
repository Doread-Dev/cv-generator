import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import "./styles/global.css";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import LandingPage from "./Pages/LandingPage";
import TempletsPage from "./Pages/TempletsPage";
import ResumeBuilderPage from "./Pages/ResumeBuilderPage";
import ATSEvaluationPage from "./Pages/ATSEvaluationPage";
import ComingSoonPage from "./Pages/ComingSoonPage";

function App() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  const validRoutes = [
    "/",
    "/landing",
    "/Login",
    "/Home",
    "/Templets",
    "/ResumeBuilder",
    "/ATSEvaluation",
    "/coming-soon",
  ];

  const isValidRoute = validRoutes.includes(location.pathname);

  if (token && !isValidRoute) {
    return <Navigate to="/Home" replace />;
  }

  if (!token && !["/Login", "/landing", "/"].includes(location.pathname)) {
    return <Navigate to="/landing" replace />;
  }

  if (
    !token &&
    isValidRoute &&
    !["/Login", "/landing", "/"].includes(location.pathname)
  ) {
    return <Navigate to="/landing" replace />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={token ? <HomePage /> : <LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route
          path="/Home"
          element={token ? <HomePage /> : <Navigate to="/landing" replace />}
        />
        <Route
          path="/Templets"
          element={
            token ? <TempletsPage /> : <Navigate to="/landing" replace />
          }
        />
        <Route
          path="/ResumeBuilder"
          element={
            token ? <ResumeBuilderPage /> : <Navigate to="/landing" replace />
          }
        />
        <Route
          path="/ATSEvaluation"
          element={
            token ? <ATSEvaluationPage /> : <Navigate to="/landing" replace />
          }
        />
        <Route
          path="/coming-soon"
          element={
            token ? <ComingSoonPage /> : <Navigate to="/landing" replace />
          }
        />
        <Route
          path="*"
          element={
            token ? (
              <Navigate to="/Home" replace />
            ) : (
              <Navigate to="/landing" replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
