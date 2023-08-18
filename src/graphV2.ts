const canvas = document.getElementById('app') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let clientX = 0;
let clientY = 0;


class Item {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    draw() {
        return
    }

    scale(_ratio: number) {

    }
}

class ItemCircle extends Item {
    radius: number;
    constructor(x: number, y: number, radius: number) {
        super(x, y);
        this.radius = radius;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
    scale(ratio: number) {
        this.radius *= ratio;
    }
}

class ItemRectangle extends Item {
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y);
        this.width = width;
        this.height = height;
    }
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
    scale(ratio: number) {
        this.width *= ratio;
        this.height *= ratio;
    }
}



const circle = new ItemCircle(canvasWidth / 2, canvasHeight / 2, 75);
const rectangle = new ItemRectangle(canvasWidth / 2, canvasHeight / 2, 150, 150);
const itemsList: Item[] = [circle, rectangle];
canvas.addEventListener('mousedown', (e: MouseEvent) => {

    clientX = e.clientX;
    clientY = e.clientY;

    const mouseMoveHandler = (e: MouseEvent) => {

            const dx = e.clientX - clientX;
            const dy = e.clientY - clientY;
            clientX = e.clientX;
            clientY = e.clientY;
            itemsList.forEach(item => {
                item.x += dx;
                item.y += dy;
            });

    };

    const mouseUpHandler = () => {

        canvas.removeEventListener('mousemove', mouseMoveHandler);
        canvas.removeEventListener('mouseup', mouseUpHandler);
    };

    canvas.addEventListener('mousemove', mouseMoveHandler);
    canvas.addEventListener('mouseup', mouseUpHandler);
});

document.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        itemsList.forEach(item => item.scale(0.9));
    } else {
        itemsList.forEach(item => item.scale(1.1));
    }
});

(function loop() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    itemsList.forEach(item => item.draw());
    requestAnimationFrame(loop);
})();
