let canvas1 = document.getElementById('gameCanvas');
let ctx1 = canvas1.getContext('2d');

let canvas2 = document.getElementById('canvas2');
let ctx2 = canvas2.getContext('2d');

let cursorX;
let cursorY;
let firstClick = [0, 0];
let intervalLoop = null;
let drawingAOEEnabled = false;
let dpi = 15;

document.getElementById("AOE").onclick = function () {
    drawingAOEEnabled = !drawingAOEEnabled;

    if (drawingAOEEnabled) {
        enableLineDrawing();
        document.getElementById("AOE").textContent = 'Disable AOE';
    } else {
        disableLineDrawing();
        document.getElementById("AOE").textContent = 'Enable AOE';
    }
};

function enableLineDrawing() {
    // Show canvas2 for drawing
    canvas2.style.display = 'block';

    // Add event listeners for canvas2
    canvas2.addEventListener('mousemove', updateCursorPosition);
    canvas2.addEventListener('mousedown', startDragLine);
    canvas2.addEventListener('mouseup', stopDragLine);
}

function disableLineDrawing() {
    // Hide canvas2
    canvas2.style.display = 'none';

    // Clear any drawing
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    // Remove event listeners for canvas2
    canvas2.removeEventListener('mousemove', updateCursorPosition);
    canvas2.removeEventListener('mousedown', startDragLine);
    /* canvas2.removeEventListener('mouseup', stopDragLine); */
}

function startDragLine(e) {
    if (!drawingAOEEnabled) return;

    firstClick = [e.offsetX, e.offsetY];

    intervalLoop = setInterval(function () {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        ctx2.lineWidth = 10;
        ctx2.strokeStyle = 'rgba(255, 215, 0, .5)';

        let lineLengthPixels = Math.sqrt(Math.pow(cursorX - firstClick[0], 2) + Math.pow(cursorY - firstClick[1], 2)).toFixed(2);
        let lineLengthInches = ((lineLengthPixels / dpi) / zoom).toFixed(0);

        let midX = (firstClick[0] + cursorX - 100) / 2;
        let midY = (firstClick[1] + cursorY - 100) / 2;
        ctx2.fillStyle = 'rgb(255, 215, 0)'; //color for the texty
        ctx2.font = "40px Monospace";
        ctx2.fillText(lineLengthInches * 2 + ' ft', midX, midY - 5);

        ctx2.beginPath();
        ctx2.arc(firstClick[0], firstClick[1], lineLengthPixels, 0, 2 * Math.PI);
        ctx2.stroke();

    }, 10);
}

function startDragAOE(e) {
    if (!drawingAOEEnabled) return;

    firstClick = [e.offsetX, e.offsetY];

    intervalLoop = setInterval(function () {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

        let lineLengthPixels = Math.sqrt(Math.pow(cursorX - firstClick[0], 2) + Math.pow(cursorY - firstClick[1], 2)).toFixed(2);
        let lineLengthInches = ((lineLengthPixels / dpi) / zoom).toFixed(0);

        let midX = (firstClick[0] + cursorX - 100) / 2;
        let midY = (firstClick[1] + cursorY - 100) / 2;
        ctx2.fillStyle = 'rgb(255, 215, 0)'; //color for the texty
        ctx2.font = "40px Monospace";
        ctx2.fillText(lineLengthInches + ' ft', midX, midY - 5);;

        //AOE circle 
        ctx2.beginPath();
        ctx2.arc(firstClick[0], firstClick[1], lineLengthPixels, 0, 2 * Math.PI);
        ctx2.stroke();
    }, 10);
}

function stopDragLine() {
    if (intervalLoop) {
        clearInterval(intervalLoop);
    }
}

function stopDragAOE() {
    if (intervalLoop) {
        clearInterval(intervalLoop);
    }
}

function updateCursorPosition(e) {
    cursorX = e.offsetX;
    cursorY = e.offsetY;
}
