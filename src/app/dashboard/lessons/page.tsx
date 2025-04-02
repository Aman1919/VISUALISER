"use client";

import { useParams } from "next/navigation";
import { lessons } from "@/context/lessons";
import { useState, useEffect } from "react";

export default function LessonPage() {
  const { concept } = useParams();
  const [lesson, setLesson] = useState<any>(null);

  useEffect(() => {
    if (typeof concept === "string" && concept in lessons.maths) {
      setLesson(lessons.maths[concept as keyof typeof lessons.maths]);
    } else {
      console.error("Invalid concept or concept not found in lessons.");
    }
  }, [concept]);

  if (!lesson) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{lesson.title}</h1>
      <p className="text-gray-600">{lesson.description}</p>

      <div className="mt-4 space-y-4">
        {lesson.methods.map((method: any, index: number) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">{method.name}</h2>
            <p className="text-blue-600 font-medium">{method.example}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
