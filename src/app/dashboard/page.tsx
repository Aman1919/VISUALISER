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
    <div className={`min-h-screen p-8 ${darkMode ? 'dark-theme' : 'light-theme'} transition-colors`}
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)'
      }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">📚 Explore Concepts</h1>

        {/* Dark Mode Toggle */}
        <button 
          onClick={toggleDarkMode} 
          className="p-3 rounded-full"
          style={{
            backgroundColor: 'var(--color-button-secondary-bg)',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            border: '1px solid var(--color-border-primary)'
          }}
        >
          {darkMode ? (
            <FaSun className="text-yellow-300" />
          ) : (
            <FaMoon style={{ color: 'var(--color-text-accent)' }} />
          )}
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search concepts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 pl-10 rounded-lg outline-none"
          style={{
            backgroundColor: 'var(--color-bg-accent)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border-primary)'
          }}
        />
        <FaSearch className="absolute left-3 top-3" 
          style={{ color: 'var(--color-text-accent)' }} />
      </div>

      {/* Concepts Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredConcepts.length > 0 ? (
          filteredConcepts.map((concept, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-2xl shadow-lg"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border-primary)'
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
              }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text-accent)' }}>
                {concept.title}
              </h2>
              <p className="mt-2" style={{ color: 'var(--color-text-primary)' }}>
                {concept.description}
              </p>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400">No concepts found.</p>
        )}
      </div>
    </div>
  );
}