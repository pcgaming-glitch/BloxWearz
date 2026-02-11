"use client";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setAllowed(true);
  }, []);

  if (!allowed) return <p>You must be logged in.</p>;

  return children;
}
