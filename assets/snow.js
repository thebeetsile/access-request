const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];

function createSnowflakes(count) {
    for (let i = 0; i < count; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 4 + 1,
            d: Math.random() * 2 + 1
        });
    }
}

function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    for (let f of snowflakes) {
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    moveSnowflakes();
}

let angle = 0;

function moveSnowflakes() {
    angle += 0.001;
    for (let f of snowflakes) {
        f.y += Math.pow(f.d, 2) + 1;
        f.x += Math.sin(angle) * 2;
        if (f.y > canvas.height) {
            f.y = 0;
            f.x = Math.random() * canvas.width;
        }
    }
}

function update() {
    drawSnowflakes();
    requestAnimationFrame(update);
}

createSnowflakes(100);
update();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
