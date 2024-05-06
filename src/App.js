import axios from "axios";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import CoursePage from "./pages/CoursePage";
const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course/:id" element={<CoursePage />} />
      </Routes>
    </div>
  );
};

export default App;
