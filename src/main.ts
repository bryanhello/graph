const canvas = document.getElementById('app') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);


const func1 = (x: number) =>(canvasHeight / 2 - Math.sin(x / 15) * 200);
const func2 = (x: number) =>(canvasHeight / 2 - Math.sinh(x / 100) );
const funcs = [ func2];

const drawAxis = () => {
    ctx.beginPath();
    ctx.moveTo(0, canvasHeight / 2);
    ctx.lineTo(canvasWidth, canvasHeight / 2);
    ctx.moveTo(canvasWidth / 2, 0);
    ctx.lineTo(canvasWidth / 2, canvasHeight);
    ctx.strokeStyle = 'gray';
    ctx.stroke();
    ctx.closePath();
};

const drawFunc = (funcsToDraw: ((x: number) => number)[]) => {
    const colors = ['black', 'red', 'blue', 'green', 'purple'];
    const numColors = colors.length;

    for (let i = 0; i < funcsToDraw.length; i++) {
        const func = funcsToDraw[i];
        const color = colors[i % numColors];
        let y = -canvasWidth / 2;
        for(let x = 0; x < canvasWidth; x= x+ 0.1) {
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(x, func(y + x));
            ctx.lineTo(x + 0.01, func(y + x ));
            for (let omega = 1; omega <= 10; omega++) {
                ctx.moveTo(x, func(y + x));
                ctx.lineTo(x + 0.2, func(y + x + omega / 10));
                ctx.moveTo(x, func(y + x));
                ctx.lineTo(x - 0.2, func(y + x - omega / 10));
            }
            ctx.stroke();
        }
    }
};

drawAxis();

drawFunc(funcs);
