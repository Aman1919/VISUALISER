export default class NumberLineaddtion{
        context: CanvasRenderingContext2D;
        num1: number;
        num2: number;
        
        constructor(num1: number, num2: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
                this.num1 = num1;
                this.num2 = num2;
                this.context = context;
                this.draw(canvas);
        }
        
        draw(canvas:HTMLCanvasElement) {
                this.context.fillStyle = "#524E4E";
                this.context.fillRect(0, 0, canvas.width, canvas.height);
                const max = Math.max(this.num1, this.num2);
                const min = Math.min(this.num1, this.num2);
                const gap = (canvas.width - 20 )/ (min+1);
                let x = 10;
                this.drawLine(x, canvas.height / 2, canvas.width - 10, canvas.height / 2, "black");
                
                for (let i = 0; i <= min; i++) {
                        let color=(i===0||i===min)?"red":"white"
                        this.drawPoint(x, canvas.height / 2, max + i, color);
                        if (i === min) { break}                      
                        this.drawArc(x + gap / 2, canvas.height / 2, gap / 2);
                        x += gap;
                }
                this.DrawText(canvas.width /4, canvas.height / 100 + 50, min.toString()+" steps from "+max.toString());       
        }
        
        DrawText(x: number, y: number, text: string) {
                this.context.fillStyle = "white";
                this.context.font = "20px Arial";
                this.context.fillText(text, x, y);
        }
        drawLine(x1: number, y1: number, x2: number, y2: number, color: string) {
        this.context.beginPath() 
                this.context.lineWidth = 3
                this.context.strokeStyle = color
                this.context.moveTo(x1, y1);
                 this.context.lineTo(x2, y2);                
                this.context.stroke();
                this.context.closePath();
        }
        
        drawArc(x:number,y:number,r:number) {
                this.context.beginPath();
                this.context.strokeStyle="green"
                this.context.arc(x, y, r, Math.PI, 2*Math.PI)
                this.context.stroke();
        }

drawPoint(x:number,y:number,num:number,color:string){
                this.context.beginPath();
                this.context.fillStyle = color;
                this.context.arc(x, y, 5, 0, 2 * Math.PI)
                this.context.fill();
                this.context.closePath();
                this.context.font = "20px Arial";
                this.context.fillText(num.toString(), x, y+25);
}
        
}
