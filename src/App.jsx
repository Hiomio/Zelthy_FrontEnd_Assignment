import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";  // Import AboutUs component
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import UserProfile from "./components/UserProfile";  // Import the UserProfile component
import { useState } from "react";

function App() {
  const userProfile = {
    name: "Himabindhu",
    email: "blessykaluri@gmail.com",
    avatar: "https://via.placeholder.com/50", // Replace with real user image
    password: "your_password",
  };

  return (
    <Router>
      <Navbar userProfile />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/dashboard"
          element = {<Dashboard/>}
        />
        <Route
          path="/UserProfile"
          element={<UserProfile />} // Render UserProfile on /profile route
        />
      </Routes>

    </Router>
  );
}

export default App;
