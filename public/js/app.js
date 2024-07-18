const socket = io("http://147.160.11.15:3001/");

//getting the DOM
document.addEventListener("DOMContentLoaded", function () {
  //getting canvas element
  let canvas = document.querySelector("canvas");
  let context = canvas.getContext("2d");
  let ships = [];
  let shipImages = {};
  let is_dragging = false;
  let offsetX = 0;
  let offsetY = 0;
  let current_ship_index = -1;
  let stroke_color = "rgba(98, 207, 245, 0.7)";
  let selectedShip = null;
  let update_ship_hp = 0;
  let a = (2 * Math.PI) / 6;
  let r = 30;

  //set canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let background_image = new Image();
  background_image.src = "../images/backgroundimage/starsr.jpg";

  function save_canvas() {
    const dataURL = canvas.toDataURL();
    localStorage.setItem("savedCanvasData", dataURL);
  }

  function load_canvas() {
    const load_data = localStorage.getItem("savedCanvasData");
    if (load_data) {
      let background_image = new Image();
      background_image.src = load_data;
      background_image.onload = function () {
        context.drawImage(background_image, 0, 0, canvas.width, canvas.height);
        console.log("The canvas has been loaded");
        drawGrid();
      };
    }
  }
   //Hex grid I did not write this function
  function init() {
    background_image.onload = function() {
      context.drawImage(background_image, 0, 0, canvas.width, canvas.height);
      drawGrid(canvas.width, canvas.height);
    }
  }
  init();
  function drawGrid(width, height) {
    for (let y = r; y + r * Math.sin(a) < height; y += r * Math.sin(a)) {
      for (
        let x = r, j = 0;
        x + r * (1 + Math.cos(a)) < width;
        x += r * (1 + Math.cos(a)), y += (-1) ** j++ * r * Math.sin(a)
      ) {
        drawHexagon(x, y);
      }
    }
  }

  function drawHexagon(x, y) {
    context.beginPath();
    for (let i = 0; i < 6; i++) {
      context.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
    }
    context.closePath();
    context.strokeStyle = 'white';
    context.stroke();
  }
  //Hex grid I did not write this function

  socket.on("initialize", (initialShips) => {
    initialShips.forEach((shipData) => {
      let ship_image = new Image();
      ship_image.onload = function () {
        let ship = { ...shipData, image: ship_image };
        ships.push(ship);
        draw_scene();
      };
      ship_image.src = shipData.image.src;
      shipImages[shipData.id] = ship_image;
    });
  });

  window.add_battleship = function () {
    let ship_image = new Image();
    ship_image.src = "images/DiableAvionics/diableavionics_rime_p.png";
    ship_image.onload = function () {
      console.log("Battleship loaded");
      let ship = {
        id: Date.now(),
        type: "Battleship",
        x: 100,
        y: 100,
        width: 115,
        height: 195,
        isSelected: false,
        rotation_angle: 0,
        highlighted: false,
        image: ship_image.src,
        hp: 4,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };

  window.add_frigate = function () {
    let ship_image = new Image();
    ship_image.src = "images/DiableAvionics/diableavionics_hayle.png";
    ship_image.onload = function () {
      console.log("Frigate loaded");
      let ship = {
        id: Date.now(),
        type: "Frigate",
        x: 100,
        y: 100,
        width: 90,
        height: 125,
        isSelected: false,
        highlighted: false,
        rotation_angle: 0,
        image: ship_image.src,
        opacity: 1,
        hp: 2,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };

  window.update_hp = function () {
    update_ship_hp = parseInt(document.getElementById("newShipHP").value);
    if (selectedShip) {
      selectedShip.hp = update_ship_hp;
      socket.emit("updateShipHP", { id: selectedShip.id, hp: selectedShip.hp });
      draw_scene();
    } else {
      alert("No ship was selected to update");
    }
  };

  socket.on("updateShipHP", function (shipData) {
    let index = ships.findIndex((s) => s.id === shipData.id);
    if (index == -1) {
      ships[index].hp = shipData.hp;
      draw_scene();
    }
  });

  socket.on("shipCreated", function (shipData) {
    console.log("Ship created by server");
    let ship_image = new Image();
    ship_image.onload = function () {
      let ship = { ...shipData, image: ship_image };
      ships.push(ship); // Add ship to local array
      shipImages[ship.id] = ship_image;
      draw_scene(); // Draw all ships after adding each one
    };
    ship_image.src = shipData.image;
  });

  socket.on("shipMoved", function (shipData) {
    console.log("Ship moved by server");
    let index = ships.findIndex((ship) => ship.id === shipData.id);
    if (index !== -1) {
      ships[index] = {
        ...ships[index],
        ...shipData,
        image: shipImages[shipData.id],
      };
      draw_scene();
    }
  });

  function draw_scene() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(background_image, 0, 0, canvas.width, canvas.height);
    drawGrid(canvas.width, canvas.height);
    ships.forEach((ship) => {
      context.save();
      context.translate(ship.x + ship.width / 2, ship.y + ship.height / 2);
      context.rotate(ship.rotation_angle);
      context.drawImage(
        shipImages[ship.id],
        -ship.width / 2,
        -ship.height / 2,
        ship.width,
        ship.height
      );
      if (ship.highlighted) {
        draw_circle_and_numbers_around_ship(ship);
      }
      context.restore();
    });
    draw_selected_ship_info();
  }

  function mouse_down(event) {
    event.preventDefault();
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    for (let i = ships.length - 1; i >= 0; i--) {
      let ship = ships[i];
      if (
        mouseX >= ship.x &&
        mouseX <= ship.x + ship.width &&
        mouseY >= ship.y &&
        mouseY <= ship.y + ship.height + 200 
      ) {
        is_dragging = true;
        current_ship_index = i;
        offsetX = mouseX - ship.x;
        offsetY = mouseY - ship.y;
        ships.forEach((s) => (s.isSelected = false));
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
    ships.forEach((ship) => (ship.isSelected = false));
    draw_scene();
  }

  function mouse_move(event) {
    if (is_dragging && current_ship_index !== -1) {
      let ship = ships[current_ship_index];
      ship.x = event.clientX - offsetX;
      ship.y = event.clientY - offsetY;
      socket.emit("moveShip", { ...ship, image: { src: ship.image.src } });
      draw_scene();
    }
  }

  function click(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY - 150;

    let clickedOnShip = false;

    for (let i = ships.length - 1; i >= 0; i--) {
      let ship = ships[i]
      if (
        mouseX >= ship.x + 10 &&
        mouseX <= ship.x + ship.width &&
        mouseY >= ship.y + 10 &&
        mouseY <= ship.y + ship.height + 200 
      ) {
        ship.highlighted = !ship.highlighted;
        selectedShip = ship.highlighted ? ship : null;
        clickedOnShip = true;
        break;
      }
    }

    if (!clickedOnShip) {
      ships.forEach((ship) => (ship.highlighted = false));
      selectedShip = null;
    }

    draw_scene();
  }

  function draw_circle_and_numbers_around_ship(ship) {
    selectedShip = null;
    context.strokeStyle = stroke_color;
    context.lineWidth = 10;
    context.beginPath();
    let radius = Math.max(ship.width + 40, ship.height + 40) / 2;
    context.arc(0, 0, radius, 0, 2 * Math.PI);
    selectedShip = ship;
    context.stroke();

    context.restore();
  }

  function draw_selected_ship_info() {
    if (selectedShip) {
      context.fillStyle = "rgba(37, 37, 37, 0.468)"; "37, 37, 37, 0.468";
      context.font = "30px monospace";
      context.beginPath();
      context.rect(4, 15, 400, 150);
      context.fill();

      context.fillStyle = "white";
      context.fillText(`ID: ${selectedShip.id}`, 10, 50);
      context.fillText(`HP: ${selectedShip.hp}`, 10, 100);
      context.fillText(`Ship Type: ${selectedShip.type}`, 10, 150);
      context.stroke();
    }
  }

  function rotate_click(event) {
    event.preventDefault();
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    for (let i = ships.length - 1; i >= 0; i--) {
      let ship = ships[i];
      if (
        mouseX >= ship.x &&
        mouseX <= ship.x + ship.width &&
        mouseY >= ship.y &&
        mouseY <= ship.y + ship.height + 200 
      ) {
        ship.rotation_angle += Math.PI / 3;
        socket.emit("rotateShip", {
          id: ship.id,
          rotation_angle: ship.rotation_angle,
        });

        draw_scene(); // Redraw the scene with the updated ship rotation
        break;
      }
    }
  }

  console.log(ships);
  canvas.addEventListener("mousedown", mouse_down);
  canvas.addEventListener("mouseup", mouse_up);
  canvas.addEventListener("mousemove", mouse_move);
  canvas.addEventListener("click", click);
  canvas.addEventListener("wheel", rotate_click);

  save_canvas();

  load_canvas();

});
