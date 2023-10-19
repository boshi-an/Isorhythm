let angle1 = 0;
let angle2 = 0;
let letterPos = +20;
let circle1Size = 100;
let circle2Size = 100;
let rotateDist = 0;
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
    cancelAnimationFrame(animationId1);
    cancelAnimationFrame(animationId2);
    rotateCircle1();
    rotateCircle2();
});

document.getElementById('stopBtn').addEventListener('click', () => {
    cancelAnimationFrame(animationId1);
    cancelAnimationFrame(animationId2);
});

function updateLetters(circleId, inputId, circleSize) {
    const circle = document.getElementById(circleId);
    const inputText = document.getElementById(inputId).value;

    let circleR = Math.max(100, inputText.length * 10)
    circle.style.width = `${circleR*2}px`;
    circle.style.height = `${circleR * 2}px`;

    const size = circle.offsetWidth + letterPos;
    circleSize = circle.offsetWidth;

    // Remove any existing letters
    circle.innerHTML = "";

    // Add new letters
    for (let i = 0; i < inputText.length; i++) {
        const angle = (i / inputText.length) * 360;
        const letterElem = document.createElement('div');
        letterElem.className = 'letter';
        letterElem.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translate(${size / 2}px) rotate(-${angle}deg)`;
        letterElem.innerText = inputText[i];
        circle.appendChild(letterElem);
    }
}

document.getElementById('input1').addEventListener('input', () => updateLetters('circle1', 'input1', circle1Size));
document.getElementById('input2').addEventListener('input', () => updateLetters('circle2', 'input2', circle2Size));
