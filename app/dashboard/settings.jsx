"use client";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [twoFA, setTwoFA] = useState(false);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);
    setTwoFA(u?.twoFactorEnabled || false);
  }, []);

  function toggleTheme() {
    document.body.classList.toggle("dark");
  }

  return (
    <div className="settings">
      <h1>Settings</h1>

      <button onClick={toggleTheme}>Toggle Dark/Light Mode</button>

      <div className="twofa">
        <h2>Two-Factor Authentication</h2>
        <p>Status: {twoFA ? "Enabled" : "Disabled"}</p>
      </div>
    </div>
  );
}
