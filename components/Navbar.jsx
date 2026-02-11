"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  return (
    <nav className="navbar">
      <a href="/" className="logo">BloxWearz</a>

      <div className="links">
        <a href="/shop">Shop</a>
        <a href="/support">Support</a>
        <a href="https://www.youtube.com/@BloxWearz" target="_blank">YouTube</a>
        <a href="https://discord.gg/Bv7dqtk6ju" target="_blank">Discord</a>

        {user ? (
          <a href="/dashboard">
            <img src={user.avatar} className="nav-avatar" />
          </a>
        ) : (
          <a href="/login">Login</a>
        )}
      </div>
    </nav>
  );
}
