"use client";
import React, { useState,useEffect,useRef } from "react";
import { FaCalculator, FaLightbulb, FaExchangeAlt } from "react-icons/fa";
import {MathInputContainer} from "@/component/MathInputContanier";

type MathAdditionTableProps = {
    num1: number;
    num2: number;
    showBlocks: boolean;
  };
  //Place Tables
  function MathAdditionTable({ num1, num2, showBlocks }: MathAdditionTableProps) {
    
    // Determine which place values we actually need to show
    const getRelevantPlaces = (n1: number, n2: number) => {
      const maxNum = n1+n2;
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
    const sum = num1 + num2;
    const sumDigits = getDigits(sum);
  
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
              <th className="p-3 text-center w-[100px] bg-[var(--color-bg-accent)]">Sum</th>
            </tr>
          </thead>
          <tbody>
            {/* Carry row - now visible in both modes */}
            <tr className="border-b border-[var(--color-border-primary)]">
              <td className="p-3 text-sm text-gray-500">Carry →</td>
              {carries.map((carry, index) => (
                <td 
                  key={index} 
                  className="p-3 text-center relative"
                  style={{ backgroundColor: 'var(--color-bg-accent)' }}
                >
                  {renderDigit(carry, "bg-yellow-500")}
                  
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
              <td className="p-3 text-xl font-bold">+</td>
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
              <td className="p-3 text-xl font-bold">=</td>
              {sumDigits.map((digit, index) => (
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
              <td className="p-3 text-center text-xl font-bold text-[var(--color-text-accent)]">
                {sum}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  const NumberLineAnimation = ({ num1 = 8, num2 = 3 }) => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const animationRef = useRef<NodeJS.Timeout | null>(null);
    const result = num1 + num2;
    
    const steps = [
      { 
        description: `Start at ${num1}`, 
        position: num1, 
        highlightStart: true, 
        highlightDistance: false, 
        showLine: false,
        delay: 1000
      },
      { 
        description: `Adding ${num2} to ${num1}`, 
        position: num1 + 1, 
        highlightStart: true, 
        highlightDistance: true, 
        showLine: true,
        delay: 1000
      },
      ...(num2 > 1 ? Array.from({ length: num2 - 1 }, (_, i) => ({
        description: i === num2 - 2 ? 
          `Add final 1 (${num1 + i + 1} + 1 = ${result})` : 
          `Add 1 more (${num1 + i + 1} + 1 = ${num1 + i + 2})`,
        position: num1 + i + 2,
        highlightStart: true,
        highlightDistance: true,
        showLine: true,
        delay: 1000
      })) : []),
      { 
        description: `Final result: ${num1} + ${num2} = ${result}`, 
        position: result, 
        highlightStart: false, 
        highlightDistance: false, 
        showLine: true, // Keep the line visible at the end
        showResult: true,
        delay: 1500 // Longer delay for final result
      }
    ];
  
    useEffect(() => {
      if (isAnimating) {
        let currentIndex = 0;
        
        const playStep = (index: number) => {
          if (index >= steps.length) {
            setIsAnimating(false);
            return;
          }
          
          setCurrentStep(index);
          currentIndex = index;
        console.log(currentIndex)
          animationRef.current = setTimeout(() => {
            playStep(index + 1);
          }, steps[index].delay || 1000);
        };
        
        playStep(0);
      }
  
      return () => {
        if (animationRef.current) {
          clearTimeout(animationRef.current);
        }
      };
    }, [isAnimating]);
  
    const resetAnimation = () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
      setCurrentStep(0);
      setIsAnimating(true);
    };
  
    return (
      <div className="w-full relative mt-8 mb-12">
        {/* Number line with ticks and labels */}
        <div className="relative h-40">
          {/* Main line */}
          <div className="absolute left-0 right-0 h-1 bg-gray-300 top-1/2 transform -translate-y-1/2"></div>
          
          {/* Ticks and numbers */}
          {[...Array(result + 2).keys()].map((n) => (
            <div key={n} className="absolute bottom-1/2 transform translate-y-1/2" 
              style={{ left: `${(n * 100) / (result + 1)}%` }}>
              <div className={`h-4 w-0.5 ${n <= steps[currentStep].position ? 'bg-blue-500' : 'bg-gray-500'} mx-auto`}></div>
              <div className={`text-sm mt-1 ${n <= steps[currentStep].position ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>
                {n}
              </div>
            </div>
          ))}
          
          {/* Starting number marker */}
          <div 
            className={`absolute h-10 w-10 rounded-full bottom-1/2 transition-all duration-300 flex items-center justify-center
              ${steps[currentStep].highlightStart ? 'bg-red-500 ring-4 ring-red-200' : 'bg-red-300'}`}
            style={{ 
              left: `${(num1 * 100) / (result + 1)}%`,
              transform: 'translate(-50%, 50%)',
              zIndex: 10
            }}
          >
            <span className="text-white font-bold">{num1}</span>
          </div>
          
          {/* Moving number marker */}
          <div 
            className={`absolute h-10 w-10 rounded-full bottom-1/2 transition-all duration-700 flex items-center justify-center
              ${steps[currentStep].highlightDistance ? 'bg-green-500 ring-4 ring-green-200' : 'bg-green-300'}`}
            style={{ 
              left: `${(steps[currentStep].position * 100) / (result + 1)}%`,
              transform: 'translate(-50%, 50%)',
              zIndex: 10
            }}
          >
            <span className="text-white font-bold">
              {steps[currentStep].position === num1 ? '' : `+${steps[currentStep].position - num1}`}
            </span>
          </div>
          
          {/* Distance line (now stays visible at the end) */}
          {(steps[currentStep].showLine || currentStep === steps.length - 1) && (
            <div 
              className="absolute h-2 bg-purple-500 bottom-1/2 transform translate-y-1/2 transition-all duration-700 rounded-full"
              style={{
                left: `${(num1 * 100) / (result + 1)}%`,
                width: `${((steps[currentStep].position - num1) * 100) / (result + 1)}%`,
                zIndex: 5
              }}
            />
          )}
          
          {/* Distance label */}
          {(steps[currentStep].showLine || currentStep === steps.length - 1) && isAnimating&& (
            <div 
              className="absolute bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-sm font-bold bottom-1/2 transition-all duration-700"
              style={{
                left: `${( (steps[currentStep].position)  * 100 / (result + 1))}%`,
                transform: 'translate(-50%, -150%)',
                zIndex: 15
              }}
            >
              {steps[currentStep].position}
            </div>
          )}
          
          {/* Final result */}
          {steps[currentStep].showResult && (
            <div 
              className="absolute h-14 w-14 bg-blue-600 rounded-full bottom-1/2 flex items-center justify-center animate-bounce"
              style={{ 
                left: `${(result * 100) / (result + 1)}%`,
                transform: 'translate(-50%, 50%)',
                zIndex: 20
              }}
            >
              <span className="text-white font-bold text-lg">{result}</span>
            </div>
          )}
        </div>
        
        {/* Controls */}
        <div className="text-center mt-8">
          <button 
            onClick={resetAnimation}
            className="px-6 py-2 bg-blue-600 text-white rounded-md text-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
          >
            {currentStep === steps.length - 1 ? 'Replay Animation' : 'Start Animation'}
          </button>
          
        </div>
      </div>
    );
  };

export default function Additions() {
    const [num1, setNum1] = useState("845");
    const [num2, setNum2] = useState("344");
    const [result, setResult] = useState<number | null>(1189);
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
          
          return (<NumberLineAnimation num1={n1} num2={n2}/>)
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
            <p className="text-center opacity-60">Enter numbers and click {"Calculate"}</p>
          )}
        </div>
      </div>

      <div className="mt-8 text-center text-sm opacity-70">
        Tip: Number line and blocks work best with single-digit numbers (0-9)
      </div>
    </div>
  );
}