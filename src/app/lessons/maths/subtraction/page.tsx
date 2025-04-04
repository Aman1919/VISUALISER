"use client";
import React, { useState} from "react";
import { FaCalculator, FaLightbulb, FaExchangeAlt } from "react-icons/fa";
import { MathInputContainer } from "@/component/MathInputContanier";
import { NumberLineAnimation } from "@/component/NumberLineAddAndSubtract";
type MathSubtractionTableProps = {
  num1: number;
  num2: number;
  showBlocks: boolean;
};

function MathSubtractionTable({ num1, num2, showBlocks }: MathSubtractionTableProps) {
  // Determine which place values we actually need to show
  const getRelevantPlaces = (n1: number, n2: number) => {
    const maxNum = Math.max(n1, n2);
    const places = [];
    
    if (maxNum >= 10000) places.push('Ten-Thousands');
    if (maxNum >= 1000) places.push('Thousands');
    if (maxNum >= 100) places.push('Hundreds');
    if (maxNum >= 10) places.push('Tens');
    places.push('Ones'); // Always show ones
    
    return places;
  };

  const placeValues = getRelevantPlaces(num1, num2);
  const placeMultipliers = placeValues.map((_, i) => Math.pow(10, placeValues.length - i - 1));

  // Function to split number into digits with place values
  const getDigits = (num: number): number[] => {
    return placeMultipliers.map(multiplier => Math.floor((num / multiplier) % 10));
  };

  const digits1 = getDigits(num1);
  const digits2 = getDigits(num2);
  const difference = num1 - num2;
  const diffDigits = getDigits(difference);

  const calculateBorrows = () => {
    const borrows = new Array(placeValues.length).fill(0);
    const borrowSources = new Array(placeValues.length).fill(0);
    const tempDigits = [...digits1];
    
    for (let i = placeValues.length - 1; i >= 0; i--) {
      if (tempDigits[i] < digits2[i]) {
        // Find the next non-zero digit to borrow from
        let j = i - 1;
        while (j >= 0 && tempDigits[j] === 0) {
          j--;
        }
        
        if (j >= 0) {
          // Mark the source of borrow (-1)
          borrowSources[j] = 1;
          // Perform the borrow
          tempDigits[j] -= 1;
          for (let k = j + 1; k < i; k++) {
            tempDigits[k] += 9; // Intermediate zeros become 9
          }
          tempDigits[i] += 10;
          // Mark the destination of borrow (+10)
          borrows[i] = 1;
        }
      }
    }
    
    return { borrows, borrowSources };
  };

  const { borrows, borrowSources } = calculateBorrows();

  // Enhanced digit rendering with better visual appeal
  const renderDigit = (value: number, color: string) => {
    const zeroSize = !value ? "text-lg font-medium" : "text-2xl font-bold";
    if (showBlocks) {
      return (
        <div className="flex justify-center flex-wrap gap-1 max-w-[70px] p-1">
          {[...Array(value)].map((_, i) => (
            <div 
              key={i}
              className={`w-4 h-4 ${color} rounded-md shadow-md`}
            ></div>
          ))}
        </div>
      );
    }
    return (
      <span className={`${zeroSize} p-2 rounded-md bg-opacity-70 shadow-sm`}>
        {value}
      </span>
    );
  };

  const renderBorrowRow = () => {
    return (
      <tr className="border-b border-[var(--color-border-primary)] h-12">
        <td className="p-3 text-sm text-gray-500">Borrow →</td>
        {placeValues.map((_, index) => {
          const hasSource = borrowSources[index];
          const hasDestination = borrows[index];
          
          return (
            <td 
              key={index} 
              className="p-1 text-center relative"
              style={{ backgroundColor: 'var(--color-bg-accent)' }}
            >
              <div className="flex flex-col items-center justify-center h-full gap-1">
                {hasSource?(
                  <div className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full border border-red-300">
                    -1
                  </div>
                ):""}
                {hasDestination?(
                  <div className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full border border-green-300">
                    +10
                  </div>
                ):""}
              </div>
            </td>
          );
        })}
        <td></td>
      </tr>
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="border-collapse w-full" style={{ minWidth: `${placeValues.length * 100}px` }}>
        <thead>
          <tr className="border-b-2 border-[var(--color-border-primary)]">
            <th className="p-3 text-left w-[100px]"></th>
            {placeValues.map((place, index) => (
              <th 
                key={index} 
                className="p-3 text-center font-medium bg-[var(--color-bg-accent)] relative"
                style={{ width: '120px' }}
              >
                {place}
              </th>
            ))}
            <th className="p-3 text-center w-[100px] bg-[var(--color-bg-accent)]">Difference</th>
          </tr>
        </thead>
        <tbody>
          {renderBorrowRow()}
          
          {/* First number row */}
          <tr className="border-b border-[var(--color-border-primary)]">
            <td className="p-3 text-xl font-bold"></td>
            {digits1.map((digit, index) => (
              <td 
                key={index} 
                className="p-3 text-center relative"
                style={{ backgroundColor: 'var(--color-bg-secondary)' }}
              >
                {renderDigit(digit, 'bg-blue-500')}
              </td>
            ))}
            <td></td>
          </tr>
          
          {/* Second number row */}
          <tr className="border-b border-[var(--color-border-primary)]">
            <td className="p-3 text-xl font-bold">-</td>
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
          
          {/* Horizontal line */}
          <tr>
            <td colSpan={placeValues.length + 2} className="border-b border-[var(--color-border-primary)]"></td>
          </tr>
          
          {/* Difference row */}
          <tr>
            <td className="p-3 text-xl font-bold">=</td>
            {diffDigits.map((digit, index) => (
              <td 
                key={index} 
                className="p-3 text-center font-semibold relative"
                style={{ 
                  backgroundColor: 'var(--color-bg-secondary)',
                  color: 'var(--color-text-accent)'
                }}
              >
                {renderDigit(digit, 'bg-purple-500')}
              </td>
            ))}
            <td className="p-3 text-center text-2xl font-bold text-[var(--color-text-accent)] bg-[var(--color-bg-accent)] rounded-r-md">
              {difference}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


export default function Subtractions() {
  const [num1, setNum1] = useState("845");
  const [num2, setNum2] = useState("344");
  const [result, setResult] = useState<number | null>(501);
  const [visualizationType, setVisualizationType] = useState("place-value");
  const [showHint, setShowHint] = useState(false);
  const [showBlocks, setShowBlocks] = useState(false);

  const handleSubtraction = () => {
    const n1 = parseInt(num1) || 0;
    const n2 = parseInt(num2) || 0;
    setResult(n1 - n2);
  };
  
  const isSingleDigit = (num: string) => {
    const n = parseInt(num) || 0;
    return n >= 0 && n <= 9;
  };

  const renderVisualization = () => {
    if (result === null || result < 0) return (
      <div className="text-center p-4 text-red-500">
        {result === null ? "Enter numbers and click 'Calculate'" : "Result cannot be negative"}
      </div>
    );
    
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
        
        return (<NumberLineAnimation num1={n1} num2={n2} operation="subtraction"/>)
      case "place-value":
        return (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Subtraction Process</h3>
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
            <MathSubtractionTable 
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
          <FaCalculator /> Subtraction Visualizer
        </h1>
        <div className="w-10"></div> {/* Spacer for balance */}
      </div>

      {/* Reusable Input Container */}
      <MathInputContainer
        value1={num1}
        value2={num2}
        onValue1Change={setNum1}
        onValue2Change={setNum2}
        operator="-"
        onCalculate={handleSubtraction}
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
            {visualizationType === "number-line" && "The number line shows the first number, then subtracts the second number."}
            {visualizationType === "place-value" && "See how we subtract each place value, borrowing when needed."}
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
          {renderVisualization()}
        </div>
      </div>

      <div className="mt-8 text-center text-sm opacity-70">
        Tip: Number line and blocks work best with single-digit numbers (0-9)
      </div>
    </div>
  );
}