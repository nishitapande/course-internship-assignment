import axios from "axios";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import CoursePage from "./pages/CoursePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import StudentDashboard from "./pages/StudentDashboard";
import { AuthContextProvided } from "./components/AuthContext";
const App = () => {
  return (
    <div className="App">
      <AuthContextProvided>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
        </Routes>
      </AuthContextProvided>
    </div>
  );
};

export default App;
