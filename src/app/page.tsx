"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Home() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`relative flex min-h-screen flex-col items-center justify-center 
      bg-gray-100 text-black dark:bg-gray-900 dark:text-white transition-colors duration-300
    `}>
      {/* Dark Mode Toggle */}
      {mounted && (
        <button
          onClick={toggleDarkMode}
          className="absolute top-6 right-6 p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-all duration-300"
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
        </button>
      )}

      {/* Hero Section */}
      <motion.h1 className="text-5xl font-extrabold sm:text-6xl md:text-7xl" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        Math & Physics Visualizer 🚀
      </motion.h1>

      <motion.p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-2xl text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
        Explore interactive ways to <strong>understand math and physics</strong> through visualizations, animations, and hands-on lessons.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div className="mt-8 flex space-x-4" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 0.8 }}>
        <Link href="/dashboard">
          <button className="px-6 py-3 text-lg font-semibold bg-blue-600 dark:bg-blue-500 rounded-xl shadow-lg transition hover:bg-blue-500 dark:hover:bg-blue-400">
            Get Started
          </button>
        </Link>
        <Link href="/lessons">
          <button className="px-6 py-3 text-lg font-semibold bg-gray-700 dark:bg-gray-600 rounded-xl shadow-lg transition hover:bg-gray-600 dark:hover:bg-gray-500">
            Explore Lessons
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
