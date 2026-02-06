"use client";
import { useState } from "react";

export default function AdminPage() {
  const [adminCode, setAdminCode] = useState("");
  const [verified, setVerified] = useState(false);

  async function verify() {
    const res = await fetch("/api/admin/verify-code", {
      method: "POST",
      body: JSON.stringify({ adminCode })
    });

    const data = await res.json();
    if (data.valid) setVerified(true);
  }

  if (!verified) {
    return (
      <div className="admin-login">
        <h1>Admin Panel</h1>
        <input
          placeholder="Enter admin code"
          onChange={(e) => setAdminCode(e.target.value)}
        />
        <button onClick={verify}>Enter</button>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <h1>BloxWearz Admin Panel</h1>

      <section>
        <h2>Add Product</h2>
        {/* Jij vult dit later in */}
      </section>

      <section>
        <h2>Support Tickets</h2>
        {/* Jij vult dit later in */}
      </section>

      <section>
        <h2>Reviews</h2>
        {/* Jij vult dit later in */}
      </section>

      <section>
        <h2>Release Planner</h2>
        {/* Jij vult dit later in */}
      </section>
    </div>
  );
}
