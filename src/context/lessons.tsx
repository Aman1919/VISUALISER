import {  FaCalculator, FaAtom } from "react-icons/fa";


export const lessons = {
  "maths": {
    "addition": {
      "title": "Addition",
      "description": "Learn to combine numbers using number lines, blocks, and place value charts.",
      "slug": "/dashboard/lessons/maths/addition",
      "icon": <FaCalculator className="text-blue-500" />,
      "topics": [
        "Single-digit addition",
        "Two-digit with regrouping",
        "Three-digit addition",
        "Word problems"
      ]
    },
    "subtraction": {
      "title": "Subtraction",
      "description": "Master subtraction techniques using counters, number bonds, and decomposition.",
      "slug": "/dashboard/lessons/maths/subtraction",
      "icon": <FaCalculator className="text-purple-500" />,
      "topics": [
        "Basic subtraction",
        "Subtraction with borrowing",
        "Subtracting across zeros",
        "Real-world applications"
      ]
    },
    "multiplication": {
      "title": "Multiplication",
      "description": "Discover multiplication through arrays, repeated addition, and area models.",
      "slug": "/dashboard/lessons/maths/multiplication",
      "icon": <FaCalculator className="text-green-500" />,
      "topics": [
        "Times tables",
        "Multi-digit multiplication",
        "Properties of multiplication",
        "Word problems"
      ]
    }
  },
  "physics": {
    "motion": {
      "title": "Motion",
      "description": "Understand speed, velocity, and acceleration through interactive graphs.",
      "slug": "/dashboard/lessons/physics/motion",
      "icon": <FaAtom className="text-red-500" />,
      "topics": [
        "Distance vs displacement",
        "Speed calculations",
        "Acceleration",
        "Motion graphs"
      ]
    },
    "forces": {
      "title": "Forces",
      "description": "Explore Newton's Laws with interactive force diagrams and simulations.",
      "slug": "/dashboard/lessons/physics/forces",
      "icon": <FaAtom className="text-yellow-500" />,
      "topics": [
        "Types of forces",
        "Newton's Laws",
        "Free body diagrams",
        "Friction and gravity"
      ]
    }
  }
};
