"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import {FaRocket } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import "./globals.css";

export default function Home() {
  const { darkMode } = useTheme();
  
  return (
    <div className={`relative flex min-h-screen flex-col items-center justify-center 
      ${darkMode ? 'dark-theme' : 'light-theme'} transition-all duration-500`}
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
        background: darkMode 
          ? 'linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 50%, var(--color-bg-accent) 100%)'
          : 'linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 50%, var(--color-bg-accent) 100%)'
      }}
    >

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        {/* Hero Section */}
        <motion.div 
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center mb-2 px-4 py-2 rounded-full"
            style={{
              backgroundColor: 'var(--color-bg-accent)',
              color: 'var(--color-text-accent)',
              border: '1px solid var(--color-border-primary)'
            }}>
            <FaRocket className="mr-2" />
            <span className="font-medium">Interactive Learning</span>
          </div>
          
          <h1 className="text-5xl font-extrabold sm:text-6xl md:text-7xl bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, var(--color-button-primary-from), var(--color-button-primary-to))`
            }}>
            Math & Physics Visualizer
          </h1>

          <motion.p 
            className="mt-6 text-xl max-w-3xl leading-relaxed"
            style={{ color: 'var(--color-text-primary)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Explore <span className="font-semibold" style={{ color: 'var(--color-text-accent)' }}>interactive</span> ways to understand complex concepts through <span className="font-semibold" style={{ color: 'var(--color-text-highlight)' }}>visualizations</span> and <span className="font-semibold" style={{ color: 'var(--color-text-accent)' }}>animations</span>.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="mt-12 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a href="/dashboard">
            <button className="px-8 py-4 text-lg font-semibold flex items-center text-white rounded-xl group"
              style={{
                backgroundImage: `linear-gradient(to right, var(--color-button-primary-from), var(--color-button-primary-to))`,
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
              }}>
              Get Started
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </a>
          <a href="/lessons">
            <button className="px-8 py-4 text-lg font-semibold flex items-center rounded-xl"
              style={{
                backgroundColor: 'var(--color-button-secondary-bg)',
                color: 'var(--color-text-primary)',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                border: '1px solid var(--color-border-primary)'
              }}>
              Explore Lessons
            </button>
          </a>
        </motion.div>

        {/* Feature Section */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl px-4">
          <FeatureCard
            title="📊 Interactive Visuals"
            description="See math & physics concepts in action with dynamic animations."
          />
          <FeatureCard
            title="🎮 Hands-On Learning"
            description="Engage with interactive simulations and explore concepts intuitively."
          />
          <FeatureCard
            title="⚡ Fast & Intuitive"
            description="Designed for students, teachers, and anyone who loves learning."
          />
        </div>

        {/* Decorative Elements */}
        <motion.div 
          className="absolute bottom-10 left-10 w-32 h-32 rounded-full blur-3xl -z-10"
          style={{
            backgroundColor: darkMode ? 'rgba(30, 58, 138, 0.2)' : 'rgba(96, 165, 250, 0.2)'
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-20 right-20 w-40 h-40 rounded-full blur-3xl -z-10"
          style={{
            backgroundColor: darkMode ? 'rgba(126, 34, 206, 0.2)' : 'rgba(168, 85, 247, 0.2)'
          }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <motion.div
      className="p-6 rounded-2xl"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border-primary)',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
      }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text-accent)' }}>
        {title}
      </h2>
      <p className="mt-2" style={{ color: 'var(--color-text-primary)' }}>
        {description}
      </p>
    </motion.div>
  );
};