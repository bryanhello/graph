const canvas = document.getElementById('app') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

const func5 = (x: number) => canvasHeight / 2 - Math.cos(x/10)*100;
const funcs = [func5, func5];

const drawAxis = () => {
    ctx.beginPath();
    ctx.moveTo(0, canvasHeight / 2);
    ctx.lineTo(canvasWidth, canvasHeight / 2);
    ctx.moveTo(canvasWidth / 2, 0);
    ctx.lineTo(canvasWidth / 2, canvasHeight);
    ctx.strokeStyle = 'gray';
    ctx.stroke();
    ctx.closePath();

    // Dessiner les graduations sur l'axe x
    for (let x = 0; x < canvasWidth; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, canvasHeight / 2 - 5);
        ctx.lineTo(x, canvasHeight / 2 + 5);
        ctx.stroke();
    }

    // Dessiner les graduations sur l'axe y
    for (let y = 0; y < canvasHeight; y += 20) {
        ctx.beginPath();
        ctx.moveTo(canvasWidth / 2 - 5, y);
        ctx.lineTo(canvasWidth / 2 + 5, y);
        ctx.stroke();
    }
};

const drawFunc = (funcsToDraw: ((x: number) => number)[]) => {
    const colors = ['black', 'red', 'blue', 'green', 'purple'];
    const numColors = colors.length;

    for (let i = 0; i < funcsToDraw.length; i++) {
        const func = funcsToDraw[i];
        const color = colors[i % numColors];
        let y = -canvasWidth / 2;

        for (let x = 0; x < canvasWidth; x = x + 0.1) {
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(x, func(y + x));
            ctx.lineTo(x+0.1, func(y + x + 0.1));
            ctx.stroke();
        }
    }
};

drawAxis();
drawFunc(funcs);

// Afficher les valeurs de chaque fonction dans les balises <p> avec les IDs "functionName" et "functionValue"
const functionNameElement = document.getElementById('functionName') as HTMLParagraphElement;
const functionValueElement = document.getElementById('functionValue') as HTMLParagraphElement;

for (let i = 0; i < funcs.length; i++) {
    const func = funcs[i];
    const value = func(0) - canvasHeight / 2; // Calculer la valeur de la fonction en x = 0 et formater le nombre
    functionNameElement.innerText = `f${i + 1}(x)`;
    functionValueElement.innerText = `f${i + 1}(0) = ${value}`;
}