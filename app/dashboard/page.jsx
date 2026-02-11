"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  if (!user) return <p>Please log in.</p>;

  return (
    <div className="dashboard">
      <h1>Welcome, {user.username}</h1>

      <img src={user.avatar} className="avatar" />

      <a href="/dashboard/settings" className="btn">
        Settings
      </a>
    </div>
  );
}
