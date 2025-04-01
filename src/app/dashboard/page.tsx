"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaSearch, FaMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion";

const concepts = [
  { title: "Addition", description: "Visualize addition with number lines, blocks, and place values." },
  { title: "Subtraction", description: "Explore subtraction through visual methods like counters and grids." },
  { title: "Multiplication", description: "See multiplication using arrays, area models, and repeated addition." },
  { title: "Division", description: "Understand division with equal sharing and grouping techniques." },
  { title: "Physics: Motion", description: "Learn about speed, velocity, and acceleration through graphs." },
  { title: "Physics: Forces", description: "Understand Newton's Laws with interactive force diagrams." },
];

export default function Dashboard() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [search, setSearch] = useState("");

  const filteredConcepts = concepts.filter((concept) =>
    concept.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">📚 Explore Concepts</h1>

        {/* Dark Mode Toggle */}
        <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search concepts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 pl-10 rounded-lg bg-gray-200 dark:bg-gray-800 dark:text-white outline-none"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" />
      </div>

      {/* Concepts Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredConcepts.length > 0 ? (
          filteredConcepts.map((concept, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-800 dark:bg-gray-700 rounded-2xl shadow-lg border border-gray-700"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold">{concept.title}</h2>
              <p className="text-gray-400 mt-2">{concept.description}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400">No concepts found.</p>
        )}
      </div>
    </div>
  );
}
