"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.require2FA) {
      window.location.href = "/verify-2fa";
      return;
    }

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/dashboard";
    }
  }

  return (
    <div className="auth">
      <h1>Login</h1>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>

      <a href="/register">Create account</a>
    </div>
  );
}
