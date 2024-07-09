let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let background_image = new Image();
background_image.src = "images/backgroundimage/starsr.jpg";

//drawing the background image and setting it to the window size
background_image.onload = function() {
    context.drawImage(background_image, 0, 0, canvas.width, canvas.height);
};

//initializing variables
let ships = [];
let isDragging = false;
let offsetX = 0;
let offsetY = 0;
let current_ship_index = -1;
let rotate_angle = 0;

function add_battleship() {
    let ship_image = new Image();
    ship_image.src = "images/DiableAvionics/diableavionics_rime_p.png";

    ship_image.onload = function() {
        let ship = {
            image: ship_image,
            x: 50,
            y: 50,
            width: 230,
            height: 390
        };
        ships.push(ship);
        draw_scene();
    };
}

function add_frigate() {
    let ship_image = new Image();
    ship_image.src = "images/DiableAvionics/diableavionics_hayle.png";

    ship_image.onload = function() {
        let ship = {
            image: ship_image,
            x: 50,
            y: 50,
            width: 181,
            height: 250
        };
        ships.push(ship);
        draw_scene();
    };
}

function draw_scene() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(background_image, 0, 0, canvas.width, canvas.height);
    ships.forEach(ship => {
        context.drawImage(ship.image, ship.x, ship.y, ship.width, ship.height);
    });
}

function mouse_down(event) {
    event.preventDefault();
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    // Check if the mouse click is within any ship's boundaries and priortizies ship on top
    for (let i = ships.length - 1; i >= 0; i--) {
        let ship = ships[i];
        if (mouseX >= ship.x && mouseX <= ship.x + ship.width && mouseY >= ship.y && mouseY <= ship.y + ship.height) {
            isDragging = true;
            current_ship_index = i;
            offsetX = mouseX - ship.x;
            offsetY = mouseY - ship.y;
            break;
        }
    }
}

function mouse_up(event) {
    isDragging = false;
    current_ship_index = -1;
}

function mouse_move(event) {
    if (isDragging && current_ship_index !== -1) {
        let ship = ships[current_ship_index];
        ship.x = event.clientX - offsetX;
        ship.y = event.clientY - offsetY;
        draw_scene();
    }
}

canvas.addEventListener('mousedown', mouse_down);
canvas.addEventListener('mouseup', mouse_up);
canvas.addEventListener('mousemove', mouse_move);
