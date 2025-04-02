"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaSearch, FaBook,  } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { lessons } from "@/context/lessons";

export default function Dashboard() {
  const { darkMode } = useTheme();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Flatten lessons for search
  const allLessons = Object.values(lessons).flatMap(category => 
    Object.values(category)
  );

  const filteredConcepts = allLessons.filter((concept) =>
    concept.title.toLowerCase().includes(search.toLowerCase()) &&
    (activeCategory === "all" || 
     (activeCategory === "maths" && concept.slug.includes("/maths/")) ||
     (activeCategory === "physics" && concept.slug.includes("/physics/")))
  );

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'dark-theme' : 'light-theme'} transition-colors`}
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)'
      }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <FaBook className="text-2xl" style={{ color: 'var(--color-text-accent)' }} />
            <h1 className="text-3xl font-bold">Learning Dashboard</h1>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search concepts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 pl-10 rounded-lg"
              style={{
                backgroundColor: 'var(--color-bg-accent)',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-border-primary)'
              }}
            />
            <FaSearch className="absolute left-3 top-3" 
              style={{ color: 'var(--color-text-accent)' }} />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${activeCategory === "all" ? 'opacity-100' : 'opacity-70'}`}
            style={{
              backgroundColor: activeCategory === "all" ? 'var(--color-button-primary-from)' : 'var(--color-bg-accent)',
              color: activeCategory === "all" ? 'white' : 'var(--color-text-primary)'
            }}
          >
            All Concepts
          </button>
          <button
            onClick={() => setActiveCategory("maths")}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${activeCategory === "maths" ? 'opacity-100' : 'opacity-70'}`}
            style={{
              backgroundColor: activeCategory === "maths" ? 'var(--color-button-primary-from)' : 'var(--color-bg-accent)',
              color: activeCategory === "maths" ? 'white' : 'var(--color-text-primary)'
            }}
          >
            Mathematics
          </button>
          <button
            onClick={() => setActiveCategory("physics")}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${activeCategory === "physics" ? 'opacity-100' : 'opacity-70'}`}
            style={{
              backgroundColor: activeCategory === "physics" ? 'var(--color-button-primary-from)' : 'var(--color-bg-accent)',
              color: activeCategory === "physics" ? 'white' : 'var(--color-text-primary)'
            }}
          >
            Physics
          </button>
        </div>

        {/* Concepts Grid */}
        {filteredConcepts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredConcepts.map((concept, index) => (
              <Link href={concept.slug} key={index}>
                <motion.div
                  className="p-6 rounded-2xl h-full flex flex-col"
                  style={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    border: '1px solid var(--color-border-primary)'
                  }}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {concept.icon}
                    <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text-accent)' }}>
                      {concept.title}
                    </h2>
                  </div>
                  <p className="mb-4 flex-grow" style={{ color: 'var(--color-text-primary)' }}>
                    {concept.description}
                  </p>
                  <div className="text-sm">
                    <p className="font-medium mb-1" style={{ color: 'var(--color-text-accent)' }}>Topics include:</p>
                    <ul className="space-y-1">
                      {concept.topics.slice(0, 3).map((topic, i) => (
                        <li key={i} className="flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full mr-2" 
                            style={{ backgroundColor: 'var(--color-text-accent)' }}></span>
                          <span style={{ color: 'var(--color-text-primary)' }}>{topic}</span>
                        </li>
                      ))}
                      {concept.topics.length > 3 && (
                        <li className="text-xs opacity-70" style={{ color: 'var(--color-text-primary)' }}>
                          + {concept.topics.length - 3} more...
                        </li>
                      )}
                    </ul>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg" style={{ color: 'var(--color-text-primary)' }}>
              No concepts found matching your search.
            </p>
            <button 
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
              }}
              className="mt-4 px-4 py-2 rounded-md"
              style={{
                backgroundColor: 'var(--color-button-primary-from)',
                color: 'white'
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}