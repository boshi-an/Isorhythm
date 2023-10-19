let angle1 = 180;
let angle2 = 0;
let letterPos = +20;
let circle1Size = 100;
let circle2Size = 100;
let rotateDist = 0;
let animationId;

function rotateCircle() {
    rotateDist += 1;
    const circle1 = document.getElementById('circle1');
    const circle2 = document.getElementById('circle2');
    angle1 = parseInt(100 * rotateDist / circle1Size) % 360;
    angle2 = parseInt(-100 * rotateDist / circle2Size) % 360;
    circle1.style.transform = `rotate(${angle1}deg)`;
    circle2.style.transform = `rotate(${angle2}deg)`;
    animationId = requestAnimationFrame(rotateCircle);
}

document.getElementById('startBtn').addEventListener('click', () => {
    cancelAnimationFrame(animationId);
    rotateCircle();
    angle1 = 180;
    angle2 = 0;
});

document.getElementById('stopBtn').addEventListener('click', () => {
    cancelAnimationFrame(animationId);
});

function updateLetters(circleId, inputId) {
    const circle = document.getElementById(circleId);
    const inputText = document.getElementById(inputId).value;

    let circleR = inputText.length * 10;
    circle.style.width = `${circleR*2}px`;
    circle.style.height = `${circleR * 2}px`;

    const size = circle.offsetWidth + letterPos;
    let rotateAngle = 0;
    if (circleId == "circle1") {
        circle1Size = circle.offsetWidth;
        rotateAngle = 0;
    }
    else if (circleId == "circle2") {
        circle2Size = circle.offsetWidth;
        rotateAngle = 180;
    }


    // Remove any existing letters
    circle.innerHTML = "";

    // Add new letters
    for (let i = 0; i < inputText.length; i++) {
        const angle = (i / inputText.length) * 360;
        const letterElem = document.createElement('div');
        letterElem.className = 'letter';
        letterElem.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translate(${size / 2}px) rotate(${rotateAngle}deg)`;
        letterElem.innerText = inputText[i];
        circle.appendChild(letterElem);
    }
}

document.getElementById('input1').addEventListener('input', () => updateLetters('circle1', 'input1'));
document.getElementById('input2').addEventListener('input', () => updateLetters('circle2', 'input2'));
