class Point {
    constructor(x, y, 
        style = {
        color:"black", mode:"none", size:14
        }
    ) {
        this.x = x;
        this.y = y;
        this.style = style
    }

    draw(ctx) {
        let r = this.style.size / 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, r, 0,  Math.PI * 2);
        ctx.fillStyle = this.style.color;
        ctx.fill();
    }
}

class Segment {
    constructor(p1, p2, 
        style = {
            color: "black",
            width: 2
        }
    ) {
        this.p1 = p1;
        this.p2 = p2;
        this.style = style;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y)
        ctx.strokeStyle = this.style.color;
        ctx.lineWidth = this.style.width;
        ctx.stroke();
    }
}