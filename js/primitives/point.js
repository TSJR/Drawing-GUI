class Point {
    constructor(x, y, label="") {
        this.x = x;
        this.y = y;
        this.label = label;
    }

    draw(ctx, {size=18, color="black", outline=false, fill=false}={}) {
        const rad = size / 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, rad, 0,  Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        if (outline) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.arc(this.x, this.y, rad * 0.6, 0, Math.PI * 2);
            ctx.stroke();
        }

        if (fill) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, rad * 0.4, 0,  Math.PI * 2);
            ctx.fillStyle = "yellow";
            ctx.fill();
        }

        // label
        // if (this.label) {
        //     const doc_label = document.createElement("p");
        //     doc_label.className = "label";
        //     doc_label.innerText = this.label;
        //     doc_label.style.position = "absolute";
        //     doc_label.style.left = `${this.x + x_offset}px`;
        //     doc_label.style.top = `${this.y + y_offset}px`;
            
        //     document.body.appendChild(doc_label);
        // }
    }
    
    equals(point) {
        return this.x == point.x && this.y == point.y;
    }

}