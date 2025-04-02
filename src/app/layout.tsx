"use client";

import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import "./globals.css";
import { useEffect, useState } from "react";
import { FaMoon, FaSun, FaArrowLeft } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

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

function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { darkMode } = useTheme();

  // Show back button only on /lessons routes
  const showBackButton = pathname?.includes("/lessons");

  if (!showBackButton) return null;

  return (
    <button
      onClick={() => router.push('/dashboard')}
      className="absolute top-6 left-6 p-3 rounded-full flex items-center gap-2"
      style={{
        backgroundColor: "var(--color-button-secondary-bg)",
        backdropFilter: "blur(4px)",
        boxShadow:
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        border: "1px solid var(--color-border-primary)",
      }}
      aria-label="Go back to dashboard"
    >
      <FaArrowLeft className={darkMode ? "text-yellow-300" : "text-blue-400"} />
    </button>
  );
}

function AllComponents({ children }: { children: React.ReactNode }){
  const { darkMode } = useTheme();

  return <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-theme' : 'light-theme'}`}
  style={{
    backgroundColor: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)'
  }}>
              <BackButton />
          <DarkModeToggle />
          {children}
  </div>
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body >
     <AllComponents children={children} />
        </body>
      </ThemeProvider>
    </html>
  );
}