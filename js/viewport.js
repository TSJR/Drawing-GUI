class Viewport {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.zoom = 1;
        this.#addEventListeners();
    }

    #handleMouseWheel(e) {
        const dir = Math.sign(e.deltaY);
        const sensitivity = 0.05;

        this.zoom += dir * sensitivity;
        this.zoom = Math.max(Math.min(this.zoom, 5), 1);
    }

    #addEventListeners() {
        this.canvas.addEventListener("mousewheel", this.#handleMouseWheel.bind(this));
    }

}