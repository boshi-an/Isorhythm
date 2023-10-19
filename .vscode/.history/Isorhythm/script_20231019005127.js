let angle1 = 180;
let angle2 = 0;
let letterPos = +20;
let circle1Size = 100;
let circle2Size = 100;
let rotationMultiplier = 80;
let circle1Num = 0;
let circle2Num = 0;
let rotateDist = 0;
let color = [];
let talea = [];
let animationId;
const circle1 = document.getElementById('circle1');
const circle2 = document.getElementById('circle2');

function getCurrentColor() {
    if (circle1Num == 0) {
        return '#';
    }
    let angle = (rotationMultiplier * rotateDist / circle1Size) % 360;
    let nowNote = parseInt(angle / (360 / circle1Num));
    return color[nowNote];
}

function getCurrentTalea() {
    if (circle2Num == 0) {
        return '#';
    }
    let angle = (rotationMultiplier * rotateDist / circle2Size) % 360;
    let nowNote = parseInt(angle / (360 / circle2Num));
    return talea[nowNote];
}

function updateTextDisplay() {
    const display = document.getElementById("display");
    display.innerHTML = `Color: ${getCurrentColor()}, Talea: <img src="static/note${getCurrentTalea()}.png" width="25" height="25" object-position="-10px -20px"/>`;
}

function rotateCircle() {
    updateTextDisplay()
    rotateDist += getCurrentTalea();
    angle1 = (rotationMultiplier * rotateDist / circle1Size) % 360;
    angle2 = (-rotationMultiplier * rotateDist / circle2Size) % 360;
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

function updateLetters(circleId, inputText, bias) {
    const circle = document.getElementById(circleId);

    let circleR = inputText.length * 10;
    circle.style.width = `${circleR * 2}px`;
    circle.style.height = `${circleR * 2}px`;

    const size = circle.offsetWidth + letterPos;
    let rotateAngle = 0;
    let innerHTML = ""

    circle1Size = circle.offsetWidth;
    circle1Num = inputText.length;
    rotateAngle = 0;
    innerHTML = "<div class=\"letter\">Color</div>";
    color = inputText;

    // Remove any existing letters
    if (size <= 100) {
        circle.innerHTML = "";
    }
    else {
        circle.innerHTML = innerHTML;
    }

    // Add new letters
    for (let i = 0; i < inputText.length; i++) {
        const angle = -(i / inputText.length) * 360;
        const letterElem = document.createElement('div');
        letterElem.className = 'letter';
        letterElem.style.transform = `translate(-50%, -50%) rotate(${angle + bias}deg) translate(${size / 2}px) rotate(${rotateAngle}deg)`;
        letterElem.innerText = inputText[i];
        circle.appendChild(letterElem);
    }
}

function updateTalea(circleId, inputNote, bias) {
    const circle = document.getElementById(circleId);

    let circleR = inputNote.length * 10;
    circle.style.width = `${circleR * 2}px`;
    circle.style.height = `${circleR * 2}px`;

    const size = circle.offsetWidth + letterPos;
    let rotateAngle = 0;
    let innerHTML = ""

    circle2Size = circle.offsetWidth;
    circle2Num = inputNote.length;
    rotateAngle = 180;
    innerHTML = "<div class=\"letter\">Talea</div>";


    // Remove any existing letters
    if (size <= 100) {
        circle.innerHTML = "";
    }
    else {
        circle.innerHTML = innerHTML;
    }

    // Add new letters
    for (let i = 0; i < inputNote.length; i++) {
        const angle = (i / inputNote.length) * 360;
        const imgElem = document.createElement('img');
        imgElem.className = 'image';
        imgElem.src = `static/note${inputNote[i]}.png`;;
        imgElem.style.transform = `translate(-50%, -50%) rotate(${angle + bias}deg) translate(${size / 2}px) rotate(${rotateAngle}deg)`;
        circle.appendChild(imgElem);
    }
}

function addNote(number) {
    // alert(number);
    // document.getElementById('input2').value += number;
    // Get the image area div
    talea.push(number);
    const imageArea = document.getElementById('noteInputBox');

    // Create a new img element
    const img = document.createElement('img');
    img.src = `static/note${number}.png`;

    // Append the img to the image area
    imageArea.appendChild(img);
    // updateTalea('input2');
    updateTalea('circle2', talea, 180);
}

document.getElementById('input1').addEventListener('input', () => updateLetters('circle1', document.getElementById('input1').value, 0));
// document.getElementById('input2').addEventListener('input', () => updateLetters('circle2', 'input2', 180));
// document.getElementById('input2').addEventListener('input', () => updateTalea('input2'));

// document.getElementById("button1").onclick = function () { addNumber(1); };
