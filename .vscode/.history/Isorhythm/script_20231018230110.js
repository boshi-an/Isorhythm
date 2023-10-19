let angle1 = 180;
let angle2 = 0;
let letterPos = +20;
let circle1Size = 100;
let circle2Size = 100;
let rotateDist = 0;
let talea = [];
let animationId;
const circle1 = document.getElementById('circle1');
const circle2 = document.getElementById('circle2');

function rotateCircle() {
    rotateDist += 1;
    angle1 = (100 * rotateDist / circle1Size) % 360;
    angle2 = (-100 * rotateDist / circle2Size) % 360;
    circle1.style.transform = `rotate(${angle1}deg)`;
    circle2.style.transform = `rotate(${angle2}deg)`;
    animationId = requestAnimationFrame(rotateCircle);
}

document.getElementById('startBtn').addEventListener('click', () => {
    cancelAnimationFrame(animationId);
    rotateCircle();
});

document.getElementById('stopBtn').addEventListener('click', () => {
    rotateDist = 0;
    circle1.style.transform = `rotate(0deg)`;
    circle2.style.transform = `rotate(0deg)`;
    cancelAnimationFrame(animationId);
});

function updateLetters(circleId, inputId, bias) {
    const circle = document.getElementById(circleId);
    const inputText = document.getElementById(inputId).value;

    let circleR = inputText.length * 10;
    circle.style.width = `${circleR * 2}px`;
    circle.style.height = `${circleR * 2}px`;

    const size = circle.offsetWidth + letterPos;
    let rotateAngle = 0;
    let innerHTML = ""
    if (circleId == "circle1") {
        circle1Size = circle.offsetWidth;
        rotateAngle = 0;
        innerHTML = "<div class=\"letter\">Color</div>";
    }
    else if (circleId == "circle2") {
        circle2Size = circle.offsetWidth;
        rotateAngle = 180;
        innerHTML = "<div class=\"letter\">Talea</div>";
    }


    // Remove any existing letters
    if (size <= 100) {
        circle.innerHTML = "";
    }
    else {
        circle.innerHTML = innerHTML;
    }

    // Add new letters
    for (let i = 0; i < inputText.length; i++) {
        const angle = (i / inputText.length) * 360;
        const letterElem = document.createElement('div');
        letterElem.className = 'letter';
        letterElem.style.transform = `translate(-50%, -50%) rotate(${angle + bias}deg) translate(${size / 2}px) rotate(${rotateAngle}deg)`;
        letterElem.innerText = inputText[i];
        circle.appendChild(letterElem);
    }
}

function updateTalea(inputId) {
    const inputText = document.getElementById(inputId).value;
}

function addNumber(number) {
    alert(number);
    document.getElementById('input2').value.push(number);
}

document.getElementById('input1').addEventListener('input', () => updateLetters('circle1', 'input1', 0));
document.getElementById('input2').addEventListener('input', () => updateLetters('circle2', 'input2', 180));
document.getElementById('input2').addEventListener('input', () => updateTalea('input2'));

document.getElementById("button1").onclick = function () { addNumber(1); };
