"use client";

import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import "./globals.css";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={toggleDarkMode}
      className="absolute top-6 right-6 p-3 rounded-full"
      style={{
        backgroundColor: "var(--color-button-secondary-bg)",
        backdropFilter: "blur(4px)",
        boxShadow:
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        border: "1px solid var(--color-border-primary)",
      }}
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <FaSun className="text-yellow-300 text-xl" />
      ) : (
        <FaMoon className="text-xl text-blue-400" />
      )}
    </button>
  );
}


function ComponentsWapper({ children }: { children: React.ReactNode }){
  const { darkMode } = useTheme();

  return <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-theme' : 'light-theme'}`}
  style={{
    backgroundColor: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)'
  }}>
          <DarkModeToggle />
          {children}
  </div>
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body >
     <ComponentsWapper >
      {children}
      </ComponentsWapper>
        </body>
      </ThemeProvider>
    </html>
  );
}