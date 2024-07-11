document.addEventListener("DOMContentLoaded", function() {
let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let background_image = new Image();
background_image.src = "../images/backgroundimage/starsr.jpg";

//drawing the background image and setting it to the window size
background_image.onload = function() {
    context.drawImage(background_image, 0, 0, canvas.width, canvas.height);
};

//initializing variables
let ships = [];
let is_dragging = false;
let offsetX = 0;
let offsetY = 0;
let current_ship_index = -1;
let rotate_angle = 0;
let ship_shadow_color = "red";

//getting the dropdown menu for the color changer
let shadow_color_dropdown = document.getElementById("colors");
shadow_color_dropdown.addEventListener('change', function(){
    ship_shadow_color = this.value;
})

//functions to create the ship images for html button clicks
window.add_battleship = function() {
    let ship_image = new Image();
    ship_image.src = "../images/DiableAvionics/diableavionics_rime_p.png";

    ship_image.onload = function() {
        let ship = {
            image: ship_image,
            x: 100,
            y: 100,
            width: 230,
            height: 390,
            shadowColor: null,
            isSelected: false,
        };
        ships.push(ship);
        draw_scene();
    };
}

//functions to create the ship images for html button clicks
window.add_frigate = function() {
    let ship_image = new Image();
    ship_image.src = "../images/DiableAvionics/diableavionics_hayle.png";

    ship_image.onload = function() {
        let ship = {
            image: ship_image,
            x: 100,
            y: 100,
            width: 181,
            height: 250,
            shadowColor: null,
            isSelected: false,
        };
        ships.push(ship);
        draw_scene();
    };
}

//draws the game board
function draw_scene() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(background_image, 0, 0, canvas.width, canvas.height);
    ships.forEach(ship => {
        context.save();
        if (ship.shadowColor) {
            context.shadowColor = ship.shadowColor;
            context.shadowBlur = 20;
        } else {
            context.shadowColor = 'transparent';
        }
        context.drawImage(ship.image, ship.x, ship.y, ship.width, ship.height);
        // Apply stroke style if the ship is selected
        if (ship.isSelected) {
            context.strokeStyle = 'rgba(48, 255, 104, 0.5)';
            context.lineWidth = 5;
            context.beginPath();
            let centerX = ship.x + ship.width / 2;
            let centerY = ship.y + ship.height / 2;
            let radius = Math.max(ship.width, ship.height) / 2;
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            context.stroke();

            // Draw numbers around the circle
            context.fillStyle = 'rgba(48, 255, 104, 0.5)';
            context.font = '20px monospace';
            for (let i = 0; i < 360; i += 45) { // Adjust the increment as needed
                let angle = (i - 90) * Math.PI / 180; // Adjust so 0 is at the top
                let textX = centerX - 8 + (radius + 40) * Math.cos(angle); // Adjust distance from the circle
                let textY = centerY + 8 + (radius + 40) * Math.sin(angle); // Adjust distance from the circle
                context.fillText(i.toString(), textX, textY);
            }
        }
        context.restore();
    });
}


//mouse down event or when the mouse is clicked at this position
function mouse_down(event) {
    event.preventDefault();
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    // Check if the mouse click is within any ship's boundaries and priortizies ship on top
    for (let i = ships.length - 1; i >= 0; i--) {
        let ship = ships[i];
        if (mouseX >= ship.x && mouseX <= ship.x + ship.width && mouseY >= ship.y && mouseY <= ship.y + ship.height) {
            is_dragging = true;
            current_ship_index = i;
            offsetX = mouseX - ship.x;
            offsetY = mouseY - ship.y;
            break;
        }
    }
// Mark the selected ship to apply styles during drawing
if (current_ship_index !== -1) {
    ships[current_ship_index].isSelected = true;
}

draw_scene();
}


//mouse up event or mouse un-click
function mouse_up(event) {
    is_dragging = false;
    current_ship_index = -1;
    ships.forEach(ship => ship.isSelected = false); // Deselect all ships
    draw_scene();
}


//mouse move event, moves the ship around the screen, redraws scene
function mouse_move(event) {
    if (is_dragging && current_ship_index !== -1) {
        let ship = ships[current_ship_index];
        ship.x = event.clientX - offsetX;
        ship.y = event.clientY - offsetY;
        draw_scene();
    }
}

//mouse double click event, when the mouse is double clicked at this position
function double_click(event) {
    event.preventDefault();
    let mouseX = event.clientX;
    let mouseY = event.clientY;

// Check if the double click is within any ship's boundaries
    for (let i = ships.length - 1; i >= 0; i--) {
        let ship = ships[i];
        if (mouseX >= ship.x && mouseX <= ship.x + ship.width && mouseY >= ship.y && mouseY <= ship.y + ship.height) {
            ship.shadowColor = ship_shadow_color;
            draw_scene();
            break;
        }
    }
}

//event listeners for each event
canvas.addEventListener('mousedown', mouse_down);
canvas.addEventListener('mouseup', mouse_up);
canvas.addEventListener('mousemove', mouse_move);
canvas.addEventListener('dblclick', double_click);
    
});



