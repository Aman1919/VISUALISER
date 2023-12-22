import { log } from "console";
import React from "react";

type MathAdditionTabelProps = {
        num1: number;
        num2: number;
}

export default function MathAdditionTabel ({num1,num2}:MathAdditionTabelProps ) {
        const placeValues: any = ['Ten thousands','Thousands','Hundreds', 'Tens', 'Ones'];
        const Digits1 = getDigits(num1);
        const Digits2 = getDigits(num2);
        const ans = num1 + num2;
        const ansDigits = getDigits(ans);
        const carry = getCarry(Digits1, Digits2);

        
        
        
        
        const RowPlaces = () => {
                const max = Math.max(Digits1.length, Digits2.length, ansDigits.length);
                const slice = placeValues.slice(placeValues.length  - max+1, placeValues.length)
                                        
                return (<thead>
<tr>                       
                        {
                                slice.map((item: any, index: number) => {
                                        return <><th key={index}>{item}</th>
                                        {(index<slice.length-1)?<th key={index}></th>:""}
                                                </>
                                })
                        }
                                <th></th>
                                <th>Sum</th>
                                <th></th>
    </tr>            </thead>)
        }
        
        const RowCarry = (carry:number[]) => {
        let max = Math.max(Digits1.length, Digits2.length, ansDigits.length);
                  
                
                return (<tr className="carry">
                        
                        {
                        carry.map((item: any, index: number) => {
                                return <><td >{item}</td>
                                        {(index < carry.length - 1) ? <td></td> : ""}
                                        
</>
                                })
                        }
                        <td></td>                      
                        <td></td>                      
                        <td id="carrytext">Carry</td>
                        

                </tr>)

        } 
        
        const row = (digits: number[]) => {
        let max = Math.max(Digits1.length, Digits2.length, ansDigits.length);
                while(digits.length < max) {
                        digits.unshift(0);
                        max--;
                }
                return (<tr >
                        {digits.map((item: any, index: number) => {                        
                                return<> <td>{item}</td>
                                        {(index<digits.length-2)?<td>+</td>:""}
                                        {(index===digits.length-2)?<td>=</td>:""}

                                </>
                        })}
                </tr>)
        }        
        
        
     function  getCarry(digits1: number[], digits2: number[]) {
                const carry:any = [];
                const digit= Math.min(digits1.length, digits2.length);
             let i = digits1.length-2;
             let j = digits2.length-2;
             let place = 1
             carry.push(0)
             
             while (i >= 0 && j >= 0) {
                     carry.push(Math.floor((digits1[i] + digits2[j]) / Math.pow(10, place)) * Math.pow(10, place));
                     i--; j--
                     place++;
             }
             
             carry.reverse()
             
console.log(digits1, digits2,carry)                
                return carry;
        }
        
        
       function  getDigits(num: number): number[] {
               const digits = [num];
               let place = 1;
                while (num > 0) {
                        digits.push((num % 10)*place);
                        num = Math.floor(num / 10);
                        place *= 10;
                }
                digits.reverse();
                return digits;
        }

        return <table>
                {RowPlaces()}
{RowCarry(carry)} 
<tbody>
                
               {row(Digits2)}
                        {row(Digits1)}
               {row(ansDigits)}
                        
      </tbody>          
                
        </table>
}