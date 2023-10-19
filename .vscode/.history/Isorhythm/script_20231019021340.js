let angle1 = 180;
let angle2 = 0;
let letterPos = +20;
let circle1Size = 100;
let circle2Size = 100;
let rotationMultiplier = 320;
let circle1Num = 0;
let circle2Num = 0;
let rotateDist = 0;
let color = [];
let talea = [];
let lastColor = '#';
let lastTalea = '#';
let taleaImgElement = [];
let animationId;
const circle1 = document.getElementById('circle1');
const circle2 = document.getElementById('circle2');
let duration = {
    1: 4,
    1.5: 6,
    2: 2,
    2.5: 3,
    3: 1,
    3.5: 1.5,
    4: 0.5
};
let frequency = {
    "C3": 130.81,
    "#C3": 138.59,
    "bD3": 138.59,
    "D3": 146.83,
    "#D3": 155.56,
    "bE3": 155.56,
    "E3": 164.81,
    "F3": 174.61,
    "#F3": 185.00,
    "bG3": 185.00,
    "G3": 196.00,
    "#G3": 207.65,
    "bA3": 207.65,
    "A3": 220.00,
    "#A3": 233.08,
    "bB3": 233.08,
    "B3": 246.94
}

var context = new AudioContext();
var oscillator = context.createOscillator();
oscillator.type = "sine";
// oscillator.frequency.value = 800;
// oscillator.connect(context.destination);
// oscillator.start();
// // Beep for 500 milliseconds
// setTimeout(function () {
//     oscillator.stop();
// }, 100);

function getCurrentColor() {
    if (circle1Num < 1) {
        return '#';
    }
    let angle = (rotationMultiplier * rotateDist / circle1Size) % 360;
    let nowNote = parseInt(angle / (360 / circle1Num));
    nowNote = Math.min(nowNote, color.length - 1);
    return color[nowNote];
}

function getCurrentTalea() {
    if (circle2Num < 1) {
        return '#';
    }
    let angle = (rotationMultiplier * rotateDist / circle2Size) % 360;
    let nowNote = parseInt(angle / (360 / circle2Num));
    nowNote = Math.min(nowNote, talea.length - 1);
    return talea[nowNote];
}

function getFrequency(note) {
    note = note.toUpperCase();
    if (!frequency.has(note)) {
        return 0.0;
    }
    else {
        return frequency[note];
    }
}

function updateTextDisplay() {
    const display = document.getElementById("display");
    let curColor = getCurrentColor();
    let curTalea = getCurrentTalea();
    if (curColor != lastColor || curTalea != lastTalea) { // Update sound
        // oscillator.stop();
        alert(getFrequency(curColor));
        // oscillator.frequency.value = getFrequency(curColor);
        // oscillator.connect(context.destination);
        // oscillator.start();
        lastColor = curColor;
        lastTalea = curTalea;
    }

    // Display the color and talea
    let taleaHTML = `<img src="static/note${curTalea}.png" width="20" height="20" />`;
    if (curTalea == '#') {
        taleaHTML = '#';
    }
    display.innerHTML = `Color: ${curColor}, Talea: ${curTalea}`;
}

function rotateCircle() {
    updateTextDisplay()
    rotateDist += 1/duration[getCurrentTalea()];
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

function parseLetters(inputText) {
    let retArray = [];
    inputText = inputText.concat('.');
    for (let i = 0; i < inputText.length - 2; i += 1) {
        s = inputText[i];
        t = inputText[i + 1];
        p = inputText[i + 2];
        if (s.match(/[a-z]/i) && t.match(/[1-9]/i)) {
            retArray.push(`${s}${t}`);
            i += 1;
        }
        else if (s == '#' && t.match(/[a-z]/i) && p.match(/[1-9]/i)) {
            retArray.push(`#${t}${p}`);
            i += 2;
        }
        else if (s == 'b' && t.match(/[a-z]/i) && p.match(/[1-9]/i)) {
            retArray.push(`b${t}${p}`);
            i += 2;
        }
    }
    return retArray;
}

function updateLetters(circleId, inputText, bias) {
    inputText = parseLetters(inputText);
    const circle = document.getElementById(circleId);

    let circleR = inputText.length * 10;
    circle.style.width = `${Math.max(circleR * 2, 5)}px`;
    circle.style.height = `${Math.max(circleR * 2, 5)}px`;

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
    circle.style.width = `${Math.max(circleR * 2, 5) }px`;
    circle.style.height = `${Math.max(circleR * 2, 5) }px`;

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
    if (number != 0) {
        talea.push(number);
        const imageArea = document.getElementById('noteInputBox');

        // Create a new img element
        const img = document.createElement('img');
        img.src = `static/note${number}.png`;

        // Append the img to the image area
        imageArea.appendChild(img);

        taleaImgElement.push(img);
    }
    else if (talea.length > 0) {
        talea.pop();

        length = taleaImgElement.length-1
        if (taleaImgElement[length].parentNode) {
            taleaImgElement[length].parentNode.removeChild(taleaImgElement[length]);
        }
        taleaImgElement.pop();
    }
    // updateTalea('input2');
    updateTalea('circle2', talea, 180);
}

document.getElementById('input1').addEventListener('input', () => updateLetters('circle1', document.getElementById('input1').value, 0));
// document.getElementById('input2').addEventListener('input', () => updateLetters('circle2', 'input2', 180));
// document.getElementById('input2').addEventListener('input', () => updateTalea('input2'));

// document.getElementById("button1").onclick = function () { addNumber(1); };
