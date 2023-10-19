let angle1 = 0;
let angle2 = 0;
let animationId1;
let animationId2;

function rotateCircle1() {
    const circle1 = document.getElementById('circle1');
    angle1 = (angle1 + 2) % 360;
    circle1.style.transform = `rotate(${angle1}deg)`;
    animationId1 = requestAnimationFrame(rotateCircle1);
}

function rotateCircle2() {
    const circle2 = document.getElementById('circle2');
    angle2 = (angle2 - 2) % 360;
    circle2.style.transform = `rotate(${angle2}deg)`;
    animationId2 = requestAnimationFrame(rotateCircle2);
}

document.getElementById('startBtn').addEventListener('click', () => {
    rotateCircle1();
    rotateCircle2();
});

document.getElementById('stopBtn').addEventListener('click', () => {
    cancelAnimationFrame(animationId1);
    cancelAnimationFrame(animationId2);
});
