import React, { useEffect, useState } from 'react';
import Canvas from './addition/canvas';
import MathAdditionTabel from './addition/table';

const MathOperations: React.FC<{ choose: string }> = ({ choose }) => {
        const [num1, setNum1] = useState(0)
        const [num2, setNum2] = useState(0)
        const [submit, setSubmit] = useState(false);
       
        const Evaluate = () => {
                if (num1 && num2) {
                        setSubmit(true)
                }
                
        }
        useEffect(() => {
        if(submit){
                setSubmit(false)

        }
        }, [num1, num2])
        
        function Show() {
                if (submit&&choose==="addition") {
                        if (num1 < 10 || num2 < 10) {
                                return <Canvas num1={num1} num2={num2} submit={submit} />
                        }
                        return <MathAdditionTabel num1={num1} num2={num2} />
                }
                return <></>
                
        }     
        
        return (            
                <div className='addition'>
                        <div className='inputDiv'>
                <input type="text" value={num2}  onChange={(e) => setNum2(Number(e.target.value))} placeholder='first number'/>
                <input type="text" value={num1}  placeholder='second number' onChange={(e) => setNum1(Number(e.target.value))} />
                        <button id='evaluatebutton' onClick={Evaluate}>=</button>
                        </div>
                       <Show/>
                </div>
        );
};

export default MathOperations;
