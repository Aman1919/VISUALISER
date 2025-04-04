"use client";
import { useTheme } from "@/context/ThemeContext";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function BackButton({route="/dashboard"}){
  const router = useRouter();
  const { darkMode } = useTheme();

  // Show back button only on /lessons routes


  return (
    <button
      onClick={() => router.push(route)}
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
