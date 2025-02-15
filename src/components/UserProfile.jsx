import React from "react";
import "./UserProfile.css";

const UserProfile = ({ user }) => {
  return (
    <div className="profile-card">
      <h2 className="profile-title">User Profile</h2>
      <div className="profile-info">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      <button className="logout-btn">Logout</button>
    </div>
  );
};

export default UserProfile;
