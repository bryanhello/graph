const canvas = document.getElementById('app') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const ratioX = 100
const ratioConst = ratioX/10

const func5 = (x: number) =>  (x**2)/ratioX +(2*x)/ratioX + 2 * ratioConst;

const funcs = [func5, func5];

const drawAxis = (): void => {
    ctx.beginPath();
    ctx.moveTo(0, canvasHeight / 2);
    ctx.lineTo(canvasWidth, canvasHeight / 2);
    ctx.moveTo(canvasWidth / 2, 0);
    ctx.lineTo(canvasWidth / 2, canvasHeight);
    ctx.strokeStyle = 'gray';
    ctx.stroke();
    ctx.closePath();


    for (let x = 0; x < canvasWidth; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, canvasHeight / 2 - 5);
        ctx.lineTo(x, canvasHeight / 2 + 5);
        ctx.stroke();
    }

    for (let y = 0; y < canvasHeight; y += 20) {
        ctx.beginPath();
        ctx.moveTo(canvasWidth / 2 - 5, y);
        ctx.lineTo(canvasWidth / 2 + 5, y);
        ctx.stroke();
    }
};

const drawFunc = (funcsToDraw: ((x: number) => number)[]): void => {
    const colors: string[] = ['black', 'red', 'blue', 'green', 'purple'];
    const numColors:number = colors.length;

    for (let i:number = 0; i < funcsToDraw.length; i++) {
        const func = funcsToDraw[i];
        const color: string = colors[i % numColors];
        let y: number = -canvasWidth / 2;

        for (let x:number = 0; x < canvasWidth; x = x + 0.1) {
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(x, canvasHeight / 2 -func(y + x));
            ctx.lineTo(x+0.1, canvasHeight / 2 -func(y + x + 0.1));
            ctx.stroke();
        }
    }
};

drawAxis();
drawFunc(funcs);


const functionNameElement = document.getElementById('functionName') as HTMLParagraphElement;
const functionValueElement = document.getElementById('functionValue') as HTMLParagraphElement;

for (let i = 0; i < funcs.length; i++) {
    const func = funcs[i];
    const value = (func(0)/ratioX )*ratioConst
    functionNameElement.innerText = `f${i + 1}(x)`;
    functionValueElement.innerText = `f${i + 1}(0) = ${value}`;
}