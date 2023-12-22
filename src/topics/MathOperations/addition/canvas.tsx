import { useEffect, useRef } from "react";
import NumberLineaddtion from "./numberLine";
type CanvasProps = {
    num1: number;
    num2: number;
    submit: boolean;
}

export default function Canvas({num1, num2, submit}: CanvasProps){
const canvasRef = useRef<any>(null)

    useEffect(() => {
        if(!canvasRef||!submit)return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;
        canvas.width = Math.min(window.innerWidth * 0.9, 500);
        canvas.height = Math.min(window.innerWidth * 0.9, 400);
        const numberline = new NumberLineaddtion(num1,num2,context,canvas)

    }, [submit,num1,num2]);

    return(
        <canvas ref={canvasRef}></canvas>
    )
}