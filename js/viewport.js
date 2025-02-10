class Viewport {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.zoom = 1;
        this.zoomFrom = new Point(canvas.width / 2, canvas.height / 2);
        this.offset = scale(this.zoomFrom, -1) // Current shown offset

        this.drag = {
            start: new Point(0, 0),
            end: new Point(0, 0),
            offset: new Point(0, 0),
            active: false
        };

        this.#addEventListeners();
    }

    #addEventListeners() {
        this.canvas.addEventListener("mousewheel", this.#handleMouseWheel.bind(this));
        this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
        this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
        this.canvas.addEventListener("mouseup", this.#handleMouseUp.bind(this));
    }

    getMouse(e) {
        return new Point(
            (e.offsetX - this.zoomFrom.x) * this.zoom - this.offset.x,
            (e.offsetY - this.zoomFrom.y) * this.zoom - this.offset.y
        )
    }

    getOffset(e) {
        return add(this.offset, this.drag.offset);
    }

    #handleMouseWheel(e) {
        const dir = Math.sign(e.deltaY);
        const sensitivity = 0.05;

        this.zoom += dir * sensitivity;
        this.zoom = Math.max(Math.min(this.zoom, 5), 1);
    }

    #handleMouseDown(e) {
        if (e.button == 2) {
            this.drag.active = true;
            this.drag.start = this.getMouse(e);
        }
    }

    #handleMouseMove(e) {
        if (this.drag.active) {
            this.drag.end = this.getMouse(e);
            this.drag.offset = subtract(this.drag.end, this.drag.start);
            //this.offset = add(this.drag.offset, this.offset);
        }
    }

    #handleMouseUp(e) {
        this.offset = add(this.drag.offset, this.offset);
        this.drag = {
            start: new Point(0, 0),
            end: new Point(0, 0),
            offset: new Point(0, 0),
            active: false
        };
    }
}