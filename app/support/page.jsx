"use client";
import { useState } from "react";

export default function SupportPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [category, setCategory] = useState("Bug");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  async function submitForm() {
    const res = await fetch("/api/support/create-ticket", {
      method: "POST",
      body: JSON.stringify({ email, username, category, message })
    });

    const data = await res.json();
    if (data.success) setSent(true);
  }

  return (
    <div className="support-container">
      <h1>Support</h1>

      {sent ? (
        <p>Your request has been sent!</p>
      ) : (
        <>
          <input
            placeholder="Your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Your username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <select onChange={(e) => setCategory(e.target.value)}>
            <option>Bug</option>
            <option>Suggestion</option>
            <option>Report</option>
            <option>General Question</option>
            <option>Feedback</option>
          </select>

          <textarea
            placeholder="Describe your issue..."
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={submitForm}>Submit</button>
        </>
      )}
    </div>
  );
}
