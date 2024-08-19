import {
  add_fighter_da,
  add_frigate_da,
  add_destroyer_da,
  add_lightcruiser_da,
  add_heavycruiser_da,
  add_carrier_da,
  add_battleship_da,
  add_dreadnought_da,
} from "../functions/da.js";

import {
  add_fighter_ge,
  add_frigate_ge,
  add_destroyer_ge,
  add_lightcruiser_ge,
  add_heavycruiser_ge,
  add_carrier_ge,
  add_battleship_ge,
  add_dreadnought_ge,
} from "../functions/ge.js";

import {
  add_fighter_ne,
  add_frigate_ne,
  add_destroyer_ne,
  add_lightcruiser_ne,
  add_heavycruiser_ne,
  add_carrier_ne,
  add_battleship_ne,
  add_dreadnought_ne,
} from "../functions/ne.js";

import {
  add_fighter_vo,
  add_frigate_vo,
  add_destroyer_vo,
  add_lightcruiser_vo,
  add_heavycruiser_vo,
  add_carrier_vo,
  add_battleship_vo,
  add_dreadnought_vo,
} from "../functions/vo.js";

import {
  add_fighter_ms,
  add_frigate_ms,
  add_destroyer_ms,
  add_lightcruiser_ms,
  add_heavycruiser_ms,
  add_carrier_ms,
  add_battleship_ms,
  add_dreadnought_ms,
} from "../functions/sw.js";

import {
  add_fighter_gr,
  add_frigate_gr,
  add_destroyer_gr,
  add_lightcruiser_gr,
  add_heavycruiser_gr,
  add_carrier_gr,
  add_battleship_gr,
  add_dreadnought_gr,
} from "../functions/gr.js";

import {
  add_planet_azura,
  add_planet_eldoria,
  add_planet_hesperia,
  add_planet_crysalon,
  add_planet_pyraxis,
  add_asteroid,
  add_asteroid_field,
} from "../functions/celestialbodies.js";

const socket = io("http://starboundconquest.com");

document.addEventListener("DOMContentLoaded", function () {
  let canvas = document.querySelector("canvas");
  let context = canvas.getContext("2d");
  let ships = [];
  let shipImages = {};
  let is_dragging = false;
  let offsetX = 0;
  let offsetY = 0;
  let current_ship_index = -1;
  let stroke_color = "rgba(98, 207, 244)";
  let hex_stroke = "rgba(52, 89, 183)";
  let selectedShip = null;
  let update_ship_hp = 0;
  let numYBottom = 0;
  let numYTop = 0;
  let numXLeft = 0;
  let numXRight = 0;

  //drawing the grid
  let a = (2 * Math.PI) / 6;
  let r = 40;
  let sides_color = "rgba(245, 39, 39, 0.3)";
  let front_rear_color = "rgba(39, 245, 114, 0.3)";

  // Pan variables
  let is_panning = false;
  let panX = 0;
  let panY = 0;
  let startX = 0;
  let startY = 0;

  // Zoom variables
  let zoom = 1;
  const minZoom = 0.5;
  const maxZoom = 1;
  const zoomStep = 0.1;

  //damage colors
  const full = "rgba(0, 255, 0, 0.25)";
  const medium = "rgba(255, 255, 0, 0.25)";
  const empty = "rgba(255, 0, 0, 0.25)";

  Object.assign(window, {
    add_planet_azura: () => add_planet_azura(shipImages, socket),
    add_planet_crysalon: () => add_planet_crysalon(shipImages, socket),
    add_planet_eldoria: () => add_planet_eldoria(shipImages, socket),
    add_planet_hesperia: () => add_planet_hesperia(shipImages, socket),
    add_planet_pyraxis: () => add_planet_pyraxis(shipImages, socket),
    add_asteroid: () => add_asteroid(shipImages, socket),
    add_asteroid_field: () => add_asteroid_field(shipImages, socket),
    add_fighter_da: () => add_fighter_da(shipImages, socket),
    add_frigate_da: () => add_frigate_da(shipImages, socket),
    add_destroyer_da: () => add_destroyer_da(shipImages, socket),
    add_lightcruiser_da: () => add_lightcruiser_da(shipImages, socket),
    add_heavycruiser_da: () => add_heavycruiser_da(shipImages, socket),
    add_battleship_da: () => add_battleship_da(shipImages, socket),
    add_carrier_da: () => add_carrier_da(shipImages, socket),
    add_dreadnought_da: () => add_dreadnought_da(shipImages, socket),
    add_fighter_ge: () => add_fighter_ge(shipImages, socket),
    add_frigate_ge: () => add_frigate_ge(shipImages, socket),
    add_destroyer_ge: () => add_destroyer_ge(shipImages, socket),
    add_lightcruiser_ge: () => add_lightcruiser_ge(shipImages, socket),
    add_heavycruiser_ge: () => add_heavycruiser_ge(shipImages, socket),
    add_battleship_ge: () => add_battleship_ge(shipImages, socket),
    add_carrier_ge: () => add_carrier_ge(shipImages, socket),
    add_dreadnought_ge: () => add_dreadnought_ge(shipImages, socket),
    add_fighter_ne: () => add_fighter_ne(shipImages, socket),
    add_frigate_ne: () => add_frigate_ne(shipImages, socket),
    add_destroyer_ne: () => add_destroyer_ne(shipImages, socket),
    add_lightcruiser_ne: () => add_lightcruiser_ne(shipImages, socket),
    add_heavycruiser_ne: () => add_heavycruiser_ne(shipImages, socket),
    add_battleship_ne: () => add_battleship_ne(shipImages, socket),
    add_carrier_ne: () => add_carrier_ne(shipImages, socket),
    add_dreadnought_ne: () => add_dreadnought_ne(shipImages, socket),
    add_fighter_vo: () => add_fighter_vo(shipImages, socket),
    add_frigate_vo: () => add_frigate_vo(shipImages, socket),
    add_destroyer_vo: () => add_destroyer_vo(shipImages, socket),
    add_lightcruiser_vo: () => add_lightcruiser_vo(shipImages, socket),
    add_heavycruiser_vo: () => add_heavycruiser_vo(shipImages, socket),
    add_battleship_vo: () => add_battleship_vo(shipImages, socket),
    add_carrier_vo: () => add_carrier_vo(shipImages, socket),
    add_dreadnought_vo: () => add_dreadnought_vo(shipImages, socket),
    add_fighter_gr: () => add_fighter_gr(shipImages, socket),
    add_frigate_gr: () => add_frigate_gr(shipImages, socket),
    add_destroyer_gr: () => add_destroyer_gr(shipImages, socket),
    add_lightcruiser_gr: () => add_lightcruiser_gr(shipImages, socket),
    add_heavycruiser_gr: () => add_heavycruiser_gr(shipImages, socket),
    add_battleship_gr: () => add_battleship_gr(shipImages, socket),
    add_carrier_gr: () => add_carrier_gr(shipImages, socket),
    add_dreadnought_gr: () => add_dreadnought_gr(shipImages, socket),
    add_fighter_ms: () => add_fighter_ms(shipImages, socket),
    add_frigate_ms: () => add_frigate_ms(shipImages, socket),
    add_destroyer_ms: () => add_destroyer_ms(shipImages, socket),
    add_lightcruiser_ms: () => add_lightcruiser_ms(shipImages, socket),
    add_heavycruiser_ms: () => add_heavycruiser_ms(shipImages, socket),
    add_battleship_ms: () => add_battleship_ms(shipImages, socket),
    add_carrier_ms: () => add_carrier_ms(shipImages, socket),
    add_dreadnought_ms: () => add_dreadnought_ms(shipImages, socket),
  });

  canvas.width = 2559;
  canvas.height = 2559;

  let background_image = new Image();
  background_image.src = "../images/backgroundimage/starfield.png";

  document.getElementById("loadButton").addEventListener("click", load_canvas);
  document.getElementById("saveButton").addEventListener("click", save_discord);

  function save_discord() {
    send_message_discord();
    save_canvas();
  }

  function send_message_discord(ship) {
    const request = new XMLHttpRequest();
    request.open(
      "POST",
      "https://discord.com/api/webhooks/1275156315420754085/cQ7B89BpZeboxzagTKFHpacugUT8xaj1qRN6ok68W_m3JBTFfHPX8tIalA-L-waVyvxZ"
    );
    request.setRequestHeader("Content-Type", "application/json");
    const params = {
      username: "Starbound Conquest",
      avatar_url: "",
      content: `${ship.type} \nID: ${ship.id} \nwas destroyed`,
    };
    request.send(JSON.stringify(params));
  }

  function save_canvas() {
    const shipState = ships.map((ship) => ({
      ...ship,
      image: ship.image.src,
    }));

    const saveData = {
      ships: shipState,
    };

    fetch("/upload-ship-data", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saveData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.text();
      })
      .then((data) => {
        console.log("Server response:", data);
      })
      .catch((error) => console.error("Error:", error));
  }

  function load_canvas() {
    fetch("/load-ship-data", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Loaded data:", data);

        const shipsData = Array.isArray(data.ships) ? data.ships : [];

        ships = [];
        shipImages = {};

        shipsData.forEach((shipData) => {
          console.log("Processing shipData:", shipData);

          let ship_image = new Image();
          ship_image.onload = function () {
            let ship = {
              ...shipData,
              image: ship_image,
              isSelected: false,
              highlighted: false,
            };
            ships.push(ship);
            shipImages[shipData.id] = ship_image;
            draw_scene();
          };
          ship_image.src = shipData.image;
        });
      })
      .catch((error) => console.error("Error loading ship data:", error));
  }

  function init() {
    background_image.onload = function () {
      const ptrn = context.createPattern(background_image, "repeat");
      context.fillStyle = ptrn;
      context.fillRect(0, 0, canvas.width, canvas.height);
      drawGrid(canvas.width, canvas.height);
    };
  }
  init();

  function drawGrid() {
    context.save();
    for (let y = r; y + r * Math.sin(a) < canvas.height; y += r * Math.sin(a)) {
      for (
        let x = r, j = 0;
        x + r * (1 + Math.cos(a)) < canvas.width;
        x += r * (1 + Math.cos(a)), y += (-1) ** j++ * r * Math.sin(a)
      ) {
        drawHexagon(x, y);
      }
    }
    context.restore();
  }

  function drawHexagon(x, y) {
    context.beginPath();
    for (let i = 0; i < 6; i++) {
      context.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
    }
    context.closePath();
    context.strokeStyle = hex_stroke;
    context.stroke();
  }

  socket.on("initialize", (initialShips) => {
    initialShips.forEach((shipData) => {
      let ship_image = new Image();
      ship_image.onload = function () {
        let ship = {
          ...shipData,
          image: ship_image,
          isSelected: false,
          highlighted: false,
        };
        ships.push(ship);
        draw_scene();
      };
      ship_image.src = shipData.image;
      shipImages[shipData.id] = ship_image;
    });
  });

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

  socket.on("shipHPUpdated", function (shipData) {
    let index = ships.findIndex((s) => s.id === shipData.id);
    if (index !== -1) {
      ships[index].hp = shipData.hp;
      draw_scene();
    }
  });

  socket.on("updateShipRotate", function (shipData) {
    let index = ships.findIndex((s) => s.id === shipData.id);
    if (index !== -1) {
      ships[index].rotation_angle = shipData.rotation_angle;
      draw_scene();
    }
  });

  socket.on("shipCreated", function (shipData) {
    let ship_image = new Image();
    ship_image.onload = function () {
      let ship = {
        ...shipData,
        image: ship_image,
        isSelected: false,
        highlighted: false,
      };
      ships.push(ship);
      console.log(ships);
      shipImages[ship.id] = ship_image;
      draw_scene();
      /* send_message_discord(ship); */
    };
    ship_image.src = shipData.image;
  });

  socket.on("shipMoved", function (shipData) {
    let index = ships.findIndex((ship) => ship.id === shipData.id);
    if (index !== -1) {
      ships[index] = {
        ...ships[index],
        x: shipData.x,
        y: shipData.y,
        rotation_angle: ships[index].rotation_angle,
        image: shipImages[shipData.id],
      };
      draw_scene();
    }
  });

  socket.on("shipRotated", function (shipData) {
    let index = ships.findIndex((s) => s.id === shipData.id);
    if (index !== -1) {
      ships[index].rotation_angle = shipData.rotation_angle;
      draw_scene();
    }
  });

  socket.on("shipDeleted", function (shipData) {
    // Find the index of the ship to delete
    let index = ships.findIndex((ship) => ship.id === shipData.id);
    if (index !== -1) {
      // Remove the ship from the ships array
      ships.splice(index, 1);
      console.log(ships);
      // Remove the ship image from the shipImages object
      delete shipImages[shipData.id];
      // Redraw the scene
      draw_scene();
    }
  });

  function draw_ship(ship) {
    if (!shipImages[ship.id] || !shipImages[ship.id].complete) {
      return;
    }

    context.save();
    context.translate(
      ship.x + (ship.width * zoomStep) / 2,
      ship.y + (ship.height * zoomStep) / 2
    );
    console.log(zoom);
    context.rotate(ship.rotation_angle);

    if (ship.isSelected) {
      context.globalAlpha = 0.25;
    } else {
      context.globalAlpha = 1.0;
    }

    context.drawImage(
      shipImages[ship.id],
      -ship.width / 2,
      -ship.height / 2,
      ship.width,
      ship.height
    );

    // Debug hitbox (optional)
    context.strokeStyle = "red";
    context.lineWidth = 1;
    context.strokeRect(
      -ship.width / 2,
      -ship.height / 2,
      ship.width,
      ship.height
    );

    if (ship.highlighted) {
      draw_hex_around_ship(ship);
    }

    context.restore();
  }

  function draw_scene() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(panX, panY);
    context.scale(zoom, zoom);

    if (background_image.complete) {
      const pattern = context.createPattern(background_image, "repeat");
      context.fillStyle = pattern;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
    drawGrid();

    ships.forEach((ship) => {
      draw_ship(ship);
    });

    context.globalAlpha = 1.0;
    context.restore();
    draw_selected_ship_info();
    draw_zoom_percentage();
  }

  function draw_hex_around_ship(ship) {
    if (ship.type != "CelestialBodies") {
      context.beginPath();
      context.strokeStyle = stroke_color; //right firing angle
      context.fillStyle = sides_color;
      context.lineWidth = 2;
      context.moveTo(0, 0);
      let radius2 = Math.max(ship.width + 40, ship.height + 40) / 2;
      context.arc(0, 0, radius2, -0.75, 0.25 * Math.PI);
      context.stroke();
      context.closePath();
      context.fill();

      context.beginPath();
      context.moveTo(0, 0); //rear firing angle
      context.strokeStyle = stroke_color;
      context.fillStyle = front_rear_color;
      context.arc(0, 0, radius2, 0.25 * Math.PI, 0.75 * Math.PI);
      context.stroke();
      context.closePath();
      context.fill();

      context.beginPath();
      context.moveTo(0, 0);
      context.strokeStyle = stroke_color; //left side
      context.fillStyle = sides_color;
      context.arc(0, 0, radius2, 0.75 * Math.PI, 1.25 * Math.PI);
      context.stroke();
      context.closePath();
      context.fill();

      context.beginPath();
      context.moveTo(0, 0);
      context.strokeStyle = stroke_color;
      context.fillStyle = front_rear_color;
      context.arc(0, 0, radius2, 1.25 * Math.PI, -0.75);
      context.stroke();
      context.closePath();
      context.fill();

      context.beginPath();
      context.strokeStyle = stroke_color;
      context.lineWidth = 5;
      let radius = Math.max(40, 40) / 2 + 20;
      for (let i = 0; i < 6; i++) {
        let x = -25 + 50 / 2 + radius * Math.cos(a * i);
        let y = -25 + 50 / 2 + radius * Math.sin(a * i);
        if (i === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }
      context.closePath();
      context.stroke();
    }
  }

  function draw_zoom_percentage() {
    context.save();
    context.fillStyle = "rgba(37, 37, 37, 0.7)";
    context.font = "30px monospace";
    context.strokeStyle = stroke_color;
    context.lineWidth = 2;
    if (zoom < 1) {
      context.beginPath();
      context.rect(4, 170, 200, 50);
      context.fill();
      context.stroke();
      context.fillStyle = "white";
      context.fillText(`Zoom: ${(zoom * 100).toFixed(0)}%`, 10, 205);
      context.restore();
    }
  }

  function draw_selected_ship_info() {
    if (selectedShip) {
      let maxHP = selectedShip.maxHP;
      let hpPercentage = (selectedShip.hp / maxHP) * 100;
      let fillColor;

      if (hpPercentage >= 50) {
        fillColor = full;
      } else if (hpPercentage > 0) {
        fillColor = medium;
      } else {
        fillColor = empty;
        /* send_message_discord(selectedShip); */
      }
      if (selectedShip.type != "CelestialBodies") {
        context.save();
        context.translate(0, 0);
        context.fillStyle = "rgba(37, 37, 37, 0.7)";
        context.font = "30px monospace";
        context.lineWidth = 7;

        context.beginPath();
        context.strokeStyle = fillColor;
        context.rect(4, 15, 400, 150);
        context.fillStyle = fillColor;
        context.fill();
        context.stroke();

        context.fillStyle = "white";
        context.fillText(`ID: ${selectedShip.id}`, 10, 50);
        context.fillText(`HP: ${selectedShip.hp}`, 10, 100);
        context.fillText(`Ship Type: ${selectedShip.type}`, 10, 150);

        context.restore();
      }
    }
  }

  function on_mouse_move(event) {
    if (is_dragging && current_ship_index !== -1) {
      let ship = ships[current_ship_index];
      ship.x = (event.clientX - canvas.getBoundingClientRect().left - panX) / zoom;
      ship.y = (event.clientY - canvas.getBoundingClientRect().top - panY) / zoom;
      socket.emit("moveShip", { ...ship, image: { src: ship.image.src } });
    } else if (is_panning) {
      panX = event.clientX - startX;
      panY = event.clientY - startY;
    }
    draw_scene();
  }

  canvas.addEventListener("dblclick", (event) => {
    // Get canvas position and adjust mouse coordinates
    const mouseX = (event.clientX - canvas.getBoundingClientRect().left - panX) / zoom;
    const mouseY = (event.clientY - canvas.getBoundingClientRect().top - panY) / zoom;

    for (let i = ships.length - 1; i >= 0; i--) {
      const ship = ships[i];

      // Calculate ship bounding box
      const shipLeft = ship.x - ship.width / 2;
      const shipRight = ship.x + ship.width / 2;
      const shipTop = ship.y - ship.height / 2;
      const shipBottom = ship.y + ship.height / 2;

      if (
        mouseX >= shipLeft &&
        mouseX <= shipRight &&
        mouseY >= shipTop &&
        mouseY <= shipBottom
      ) {
        // Remove the ship from the array
        ship.highlighted = false;
        selectedShip = null;
        socket.emit("deleteShip", { id: ship.id });
        ships.splice(i, 1);
        console.log(ships);
        draw_scene();
        break; // Exit loop after removing the ship
      }
    }
  });

  canvas.addEventListener("mousedown", (event) => {
    // Calculate mouse position relative to canvas
    const mouseX = (event.clientX - canvas.getBoundingClientRect().left - panX) / zoom;
    const mouseY = (event.clientY - canvas.getBoundingClientRect().top - panY) / zoom;
    let shipClicked = false;

    // Loop through ships to detect if any are clicked
    for (let i = ships.length - 1; i >= 0; i--) {
      let ship = ships[i];

      // Calculate ship bounding box
      const shipLeft = ship.x - ship.width / 2;
      const shipRight = ship.x + ship.width / 2;
      const shipTop = ship.y - ship.height / 2;
      const shipBottom = ship.y + ship.height / 2;

      if (
        mouseX >= shipLeft &&
        mouseX <= shipRight &&
        mouseY >= shipTop &&
        mouseY <= shipBottom &&
        ship.type != "CelestialBodies"
      ) {
        is_dragging = true;
        current_ship_index = i;

        // Calculate offsets for dragging
        offsetX = (mouseX - ship.x) * zoom;
        offsetY = (mouseY - ship.y) * zoom;

        // Update selection and highlight
        ships.forEach((s) => (s.isSelected = false));
        ship.isSelected = true;
        ship.highlighted = true;
        shipClicked = true;
        break;
      }
    }

    if (!shipClicked) {
      is_panning = true;
      startX = event.clientX - panX;
      startY = event.clientY - panY;
    }

    canvas.addEventListener("mousemove", on_mouse_move);
    draw_scene();
  });

  canvas.addEventListener("mouseup", () => {
    is_dragging = false;
    is_panning = false;
    canvas.removeEventListener("mousemove", on_mouse_move);
    if (current_ship_index !== -1) {
      ships[current_ship_index].isSelected = false;
      current_ship_index = -1;
    }
    draw_scene();
  });

  canvas.addEventListener("click", (event) => {
    // Calculate mouse position relative to canvas
    const mouseX =
      (event.clientX - canvas.getBoundingClientRect().left - panX) / zoom;
    const mouseY =
      (event.clientY - canvas.getBoundingClientRect().top - panY) / zoom;

    let clickedOnShip = false;

    // Loop through ships to check if any are clicked
    for (let i = ships.length - 1; i >= 0; i--) {
      let ship = ships[i];

      // Calculate ship bounding box
      const shipLeft = ship.x - ship.width / 2;
      const shipRight = ship.x + ship.width / 2;
      const shipTop = ship.y - ship.height / 2;
      const shipBottom = ship.y + ship.height / 2;

      if (
        mouseX >= shipLeft &&
        mouseX <= shipRight &&
        mouseY >= shipTop &&
        mouseY <= shipBottom
      ) {
        ship.highlighted = true;
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
  });

  canvas.addEventListener("wheel", (event) => {
    event.preventDefault();

    // Calculate mouse position relative to canvas
    const rect = canvas.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left - panX) / zoom;
    const mouseY = (event.clientY - rect.top - panY) / zoom;

    let shipRotated = false;

    // Loop through ships to check if any are under the mouse
    for (let i = ships.length - 1; i >= 0; i--) {
      let ship = ships[i];

      // Calculate ship bounding box
      const shipLeft = ship.x - ship.width / 2;
      const shipRight = ship.x + ship.width / 2;
      const shipTop = ship.y - ship.height / 2;
      const shipBottom = ship.y + ship.height / 2;

      if (
        mouseX >= shipLeft &&
        mouseX <= shipRight &&
        mouseY >= shipTop &&
        mouseY <= shipBottom &&
        ship.type != "CelestialBodies"
      ) {
        if (event.deltaY > 0) {
          ship.rotation_angle += Math.PI / 4;
        } else if (event.deltaY < 0) {
          ship.rotation_angle -= Math.PI / 4;
        }
        socket.emit("updateShipRotate", {
          id: ship.id,
          rotation_angle: ship.rotation_angle,
        });
        shipRotated = true;
        break; // Exit loop after rotating the ship
      }
    }

    if (!shipRotated) {
      // Zoom in or out if no ship is under the mouse
      if (event.deltaY < 0 && zoom < maxZoom) {
        zoom += zoomStep;
      } else if (event.deltaY > 0 && zoom > minZoom) {
        zoom -= zoomStep;
      }
    }

    // Clamp zoom to min/max values
    zoom = Math.max(minZoom, Math.min(maxZoom, zoom));

    draw_scene();
  });
});
