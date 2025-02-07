let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d")
canvas.width = 500;
canvas.height = 600;

let p1 = new Point(canvas.width / 2, canvas.height / 2);
let p2 = new Point(canvas.width / 3, canvas.height / 2);
let s1 = new Segment(p1, p2);

const temp_style = { color: "blue", mode: "none", size: "20" }


function addEventListeners() {
    canvas.addEventListener('mousemove', (e) => {
        const mouseX = e.offsetX

    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    s1.draw(ctx)
    p1.draw(ctx);
    p2.draw(ctx);
    requestAnimationFrame(animate)
}
animate()
