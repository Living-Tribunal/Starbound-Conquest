//connect socket to local host
const socket = io('http://147.160.11.15:3000/');

//getting the DOM
document.addEventListener("DOMContentLoaded", function() {

    //getting canvas element
    let canvas = document.querySelector('canvas');
    let context = canvas.getContext('2d');

    //set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //declare background_image so every function can use it
    let background_image = new Image();
    background_image.src = "../images/backgroundimage/starsr.jpg";

    let scale_button = new Image();
    scale_button.src = "../images/icons/plus.png"

    let rotate_button = new Image();
    rotate_button.src = "../images/icons/rotate.png"



    //function that saves the canvas to toDaTaURL
    function save_canvas(){
        //generates canvas to image
       const dataURL = canvas.toDataURL();
       //sets that data to localstorage with key savedCanvasData
       localStorage.setItem('savedCanvasData', dataURL)
       //log the result of the saved canvas
       /* console.log('Canvas has been saved: ', dataURL);  */
    }
    
    function load_canvas() {
        //gets the saved data from local storage
        const load_data = localStorage.getItem('savedCanvasData')
        //if data is loaded from load data variable
        if (load_data){
            //set the background image to that saved image 
            let background_image = new Image();
            background_image.src = load_data;

            //when program loads draw the image to the width and height of the window
            background_image.onload = function() {
                context.drawImage(background_image, 0, 0, canvas.width, canvas.height);
                console.log("The canvas has been loaded");
            };
        //if no canvas was saved tell the user
        } else {
            console.log('No saved canvas was found')
        }
    }

    //function to load an image of the background that you want to use
    function load_initial_background_image() {
        let background_image = new Image();
        background_image.src = "../images/backgroundimage/starsr.jpg";

        background_image.onload = function() {
            context.drawImage(background_image, 0, 0, canvas.width, canvas.height);
            console.log("The canvas has been loaded");
            //after canvas has loaded save it
            save_canvas();
        };
    }
    //checkl to see if there is saved data if not load the initial background image
    if (localStorage.getItem('savedCanvasData')) {
        load_canvas();
    } else {
        load_initial_background_image();
    }

    let ships = [];
    let shipImages = {};
    let is_dragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let current_ship_index = -1;
    /* let ship_shadow_color = "transparent"; */
    let stroke_color = "rgba(98, 207, 245, 0.7)";

    /* let shadow_color_dropdown = document.getElementById("colors");
    shadow_color_dropdown.addEventListener('change', function(){
        ship_shadow_color = this.value;
    });*/

    socket.on('initialize', (initialShips) => {
        initialShips.forEach(shipData => {
            let ship_image = new Image();
            ship_image.onload = function() {
                let ship = { ...shipData, image: ship_image };
                ships.push(ship);
                draw_scene();
            };
            ship_image.src = shipData.image.src;
            shipImages[shipData.id] = ship_image;
        });
    });

    window.add_battleship = function() {
        let ship_image = new Image();
        ship_image.src = "images/DiableAvionics/diableavionics_rime_p.png";
        ship_image.onload = function() {
            console.log("Battleship loaded");
            let ship = {
                id: Date.now(), // Assign a unique id to each ship
                type: 'battleship',
                x: 100,
                y: 100,
                width: 230,
                height: 390,
                /* shadowColor: null, */
                isSelected: false,
                rotation_angle: 0,
                highlighted: false,
                image: ship_image.src // Store image source only
            };
            shipImages[ship.id] = ship_image;
            socket.emit('createShip', ship);
        };
    };

    window.add_frigate = function() {
        let ship_image = new Image();
        ship_image.onload = function() {
            console.log("Frigate loaded");
            let ship = {
                id: Date.now(), // Assign a unique id to each ship
                type: 'frigate',
                x: 100,
                y: 100,
                width: 181,
                height: 250,
                /* shadowColor: null, */
                isSelected: false,
                highlighted: false,
                rotation_angle: 0,
                image: ship_image.src,
                opacity: 1,
            };
            shipImages[ship.id] = ship_image;
            socket.emit('createShip', ship);
        };
        ship_image.src = "images/DiableAvionics/diableavionics_hayle.png";
    };

    socket.on('shipCreated', function(shipData) {
        console.log('Ship created by server');
        let ship_image = new Image();
        ship_image.onload = function() {
            let ship = { ...shipData, image: ship_image };
            ships.push(ship); // Add ship to local array
            shipImages[ship.id] = ship_image;
            draw_scene(); // Draw all ships after adding each one
        };
        ship_image.src = shipData.image;
    });

    socket.on('shipMoved', function(shipData) {
        console.log('Ship moved by server');
        let index = ships.findIndex(s => s.id === shipData.id);
        if (index !== -1) {
            ships[index] = { ...ships[index], ...shipData, image: shipImages[shipData.id] };
            draw_scene();
        }
    });

    function draw_scene() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(background_image, 0, 0, canvas.width, canvas.height);
        ships.forEach(ship => {
            context.save();
            context.drawImage(ship.image, ship.x, ship.y, ship.width, ship.height);
            if (ship.highlighted) {
                draw_circle_and_numbers_around_ship(ship);
            }
            context.restore();
        });
    }

    function mouse_down(event) {
        event.preventDefault();
        let mouseX = event.clientX;
        let mouseY = event.clientY;

        for (let i = ships.length - 1; i >= 0; i--) {
            let ship = ships[i];
            if (mouseX >= ship.x && 
                mouseX <= ship.x + ship.width && 
                mouseY >= ship.y && 
                mouseY <= ship.y + ship.height) {
                is_dragging = true;
                current_ship_index = i;
                offsetX = mouseX - ship.x;
                offsetY = mouseY - ship.y;
                // Deselect all other ships
                ships.forEach(s => s.isSelected = false);
                // Select the clicked ship
                ship.isSelected = true;
                draw_scene();
                break;
            }
        }

        if (current_ship_index !== -1) {
            ships[current_ship_index].isSelected = true;
        }
        draw_scene();
    }

    function mouse_up() {
        is_dragging = false;
        current_ship_index = -1;
        ships.forEach(ship => ship.isSelected = false);
        draw_scene();
    }

    function mouse_move(event) {
        if (is_dragging && current_ship_index !== -1) {
            let ship = ships[current_ship_index];
            ship.x = event.clientX - offsetX;
            ship.y = event.clientY - offsetY;
            socket.emit('moveShip', { ...ship, image: { src: ship.image.src } });
            draw_scene();
        }
    }

  function double_click(event) {
        event.preventDefault();
        let mouseX = event.clientX;
        let mouseY = event.clientY;

        for (let i = ships.length - 1; i >= 0; i--) {
            let ship = ships[i];
            if (mouseX >= ship.x && 
                mouseX <= ship.x + ship.width && 
                mouseY >= ship.y && 
                mouseY <= ship.y + ship.height) {
                ship.highlighted = !ship.highlighted;
                draw_scene();
                break;
            }
        }
    }

    function draw_circle_and_numbers_around_ship(ship) {
        context.strokeStyle = stroke_color;
        context.lineWidth = 10;
        context.beginPath();
        let centerX = ship.x + ship.width / 2;
        let centerY = ship.y + ship.height / 2;
        let radius = Math.max(ship.width + 40, ship.height + 40) / 2;
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        context.drawImage(scale_button, centerX + 250, centerY + 100, 35,35);
        context.drawImage(rotate_button, centerX + 250, centerY + 100 + 50, 35,35);
        context.stroke();

        // Draw numbers around the circle
        context.fillStyle = stroke_color;
        context.font = '20px monospace';
        for (let i = 0; i < 360; i += 45) {
            let angle = (i - 90) * Math.PI / 180;
            let textX = centerX - 17 + (radius + 40) * Math.cos(angle);
            let textY = centerY + 8 + (radius + 40) * Math.sin(angle);
            context.fillText(i.toString(), textX, textY);
        }
    }          

    //event listeners for each mouse event
    canvas.addEventListener('mousedown', mouse_down);
    canvas.addEventListener('mouseup', mouse_up);
    canvas.addEventListener('mousemove', mouse_move);
    canvas.addEventListener('dblclick', double_click);
    canvas.addEventListener('input', rotate);
    /* canvas.addEventListener('click', scale); */

    save_canvas();

    load_canvas();

});




