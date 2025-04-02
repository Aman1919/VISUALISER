"use client";

import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { FaCalculator, FaLightbulb, FaMoon, FaSun } from "react-icons/fa";

export default function Additions() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const { darkMode } = useTheme();
  const [visualizationType, setVisualizationType] = useState("number-line");
  const [showHint, setShowHint] = useState(false);

  const handleAddition = () => {
    const n1 = parseInt(num1) || 0;
    const n2 = parseInt(num2) || 0;
    setResult(n1 + n2);
  };

  const renderVisualization = () => {
    if (result === null) return null;
    
    const n1 = parseInt(num1) || 0;
    const n2 = parseInt(num2) || 0;

    switch (visualizationType) {
      case "number-line":
        return (
          <div className="w-full h-16 relative mt-6">
            <div className="absolute left-0 right-0 h-1 bg-[var(--color-border-primary)] top-1/2 transform -translate-y-1/2"></div>
            {[...Array(result + 2).keys()].map((n) => (
              <div 
                key={n}
                className="absolute h-4 w-0.5 bg-[var(--color-text-primary)] bottom-1/2"
                style={{ left: `${(n * 100) / (result + 1)}%` }}
              ></div>
            ))}
            <div 
              className="absolute h-8 w-2 bg-[var(--color-button-primary-from)] bottom-1/2 transition-all duration-500"
              style={{ left: "0%" }}
              id="num1-marker"
            ></div>
            <div 
              className="absolute h-8 w-2 bg-[var(--color-button-primary-to)] bottom-1/2 transition-all duration-500 delay-300"
              style={{ left: `${(n1 * 100) / (result + 1)}%` }}
              id="num2-marker"
            ></div>
          </div>
        );
      case "blocks":
        return (
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {[...Array(n1).keys()].map((n) => (
              <div 
                key={`num1-${n}`} 
                className="w-8 h-8 bg-[var(--color-button-primary-from)] rounded"
              ></div>
            ))}
            {[...Array(n2).keys()].map((n) => (
              <div 
                key={`num2-${n}`} 
                className="w-8 h-8 bg-[var(--color-button-primary-to)] rounded"
              ></div>
            ))}
          </div>
        );
      case "place-value":
        return (
          <div className="mt-6">
            <div className="flex justify-center gap-4">
              <div className="text-center">
                <div className="font-bold mb-2">Hundreds</div>
                <div className="grid grid-cols-3 gap-1">
                  {[...Array(Math.floor(n1 / 100)).keys()].map((n) => (
                    <div key={`h-${n}`} className="w-6 h-6 bg-[var(--color-button-primary-from)] rounded-full"></div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="font-bold mb-2">Tens</div>
                <div className="grid grid-cols-5 gap-1">
                  {[...Array(Math.floor((n1 % 100) / 10)).keys()].map((n) => (
                    <div key={`t-${n}`} className="w-4 h-4 bg-[var(--color-button-primary-from)] rounded-full"></div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="font-bold mb-2">Ones</div>
                <div className="grid grid-cols-5 gap-1">
                  {[...Array(n1 % 10).keys()].map((n) => (
                    <div key={`o-${n}`} className="w-3 h-3 bg-[var(--color-button-primary-from)] rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center my-4">+</div>
            {/* Repeat for num2 with different color */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={`min-h-screen p-6 transition-colors duration-300 ${darkMode ? 'dark-theme' : 'light-theme'}`}
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)'
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FaCalculator /> Addition Visualizer
          </h1>
        </div>

        {/* Addition Panel */}
        <div 
          className="p-6 rounded-xl shadow-lg mb-8"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border-primary)'
          }}
        >
          <h2 className="text-xl font-semibold mb-4">Practice Addition</h2>
          
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              value={num1}
              onChange={(e) => setNum1(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="First number"
              className="w-1/3 p-3 text-lg text-center rounded-md"
              style={{
                border: '1px solid var(--color-border-primary)',
                backgroundColor: 'var(--color-bg-accent)',
                color: 'var(--color-text-primary)'
              }}
            />
            <span className="text-2xl font-bold">+</span>
            <input
              type="text"
              value={num2}
              onChange={(e) => setNum2(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="Second number"
              className="w-1/3 p-3 text-lg text-center rounded-md"
              style={{
                border: '1px solid var(--color-border-primary)',
                backgroundColor: 'var(--color-bg-accent)',
                color: 'var(--color-text-primary)'
              }}
            />
          </div>

          <button
            onClick={handleAddition}
            className="w-full p-3 font-semibold rounded-md transition flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(to right, var(--color-button-primary-from), var(--color-button-primary-to))',
              color: 'white'
            }}
          >
            Visualize Addition
          </button>

          {result !== null && (
            <div className="mt-6 p-4 rounded-md text-center"
              style={{
                backgroundColor: 'var(--color-bg-accent)',
                border: '1px solid var(--color-border-primary)'
              }}
            >
              <p className="text-lg font-bold" style={{ color: 'var(--color-text-accent)' }}>
                {num1 || 0} + {num2 || 0} = <span className="text-2xl">{result}</span>
              </p>
            </div>
          )}
        </div>

        {/* Visualization Panel */}
        <div 
          className="p-6 rounded-xl shadow-lg"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border-primary)'
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Visualization</h2>
            <button 
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1 text-sm"
              style={{ color: 'var(--color-text-accent)' }}
            >
              <FaLightbulb /> {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
          </div>

          {showHint && (
            <div className="mb-4 p-3 rounded-md text-sm"
              style={{
                backgroundColor: 'var(--color-bg-accent)',
                border: '1px dashed var(--color-border-primary)'
              }}
            >
              {visualizationType === "number-line" && "The number line shows the first number, then adds the second number."}
              {visualizationType === "blocks" && "Each block represents 1 unit. Combine them to see the total."}
              {visualizationType === "place-value" && "See how numbers are made of hundreds, tens, and ones."}
            </div>
          )}

          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setVisualizationType("number-line")}
              className={`px-3 py-1 rounded-md text-sm ${visualizationType === "number-line" ? 'opacity-100' : 'opacity-60'}`}
              style={{
                backgroundColor: visualizationType === "number-line" ? 'var(--color-button-primary-from)' : 'var(--color-bg-accent)',
                color: visualizationType === "number-line" ? 'white' : 'var(--color-text-primary)'
              }}
            >
              Number Line
            </button>
            <button
              onClick={() => setVisualizationType("blocks")}
              className={`px-3 py-1 rounded-md text-sm ${visualizationType === "blocks" ? 'opacity-100' : 'opacity-60'}`}
              style={{
                backgroundColor: visualizationType === "blocks" ? 'var(--color-button-primary-from)' : 'var(--color-bg-accent)',
                color: visualizationType === "blocks" ? 'white' : 'var(--color-text-primary)'
              }}
            >
              Counting Blocks
            </button>
            <button
              onClick={() => setVisualizationType("place-value")}
              className={`px-3 py-1 rounded-md text-sm ${visualizationType === "place-value" ? 'opacity-100' : 'opacity-60'}`}
              style={{
                backgroundColor: visualizationType === "place-value" ? 'var(--color-button-primary-from)' : 'var(--color-bg-accent)',
                color: visualizationType === "place-value" ? 'white' : 'var(--color-text-primary)'
              }}
            >
              Place Value
            </button>
          </div>

          <div className="min-h-48 flex items-center justify-center">
            {result !== null ? (
              renderVisualization()
            ) : (
              <p className="text-center opacity-60">Enter numbers and click "Visualize Addition"</p>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-sm opacity-70">
          Tip: Try different visualization methods for numbers of different sizes!
        </div>
      </div>
    </div>
  );
}