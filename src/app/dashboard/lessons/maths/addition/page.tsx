"use client";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { FaCalculator, FaLightbulb, FaExchangeAlt } from "react-icons/fa";
import {MathInputContainer} from "@/component/MathInputContanier";

type MathAdditionTableProps = {
    num1: number;
    num2: number;
    showBlocks: boolean;
  };
  
  function MathAdditionTable({ num1, num2, showBlocks }: MathAdditionTableProps) {
    const placeValues = ['Thousands', 'Hundreds', 'Tens', 'Ones'];
    
    // Function to split number into digits with place values
    const getDigits = (num: number): number[] => {
      const digits = [];
      for (let i = placeValues.length - 1; i >= 0; i--) {
        const place = Math.pow(10, i);
        digits.unshift(Math.floor((num % (place * 10)) / place));
      }
      return digits.reverse();
    };
  
    const digits1 = getDigits(num1);
    const digits2 = getDigits(num2);
    const sum = num1 + num2;
    const sumDigits = getDigits(sum);
  
    // Calculate carries correctly
    const calculateCarries = () => {
      const carries = new Array(placeValues.length).fill(0);
      let carry = 0;
      
      for (let i = placeValues.length - 1; i >= 0; i--) {
        const digitSum = digits1[i] + digits2[i] + carry;
        const newCarry = Math.floor(digitSum / 10);
        if (i > 0) {
          carries[i - 1] = newCarry;
        }
        carry = newCarry;
      }
      
      return carries;
    };
  
    const carries = calculateCarries();
  
    // Render digit as number or blocks with improved styling
    const renderDigit = (value: number, color: string) => {
      if (showBlocks) {
        return (
          <div className="flex justify-center flex-wrap gap-1 max-w-[70px] p-1">
            {[...Array(value)].map((_, i) => (
              <div 
                key={i}
                className={`w-3 h-3 ${color} rounded-sm shadow-sm`}
              ></div>
            ))}
          </div>
        );
      }
      return <span className="text-lg font-semibold">{value}</span>;
    };
  
    return (
      <div className="w-full overflow-x-auto">
        <table className="border-collapse w-full" style={{ minWidth: '600px' }}>
          <thead>
            <tr className="border-b-2 border-[var(--color-border-primary)]">
              <th className="p-3 text-left w-[100px]">Carry</th>
              {placeValues.map((place, index) => (
                <th 
                  key={index} 
                  className="p-3 text-center font-medium bg-[var(--color-bg-accent)]"
                  style={{ width: '120px' }}
                >
                  {place}
                </th>
              ))}
              <th className="p-3 text-center w-[100px] bg-[var(--color-bg-accent)]">Sum</th>
            </tr>
          </thead>
          <tbody>
            {/* Carry row */}
            <tr className="border-b border-[var(--color-border-primary)]">
              <td className="p-3 text-center text-lg font-medium">→</td>
              {carries.map((carry, index) => (
                <td 
                  key={index} 
                  className="p-3 text-center bg-[var(--color-bg-accent)]"
                >
                  {index < placeValues.length - 1 ? (
                    renderDigit(carry, 'bg-red-500')
                  ) : ''}
                </td>
              ))}
              <td></td>
            </tr>
            
            {/* First number row */}
            <tr className="border-b border-[var(--color-border-primary)]">
              <td className="p-3"></td>
              {digits1.map((digit, index) => (
                <td 
                  key={index} 
                  className="p-3 text-center"
                  style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                >
                  {renderDigit(digit, 'bg-blue-500')}
                </td>
              ))}
              <td></td>
            </tr>
            
            {/* Second number row */}
            <tr className="border-b border-[var(--color-border-primary)]">
              <td className="p-3"></td>
              {digits2.map((digit, index) => (
                <td 
                  key={index} 
                  className="p-3 text-center"
                  style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                >
                  {renderDigit(digit, 'bg-green-500')}
                </td>
              ))}
              <td></td>
            </tr>
            
            {/* Sum row */}
            <tr>
              <td className="p-3"></td>
              {sumDigits.map((digit, index) => (
                <td 
                  key={index} 
                  className="p-3 text-center font-semibold"
                  style={{ 
                    backgroundColor: 'var(--color-bg-secondary)',
                    color: 'var(--color-text-accent)'
                  }}
                >
                  {renderDigit(digit, 'bg-purple-500')}
                </td>
              ))}
              <td className="p-3 text-center text-xl font-bold text-[var(--color-text-accent)]">
                {sum}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

export default function Additions() {
    const [num1, setNum1] = useState("845");
    const [num2, setNum2] = useState("344");
    const [result, setResult] = useState<number | null>(1189);
    const { darkMode } = useTheme();
    const [visualizationType, setVisualizationType] = useState("place-value");
    const [showHint, setShowHint] = useState(false);
    const [showBlocks, setShowBlocks] = useState(false);
  
    const handleAddition = () => {
      const n1 = parseInt(num1) || 0;
      const n2 = parseInt(num2) || 0;
      setResult(n1 + n2);
    };
    
      const isSingleDigit = (num: string) => {
        const n = parseInt(num) || 0;
        return n >= 0 && n <= 9;
      };
    
  const renderVisualization = () => {
    if (result === null) return null;
    
    const n1 = parseInt(num1) || 0;
    const n2 = parseInt(num2) || 0;

    switch (visualizationType) {
      case "number-line":
        if (!isSingleDigit(num1) || !isSingleDigit(num2)) {
          return (
            <div className="text-center p-4 text-red-500">
              Number line visualization only works with single-digit numbers (0-9)
            </div>
          );
        }
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
        if (!isSingleDigit(num1) || !isSingleDigit(num2)) {
          return (
            <div className="text-center p-4 text-red-500">
              Block visualization only works with single-digit numbers (0-9)
            </div>
          );
        }
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
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Addition Process</h3>
                <button
                  onClick={() => setShowBlocks(!showBlocks)}
                  className="flex items-center gap-2 px-3 py-1 rounded-md text-sm"
                  style={{
                    backgroundColor: 'var(--color-bg-accent)',
                    color: 'var(--color-text-primary)'
                  }}
                >
                  <FaExchangeAlt /> {showBlocks ? 'Show Numbers' : 'Show Blocks'}
                </button>
              </div>
              <MathAdditionTable 
                num1={n1} 
                num2={n2} 
                showBlocks={showBlocks} 
              />
            </div>
          );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <div className="flex justify-between items-center mb-8">
        
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FaCalculator /> Addition Visualizer
        </h1>
        <div className="w-10"></div> {/* Spacer for balance */}
      </div>

      {/* Reusable Input Container */}
      <MathInputContainer
        value1={num1}
        value2={num2}
        onValue1Change={setNum1}
        onValue2Change={setNum2}
        operator="+"
        onCalculate={handleAddition}
      />

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
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1 text-sm"
              style={{ color: 'var(--color-text-accent)' }}
            >
              <FaLightbulb /> {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
          </div>
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

        <div className="mb-4 flex gap-2 flex-wrap">
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
            <p className="text-center opacity-60">Enter numbers and click "Calculate"</p>
          )}
        </div>
      </div>

      <div className="mt-8 text-center text-sm opacity-70">
        Tip: Number line and blocks work best with single-digit numbers (0-9)
      </div>
    </div>
  );
}