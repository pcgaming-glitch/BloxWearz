"use client";

export default function ThemeToggle() {
  function toggle() {
    document.body.classList.toggle("dark");
  }

  return (
    <button onClick={toggle} className="theme-toggle">
      Toggle Theme
    </button>
  );
}
