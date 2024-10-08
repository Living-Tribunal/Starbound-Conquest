let canvas1 = document.getElementById('gameCanvas');
let marker = document.getElementById('marker');
let context = canvas1.getContext('2d');

let drawingMarker = false;


document.getElementById("marker").onclick = function () {
    drawingMarker = !drawingMarker;

    if (drawingMarker) {
        document.getElementById("marker").style.backgroundColor = 'gold';
        canvas1.addEventListener('click', drawMarker);
    } else {
        document.getElementById("marker").style.backgroundColor = 'white';
        canvas1.removeEventListener('click', drawMarker);    
    }
};

function drawMarker(event) {
    let position = getCursorPosition(canvas1, event);
    let clickX = position.x;
    let clickY = position.y;

    context.fillStyle = "blue";
    context.beginPath();
    context.arc(clickX, clickY, 10, 0, 2 * Math.PI);
    context.fill();

    console.log(clickX, clickY);
    console.log("drawcircle");
}

function getCursorPosition(canvas1, event) {
    let rect = canvas1.getBoundingClientRect();
    console.log("cursor position");

    return{
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

window.draw = draw;