class Graph {
    constructor(points=[], segments=[], viewport) {
        this.points = points;
        this.segments = segments;
        this.viewport = viewport;
    }

    draw(ctx) {
        for (const seg of this.segments) {
            seg.draw(ctx, {width: 2 + 1 * this.viewport.zoom});
        }
        for (const point of this.points) {
            point.draw(ctx, {size: 6 + 10 * this.viewport.zoom});
        }
    }

    addPoint(point) {
        this.points.push(point);
    }

    containsPoint(point) {
        return !!this.points.find((p) => p.equals(point));
    }

    containsSegment(segment) {
        return !!this.segments.find((s) => s.equals(segment));
    }

    tryAddPoint(point) {
        if (!this.containsPoint(point)) {
            this.addPoint(point);
            return true;
        }
        return false;
    }

    tryAddSegment(segment) {
        if (!p1.equals(p2) && !this.containsSegment(segment)) {
            this.segments.push(segment);
            return true;
        }
        return false;
    }

    removeSegment(segment) {
        this.segments.splice(this.segments.indexOf(segment), 1);
    }

    removePoint(point) {
        this.points.splice(this.points.indexOf(point), 1);
        const included_segs = this.getSegmentsFromPoint(point);
        included_segs.forEach((seg) => this.removeSegment(seg));
    }

    getSegmentsFromPoint(point) {
        return this.segments.filter((seg) => seg.includes(point));
    }

    dispose() {
        this.points.length = 0;
        this.segments.length = 0;
    }
}