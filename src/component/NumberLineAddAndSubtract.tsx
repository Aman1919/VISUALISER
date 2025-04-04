import React, { useState, useEffect, useRef } from 'react';

interface NumberLineAnimationProps {
    num1?: number;
    num2?: number;
    operation?: 'addition' | 'subtraction';
  }
  
export  const NumberLineAnimation = ({ 
    num1 = 8, 
    num2 = 3, 
    operation = 'subtraction' 
  }: NumberLineAnimationProps) => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const animationRef = useRef<NodeJS.Timeout | null>(null);
    
    const isAddition = operation === 'addition';
    const result = isAddition ? num1 + num2 : num1 - num2;
    const minValue = isAddition ? 0 : Math.max(0, result - 2);
    const maxValue = isAddition ? result + 1 : num1 + 1;
  
    const steps = isAddition 
      ? [
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
            showLine: true,
            showResult: true,
            delay: 1500
          }
        ]
      : [
          { 
            description: `Start at ${num1}`, 
            position: num1, 
            highlightStart: true, 
            highlightDistance: false, 
            showLine: false,
            delay: 1000
          },
          { 
            description: `Subtracting ${num2} from ${num1}`, 
            position: num1 - 1, 
            highlightStart: true, 
            highlightDistance: true, 
            showLine: true,
            delay: 1000
          },
          ...(num2 > 1 ? Array.from({ length: num2 - 1 }, (_, i) => ({
            description: i === num2 - 2 ? 
              `Subtract final 1 (${num1 - i - 1} - 1 = ${result})` : 
              `Subtract 1 more (${num1 - i - 1} - 1 = ${num1 - i - 2})`,
            position: num1 - i - 2,
            highlightStart: true,
            highlightDistance: true,
            showLine: true,
            delay: 1000
          })) : []),
          { 
            description: `Final result: ${num1} - ${num2} = ${result}`, 
            position: result, 
            highlightStart: false, 
            highlightDistance: false, 
            showLine: true,
            showResult: true,
            delay: 1500
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
  
    const calculatePosition = (value: number) => {
      const range = maxValue - minValue;
      return ((value - minValue) * 100) / range;
    };
  
    return (
      <div className="w-full relative mt-8 mb-12">
        {/* Operation description */}
        <div className="text-center mb-4 text-lg font-semibold">
          {steps[currentStep].description || ""}
        </div>
  
        {/* Number line with ticks and labels */}
        <div className="relative h-40">
          {/* Main line */}
          <div className="absolute left-0 right-0 h-1 bg-gray-300 top-1/2 transform -translate-y-1/2"></div>
          
          {/* Ticks and numbers */}
          {Array.from({ length: maxValue - minValue + 1 }).map((_, i) => {
            const n = minValue + i;
            return (
              <div key={n} className="absolute bottom-1/2 transform translate-y-1/2" 
                style={{ left: `${(i * 100) / (maxValue - minValue)}%` }}>
                <div className={`h-4 w-0.5 ${
                  (isAddition && n <= steps[currentStep].position) || 
                  (!isAddition && n >= steps[currentStep].position) 
                    ? 'bg-blue-500' : 'bg-gray-500'} mx-auto`}></div>
                <div className={`text-sm mt-1 ${
                  (isAddition && n <= steps[currentStep].position) || 
                  (!isAddition && n >= steps[currentStep].position) 
                    ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>
                  {n}
                </div>
              </div>
            );
          })}
          
          {/* Starting number marker */}
          <div 
            className={`absolute h-10 w-10 rounded-full bottom-1/2 transition-all duration-300 flex items-center justify-center
              ${steps[currentStep].highlightStart ? 'bg-red-500 ring-4 ring-red-200' : 'bg-red-300'}`}
            style={{ 
              left: `${calculatePosition(num1)}%`,
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
              left: `${calculatePosition(steps[currentStep].position)}%`,
              transform: 'translate(-50%, 50%)',
              zIndex: 10
            }}
          >
            <span className="text-white font-bold">
              {steps[currentStep].position === num1 ? '' : 
               isAddition ? `+${steps[currentStep].position - num1}` : `-${num1 - steps[currentStep].position}`}
            </span>
          </div>
          
          {/* Distance line */}
          {(steps[currentStep].showLine || currentStep === steps.length - 1) && (
            <div 
              className="absolute h-2 bg-purple-500 bottom-1/2 transform translate-y-1/2 transition-all duration-700 rounded-full"
              style={{
                left: `${calculatePosition(isAddition ? num1 : steps[currentStep].position)}%`,
                width: `${calculatePosition(isAddition ? steps[currentStep].position : num1) - 
                       calculatePosition(isAddition ? num1 : steps[currentStep].position)}%`,
                zIndex: 5
              }}
            />
          )}
          
          {/* Final result */}
          {steps[currentStep].showResult && (
            <div 
              className="absolute h-14 w-14 bg-blue-600 rounded-full bottom-1/2 flex items-center justify-center animate-bounce"
              style={{ 
                left: `${calculatePosition(result)}%`,
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