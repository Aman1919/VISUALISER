export function MathInputContainer({ 
  value1, 
  value2, 
  onValue1Change, 
  onValue2Change, 
  operator = "+",
  onCalculate 
}: {
  value1: string;
  value2: string;
  onValue1Change: (value: string) => void;
  onValue2Change: (value: string) => void;
  operator?: string;
  onCalculate: () => void;
}) {
  const calculateResult = () => {
    const num1 = parseInt(value1) || 0;
    const num2 = parseInt(value2) || 0;
    
    switch (operator) {
      case '+': return num1 + num2;
      case '-': return num1 - num2;
      case 'x': return num1 * num2;
      case '/': return num2 !== 0 ? num1 / num2 : 'Error: Division by zero';
      case '%': return num1 % num2;
      case '^': return Math.pow(num1, num2);
      default: return num1 + num2; // Default to addition
    }
  };

  const result = value1 && value2 ? calculateResult() : '';

  return (
    <div className="p-6 rounded-xl shadow-lg mb-8"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border-primary)'
      }}
    >
      <h2 className="text-xl font-semibold mb-4">
        Practice {operator === '+' ? 'Addition' : operator === '-' ? 'Subtraction' : 'Calculation'}
      </h2>
      
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          value={value1}
          onChange={(e) => onValue1Change(e.target.value.replace(/[^0-9-]/g, ''))}
          placeholder="First number"
          className="w-1/4 p-3 text-lg text-center rounded-md"
          style={{
            border: '1px solid var(--color-border-primary)',
            backgroundColor: 'var(--color-bg-accent)',
            color: 'var(--color-text-primary)'
          }}
        />
        <span className="text-2xl font-bold">{operator}</span>
        <input
          type="text"
          value={value2}
          onChange={(e) => onValue2Change(e.target.value.replace(/[^0-9-]/g, ''))}
          placeholder="Second number"
          className="w-1/4 p-3 text-lg text-center rounded-md"
          style={{
            border: '1px solid var(--color-border-primary)',
            backgroundColor: 'var(--color-bg-accent)',
            color: 'var(--color-text-primary)'
          }}
        />
        <span className="text-2xl font-bold">=</span>
        <input
          type="text"
          value={result.toString()}
          placeholder="Result"
          className="w-1/4 p-3 text-lg text-center rounded-md"
          style={{
            border: '1px solid var(--color-border-primary)',
            backgroundColor: 'var(--color-bg-accent)',
            color: 'var(--color-text-primary)'
          }}
          readOnly
        />
      </div>

      <button
        onClick={onCalculate}
        className="w-full p-3 font-semibold rounded-md transition flex items-center justify-center gap-2"
        style={{
          background: 'linear-gradient(to right, var(--color-button-primary-from), var(--color-button-primary-to))',
          color: 'white'
        }}
      >
        Calculate
      </button>
    </div>
  );
}