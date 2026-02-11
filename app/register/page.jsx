"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [robloxId, setRobloxId] = useState("");

  async function register() {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, username, robloxId })
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = "/login";
    }
  }

  return (
    <div className="auth">
      <h1>Create Account</h1>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Roblox ID" onChange={(e) => setRobloxId(e.target.value)} />

      <button onClick={register}>Register</button>
    </div>
  );
}
