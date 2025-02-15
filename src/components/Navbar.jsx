import { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMySlotsClick = () => {
    setShowDropdown(false);
    navigate("/dashboard");
  };

  return (
    <>
      <nav className={`navbar ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        <h1 className="navbar-title">
          Slot <span>Management</span>
        </h1>

        <div className="navbar-content">
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">About Us</Link>
            </li>
            <li>
              <Link to="/settings" className="nav-link">Settings</Link>
            </li>
            <li>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </li>
          </ul>

          <div className="nav-icons">
            <button onClick={toggleTheme} className="theme-toggle">
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>

            <div className="profile-container" ref={dropdownRef}>
              <button className="profile-icon" onClick={toggleDropdown}>
                <FaUserCircle />
              </button>

              {showDropdown && (
                <div className="profile-dropdown">
                  <p><strong>Username:</strong> user123</p>
                  <p><strong>Password:</strong> ********</p>
                  <button className="dropdown-link" onClick={handleMySlotsClick}>My Slots</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ✅ Add Footer Component Here */}
    </>
  );
};

export default Navbar;
