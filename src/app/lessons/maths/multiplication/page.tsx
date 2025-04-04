"use client";

import { useState } from "react";
import { FaCalculator } from "react-icons/fa";
import { MathInputContainer } from "@/component/MathInputContanier";

export default function MultiplicationLesson() {
  const [num1, setNum1] = useState("12");
  const [num2, setNum2] = useState("34");
  const [result, setResult] = useState<number>(408);
  const [visualizationType, setVisualizationType] = useState("Grid");

  const handleMultiply = () => {
    const number1 = parseInt(num1)||0;
    const number2 = parseInt(num2) || 0;
    setResult(number1 * number2);
  };

  const RenderGridVisualization = () => {
    const number1 = parseInt(num1) || 0;
    const number2 = parseInt(num2) || 0;
  
    return (
      <div className="flex flex-col items-center gap-6 p-6 rounded-lg shadow-md bg-bg-secondary">
        <h3 className="text-xl font-semibold text-text-primary">
          {number1} × {number2} = <span className="text-text-highlight">{number1 * number2}</span>
        </h3>
        
        {/* Grid visualization */}
        <div className="relative">
          {/* Column labels */}
          <div className="flex mb-2 ml-12">
            {[...Array(number2)].map((_, i) => (
              <div key={`col-label-${i}`} className="w-10 text-center font-medium text-text-accent">
                4
              </div>
            ))}
          </div>
          
          {/* Grid with row labels */}
          {[...Array(number1)].map((_, row) => (
            <div key={`row-${row}`} className="flex items-center">
              {/* Row label */}
              <div className="w-10 mr-2 text-right font-medium text-text-accent">
                {row + 1}
              </div>
              
              {/* Grid cells */}
              {[...Array(number2)].map((_, col) => (
                <div 
                  key={`cell-${row}-${col}`} 
                  className={`
                    w-10 h-10 border-2 
                    ${row === 0 ? 'border-t-text-accent' : 'border-t-border-primary'} 
                    ${col === 0 ? 'border-l-text-accent' : 'border-l-border-primary'} 
                    border-r-border-primary border-b-border-primary
                    flex items-center justify-center 
                    bg-bg-primary hover:bg-bg-accent transition-colors
                    relative
                  `}
                >
                  {/* Show product in last cell */}
                  {(row === number1 - 1 && col === number2 - 1) && (
                    <span className="absolute -bottom-6 -right-2 text-lg font-bold text-text-highlight">
                      {number1 * number2}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
  
        {/* Explanation */}
        <div className="text-text-primary text-center max-w-md">
          <p>
            This grid shows <span className="text-text-accent">{number1}</span> rows and <span className="text-text-accent">{number2}</span> columns. 
            The total number of squares ({number1} × {number2}) equals <span className="text-text-highlight font-medium">{number1 * number2}</span>.
          </p>
        </div>
      </div>
    );
  };

  const RenderVisualization = () => {
    switch (visualizationType) {
      case "Grid":
        return <RenderGridVisualization />;
      case "array":
        return (          
            <p>{result}</p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FaCalculator /> Multiplication Visualiser
        </h1>
        <div className="w-10"></div> 
      </div>

      <MathInputContainer
        value1={num1}
        value2={num2}
        onValue1Change={setNum1}
        onValue2Change={setNum2}
        operator="x"
        onCalculate={handleMultiply}
      />

      <div className="mb-4 flex gap-2 flex-wrap">
        <button
          onClick={() => setVisualizationType("area")}
          className={`px-3 py-1 rounded-md text-sm ${visualizationType === "area" ? 'opacity-100' : 'opacity-60'}`}
          style={{
            backgroundColor: visualizationType === "area" ? 'var(--color-button-primary-from)' : 'var(--color-bg-accent)',
            color: visualizationType === "area" ? 'white' : 'var(--color-text-primary)'
          }}
        >
          Area
        </button>
        <button
          onClick={() => setVisualizationType("Grid")}
          className={`px-3 py-1 rounded-md text-sm ${visualizationType === "Grid" ? 'opacity-100' : 'opacity-60'}`}
          style={{
            backgroundColor: visualizationType === "Grid" ? 'var(--color-button-primary-from)' : 'var(--color-bg-accent)',
            color: visualizationType === "Grid" ? 'white' : 'var(--color-text-primary)'
          }}
        >
          Grid Method
        </button>
      </div>

      <div className=" flex items-center justify-center">
        {result !== 0 ? (
          RenderVisualization()
        ) : (
          <p className="text-center opacity-60">Enter numbers and click {"Calculate"}</p>
        )}
      </div>
    </div>
  );
}