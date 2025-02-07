class GraphEditor {
    constructor(canvas, graph) {
        this.canvas = canvas;
        this.graph = graph;

        this.selected = null;
        this.hovered = null;
        this.mouse = null;

        this.dragging = false;
        this.drawing = false;

        this.ctx = this.canvas.getContext("2d");
        this.#addEventListeners();
    }

    display() {
        this.graph.draw(ctx)
        if (this.hovered) {
            this.hovered.draw(this.ctx, { fill: true });
        }
        if (this.selected) {
            const intent = this.hovered ? this.hovered : this.mouse
            new Segment(this.selected, intent).draw(ctx, { dash: [5, 5] });
            this.selected.draw(this.ctx, { outline: true })

        }
    }

    #removePoint(point) {
        this.graph.removePoint(point);
        this.hovered = null; // no point -> no longer hovering
        if (this.selected == point) {
            this.selected = null;
        }
    }

    #segToSelected(point) {
        if (this.selected) {
            this.graph.tryAddSegment(new Segment(point, this.selected));
        }
        this.selected = point;
    }

    #handleMouseDown(e) {
        if (e.button == 2) { // right click -> remove point
            if (this.selected && (!this.hovered || !this.hovered.equals(this.selected))) {
                this.selected = getNearestPoint(this.mouse, this.graph.points, 10);
            } else if (this.hovered) {
                this.#removePoint(this.hovered);
            }
        }
        if (e.button == 0) { // left click
            if (this.hovered) {
                this.#segToSelected(this.hovered);
                this.dragging = true; // old point clicked & held = dragging
                return;
            }
            this.graph.addPoint(this.mouse); // add point -> select & hover
            this.#segToSelected(this.mouse);
            this.hovered = this.mouse;
        }
    }

    #handleMouseUp(e) {
        if (e.button == 0) { // left click
            this.dragging = false;
        }
    }

    #handleMouseMove(e) {
        this.mouse = new Point(e.offsetX, e.offsetY);
        this.hovered = getNearestPoint(this.mouse, this.graph.points, 10);

        if (this.dragging) {
            this.selected.x = this.mouse.x;
            this.selected.y = this.mouse.y;
            this.temp_seg = null;
            return;
        }
    }

    #addEventListeners() {
        this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
        this.canvas.addEventListener("mouseup", this.#handleMouseUp.bind(this));
        this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
        this.canvas.addEventListener("contextmenu", (e) => e.preventDefault())
    }
}
