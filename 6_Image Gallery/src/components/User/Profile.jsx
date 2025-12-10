import React from "react";
import { getCurrentUser, logoutUser } from "../../utils/auth";
import { notify } from "../../utils/notifications";
import "../../style/Profile.css";

export default function Profile() {
  const user = getCurrentUser();

  const logout = () => {
    logoutUser();
    notify("info", "Logged out");
    window.location.href = "/login";
  };

  if (!user) return <p>You are not logged in.</p>;

  return (
    <div className="profile-card">
      <h2>My Profile</h2>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <button className="logout-btn" onClick={logout}>Logout</button>
    </div>
  );
}
