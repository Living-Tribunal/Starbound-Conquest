var canvas1 = document.getElementById('gameCanvas');
var ctx1 = canvas1.getContext('2d');

var canvas2 = document.getElementById('canvas2');
var ctx2 = canvas2.getContext('2d');

var cursorX;
var cursorY;
var firstClick = [0, 0];
var intervalLoop = null;
var drawingEnabled = false;
var dpi = 15;


document.getElementById("test").onclick = function () {
    drawingEnabled = !drawingEnabled;

    if (drawingEnabled) {
        enableLineDrawing();
        document.getElementById("test").textContent = 'Disable Ruler';
        document.getElementById("test").style.backgroundColor = "gold";
        document.getElementById("test").style.color = "black";
    } else {
        disableLineDrawing();
        document.getElementById("test").textContent = 'Enable Ruler';
        document.getElementById("test").style.backgroundColor = "rgb(37, 37, 37)";
        document.getElementById("test").style.color = "white";
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
    canvas2.removeEventListener('mouseup', stopDragLine);
}

function startDragLine(e) {
    if (!drawingEnabled) return;

    firstClick = [e.offsetX, e.offsetY];

    intervalLoop = setInterval(function () {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

        ctx2.beginPath();
        ctx2.moveTo(firstClick[0], firstClick[1]);
        ctx2.lineWidth = 10;
        ctx2.lineTo(cursorX, cursorY);
        ctx2.strokeStyle = 'rgba(255, 215, 0, .5)'; //color for the line
        ctx2.stroke();

        ctx2.beginPath();
        ctx2.arc(cursorX, cursorY, 30, 0, 2 * Math.PI);
        ctx2.stroke();

        var lineLengthPixels = Math.sqrt(Math.pow(cursorX - firstClick[0], 2) + Math.pow(cursorY - firstClick[1], 2)).toFixed(2);
        var lineLengthInches = ((lineLengthPixels / dpi) / zoom).toFixed(0);

        var midX = (firstClick[0] + cursorX - 100) / 2;
        var midY = (firstClick[1] + cursorY - 100) / 2;
        ctx2.fillStyle = 'rgb(255, 215, 0)'; //color for the texty
        ctx2.font = "40px Monospace";
        ctx2.fillText(lineLengthInches + ' ft', midX, midY - 5);
    }, 10);
}

function stopDragLine() {
    if (intervalLoop) {
        clearInterval(intervalLoop);
    }
}

function updateCursorPosition(e) {
    cursorX = e.offsetX;
    cursorY = e.offsetY;
}
