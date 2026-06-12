import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PdfSaved from "./components/PdfSaved";
import QuestionBox from "./components/QuestionBox";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Score from "./pages/score";
import Home from "./pages/home";
import Navbar from "./components/SmallComponents/Navbar";
import Footer from "./components/SmallComponents/Footer";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("access");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
    <Navbar />

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        <Route
          path="/interview"
          element={
            <PrivateRoute>
              <QuestionBox />
            </PrivateRoute>
          }
        />

        <Route
          path="/score"
          element={
            <PrivateRoute>
              <Score />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* OPTIONAL: Pdf Upload Route (you had it imported but not used) */}
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <PdfSaved />
            </PrivateRoute>
          }
        />

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;