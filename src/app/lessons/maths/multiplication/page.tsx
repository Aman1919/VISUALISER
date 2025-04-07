"use client";

import { useState } from "react";
import { FaCalculator } from "react-icons/fa";
import { MathInputContainer } from "@/component/MathInputContanier";

export default function MultiplicationLesson() {
  const [num1, setNum1] = useState("2");
  const [num2, setNum2] = useState("3");
  const [result, setResult] = useState<number>(6);
  const [visualizationType, setVisualizationType] = useState("Grid");

  const handleMultiply = () => {
    const number1 = parseInt(num1) || 0;
    const number2 = parseInt(num2) || 0;
    setResult(number1 * number2);
  };

  const RenderGridVisualization = () => {
    const number1 = parseInt(num1) || 0;
    const number2 = parseInt(num2) || 0;
    const total = number1 * number2;

    return (
      <div className="flex flex-col items-center gap-6 p-8 rounded-xl bg-bg-secondary border border-border-primary shadow-lg">
        <h3 className="text-2xl font-bold text-text-primary">
          {number1} × {number2} = <span className="text-text-highlight">{total}</span>
        </h3>

        {/* Grid visualization */}
        <div className="relative">
          {/* Column indicator */}
          <div className="flex items-center justify-center mb-3">
            <div className="flex-1 h-1 bg-text-accent rounded-full"></div>
            <span className="mx-3 text-lg font-medium text-text-accent bg-bg-primary px-3 py-1 rounded-md shadow-sm">
              {number2} columns
            </span>
            <div className="flex-1 h-1 bg-text-accent rounded-full"></div>
          </div>

          <div className="flex gap-4">
            {/* Row indicator */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex-1 w-1 bg-text-accent rounded-full"></div>
              <span className="my-3 text-lg font-medium text-text-accent bg-bg-primary px-3 py-1 rounded-md shadow-sm">
                {number1} rows
              </span>
              <div className="flex-1 w-1 bg-text-accent rounded-full"></div>
            </div>

            {/* Grid cells */}
            <div className="border-2 border-border-primary rounded-md overflow-hidden bg-bg-primary">
              {[...Array(number1)].map((_, row) => (
                <div key={`row-${row}`} className="flex">
                  {[...Array(number2)].map((_, col) => (
                    <div
                      key={`cell-${row}-${col}`}
                      className={`
                        w-12 h-12
                        flex items-center justify-center 
                        hover:bg-bg-accent transition-colors duration-200
                        relative
                        ${row === 0 ? 'border-t-2 border-t-text-accent' : 'border-t border-t-border-primary'} 
                        ${col === 0 ? 'border-l-2 border-l-text-accent' : 'border-l border-l-border-primary'} 
                        border-r border-r-border-primary 
                        border-b border-b-border-primary
                      `}
                    >
                      {/* Show product in last cell */}
                      {(row === number1 - 1 && col === number2 - 1) && (
                        <span className="absolute -bottom-7 -right-2 text-lg font-bold text-text-highlight">
                          {total}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="text-text-primary text-center max-w-md bg-bg-primary p-4 rounded-lg border border-border-primary shadow-sm">
          <p className="text-sm">
            The grid shows <span className="text-text-accent font-medium">{number1}</span> rows and <span className="text-text-accent font-medium">{number2}</span> columns.
            The total number of squares ({number1} × {number2}) equals <span className="text-text-highlight font-bold">{total}</span>.
          </p>
        </div>
      </div>
    );
  };

  const RenderVisualization = () => {
    switch (visualizationType) {
      case "Grid":
        return <RenderGridVisualization />;
      case "area":
        return <p className="text-text-primary">{result}</p>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-3 text-text-primary">
          <FaCalculator className="text-text-accent" /> Multiplication Visualizer
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setVisualizationType("area")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              visualizationType === "area"
                ? "bg-gradient-to-r from-button-primary-from to-button-primary-to text-white shadow-md"
                : "bg-button-secondary-bg text-text-primary opacity-90 hover:opacity-100"
            }`}
          >
            Area Method
          </button>
          <button
            onClick={() => setVisualizationType("Grid")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              visualizationType === "Grid"
                ? "bg-gradient-to-r from-button-primary-from to-button-primary-to text-white shadow-md"
                : "bg-button-secondary-bg text-text-primary opacity-90 hover:opacity-100"
            }`}
          >
            Grid Method
          </button>
        </div>
      </div>

      <MathInputContainer
        value1={num1}
        value2={num2}
        onValue1Change={setNum1}
        onValue2Change={setNum2}
        operator="×"
        onCalculate={handleMultiply}
      />

      <div className="mt-8 flex items-center justify-center min-h-[400px]">
        {result !== 0 ? (
          <RenderVisualization />
        ) : (
          <div className="text-center text-text-primary opacity-60 p-8 bg-bg-secondary rounded-xl border border-dashed border-border-primary">
            <p>Enter numbers and click "Calculate"</p>
          </div>
        )}
      </div>
    </div>
  );
}