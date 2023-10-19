let angle = 0;

function rotateTriangle() {
    const triangle = document.querySelector('.triangle');
    angle = (angle + 2) % 360;
    triangle.style.transform = `rotate(${angle}deg)`;
    requestAnimationFrame(rotateTriangle);
}

rotateTriangle();
