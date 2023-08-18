const canvas = document.getElementById('app') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let clientX = 0;
let clientY = 0;


class Item {
    x: number;
    y: number;
    color: string;
    constructor(x: number, y: number, color: string = 'black') {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw() {

    }
    scale(_ratio: number) {

    }
    mouseColiding(_mousePosition:number[]): boolean | undefined{
        return false;
    }
}

class ItemCircle extends Item {
    radius: number;
    constructor(x: number, y: number,color:string, radius: number) {
        super(x, y, color);
        this.radius = radius;
    }
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
    scale(ratio: number) {
        this.radius *= ratio;
    }
    mouseColiding(mousePosition: number[]): true | undefined {
        if(Math.sqrt(Math.pow(this.x - mousePosition[0],2) + Math.pow(this.y - mousePosition[1],2)) < this.radius) {
            return true;
        }
    }
}
class ItemRectangle extends Item {
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number, color:string = 'black') {
        super(x, y, color);
        this.width = width;
        this.height = height;
    }
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
    scale(ratio: number) {
        this.width *= ratio;
        this.height *= ratio;
    }
    mouseColiding(mousePosition: number[]) {
        if(mousePosition[0] > this.x && mousePosition[0] < this.x + this.width && mousePosition[1] > this.y && mousePosition[1] < this.y + this.height) {
            return true;
        }
    }
}
class Func extends Item {
    func: Math;
    constructor(x: number, y: number, func: Math, color:string = 'black') {
        super(x, y, color);
        this.func = func;
    }
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.moveTo(this.x, this.y);
        ctx.stroke();
    }
    scale(ratio: number) {
        this.y *= ratio;
    }
}


const circle = new ItemCircle(100, 100, 'red', 50);
circle.draw();
const rectangle = new ItemRectangle(200, 200, 100, 100, 'blue');
rectangle.draw();

const itemsList: Item[] = [];
itemsList.push(circle);
itemsList.push(rectangle);
canvas.addEventListener('mousedown', (e: MouseEvent) => {
    clientX = e.clientX;
    clientY = e.clientY;

    let itemToMove: Item |undefined;
    itemsList.forEach((item: Item) => {
        if (item.mouseColiding([clientX, clientY])) {
            console.log('itemToMove', item)
            itemToMove = item;
        }
    });

    const mouseMoveHandler = (e: MouseEvent) => {
        const dx = e.clientX - clientX;
        const dy = e.clientY - clientY;
            if(itemToMove!= undefined) {
                clientX = e.clientX;
                clientY = e.clientY;
                itemToMove.x += dx;
                itemToMove.y += dy;
            } else{
                clientX = e.clientX;
                clientY = e.clientY;
                itemsList.forEach(item => {
                    item.x += dx;
                    item.y += dy;
                });
            }
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
