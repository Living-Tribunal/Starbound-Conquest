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
  add_planet_moon,
  add_asteroid,
  add_asteroid_field,
} from "../functions/celestialbodies.js";

const socket = io("http://starboundconquest.com:3000");

document.addEventListener("DOMContentLoaded", function () {
  let canvas = document.querySelector("canvas");
  let context = canvas.getContext("2d");

  canvas.width = 5838;
  canvas.height = 2559;

  let ships = [];
  let shipImages = {};
  let totalFleetValue = 0;
  //value for the max fleet size
  let gameFleetValue = 370;

  let is_dragging = false;
  let current_ship_index = -1;
  let stroke_color = "rgba(98, 207, 244, .5)";
  let selectedShip = null;
  let update_ship_hp = 0;

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
  const minZoom = 0.25;
  const maxZoom = 1;
  const zoomStep = 0.1;

  //damage colors
  const full = "rgba(0, 255, 0, 0.25)";
  const yellow = "rgba(0, 255, 255, 0.25)";
  const medium = "rgba(255, 255, 0, 0.25)";
  const empty = "rgba(255, 0, 0, 0.25)";

  const border_color = "rgba(0, 255, 0, 0.25)";

  //offest for dragging the ships
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  //ship icons
  let background_image = new Image();
  let fighter = new Image();
  let frigate = new Image();
  let destroyer = new Image();
  let light_cruiser = new Image();
  let heavy_cruiser = new Image();
  let carrier = new Image();
  let battleship = new Image();
  let dreadnought = new Image();

  background_image.src = "../images/backgroundimage/starfield.png";
  fighter.src = "../images/icons/rookie_64.png";
  frigate.src = "../images/icons/shuttle_64.png";
  destroyer.src = "../images/icons/destroyer_64.png";
  light_cruiser.src = "../images/icons/cruiser_64.png";
  heavy_cruiser.src = "../images/icons/battlecruiser_64.png";
  carrier.src = "../images/icons/superCapital_64.png";
  battleship.src = "../images/icons/battleship_64.png";
  dreadnought.src = "../images/icons/titan_64.png";

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

  /*   document.getElementById("loadButton").addEventListener("click", load_canvas);
  document.getElementById("saveButton").addEventListener("click", save_canvas); */
  console.log("Username from html:", username);

 /*  function send_message_discord() {
    const request = new XMLHttpRequest();
    request.open(
      "POST",
      "https://discord.com/api/webhooks/1275156315420754085/cQ7B89BpZeboxzagTKFHpacugUT8xaj1qRN6ok68W_m3JBTFfHPX8tIalA-L-waVyvxZ"
    );
    request.setRequestHeader("Content-Type", "application/json");
    const params = {
      username: "Starbound Conquest",
      avatar_url: "",
      content: `The game has been saved by ${username}`,
    };
    request.send(JSON.stringify(params));
  } */

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

  //taking out the grid to the gameboard for now. just using measurements for distance
 /* function drawGrid() {
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
  } */

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
      add_ship_value(ship);
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
      draw_scene();
    }
  });

  function select_ship_icons(ship) {
    let y = -ship.height / 4;
    let x = 76;
    if (ship.type != "CelestialBodies")
      switch (ship.type) {
        case "Fighter":
          context.drawImage(fighter, x, y, 48, 48);
          break;
        case "Frigate":
          context.drawImage(frigate, x, y, 48, 48);
          break;
        case "Destroyer":
          context.drawImage(destroyer, x, y, 48, 48);
          break;
        case "Light Cruiser":
          context.drawImage(light_cruiser, x, y, 48, 48);
          break;
        case "Heavy Cruiser":
          context.drawImage(heavy_cruiser, x, y, 48, 48);
          break;
        case "Carrier":
          context.drawImage(carrier, x, y, 48, 48);
          break;
        case "Battleship":
          context.drawImage(battleship, x, y, 48, 48);
          break;
        case "Dreadnought":
          context.drawImage(dreadnought, x, y, 48, 48);
          break;
      }
  }

  function draw_ship(ship) {
    context.save();
    context.translate(
      ship.x + (ship.width * zoomStep) / 2,
      ship.y + (ship.height * zoomStep) / 2
    );
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

    if (ship.type === "CelestialBodies") {
      context.strokeStyle = full;
      context.lineWidth = 3;
      context.strokeRect(
        -ship.width / 2,
        -ship.height / 2,
        ship.width,
        ship.height
      );
    } else {
      if (!ship.highlighted) {
        circles_for_hp(ship);
        select_ship_icons(ship);
      }
    }
    if (ship.highlighted) {
      draw_arc_around_ship(ship);
      /* draw_hex_under_ship(ship); */
    }

    context.restore();
  }

  function draw_scene() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(panX, panY);
    context.scale(zoom, zoom);

    if (background_image) {
      const pattern = context.createPattern(background_image, "repeat");
      context.fillStyle = pattern;
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.strokeStyle = stroke_color;
      context.lineWidth = 3;
      context.strokeRect(0, 0, canvas.width, canvas.height);
    }
    /* drawGrid(); */

    ships.forEach((ship) => {
      draw_ship(ship);
    });

    context.globalAlpha = 1.0;
    context.restore();
    draw_selected_ship_info();
    draw_zoom_percentage();
  }

  function circles_for_hp(ship) {
    let maxHP = ship.maxHP;
    let y = -ship.height / 2;
    let hpPercentage = (ship.hp / maxHP) * 100;
    let fillColor;
    let x = 100;
    if (hpPercentage >= 50) {
      fillColor = full;
      context.beginPath();
      context.arc(x, y, 20, 0, 2 * Math.PI);
      context.fillStyle = fillColor;
      context.lineWidth = 3;
      context.strokeStyle = fillColor;
      context.fill();
      context.stroke();
      context.closePath();
    } else if (hpPercentage < 50 && hpPercentage >= 25) {
      fillColor = medium;
      context.beginPath();
      context.arc(x, y, 20, 0, 2 * Math.PI);
      context.fillStyle = fillColor;
      context.lineWidth = 3;
      context.strokeStyle = fillColor;
      context.fill();
      context.stroke();
      context.closePath();
    } else {
      fillColor = empty;
      context.beginPath();
      context.arc(x, y, 20, 0, 2 * Math.PI);
      context.fillStyle = fillColor;
      context.lineWidth = 3;
      context.strokeStyle = fillColor;
      context.fill();
      context.stroke();
      context.closePath();
    }
  }

  function draw_arc_around_ship(ship) {
    if (ship.type != "CelestialBodies") {
      context.beginPath();
      context.strokeStyle = "transparent"; //right firing angle
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
      context.strokeStyle = "transparent";
      context.fillStyle = front_rear_color;
      context.arc(0, 0, radius2, 0.25 * Math.PI, 0.75 * Math.PI);
      context.stroke();
      context.closePath();
      context.fill();

      context.beginPath();
      context.moveTo(0, 0);
      context.strokeStyle = "transparent"; //left side
      context.fillStyle = sides_color;
      context.arc(0, 0, radius2, 0.75 * Math.PI, 1.25 * Math.PI);
      context.stroke();
      context.closePath();
      context.fill();

      context.beginPath();
      context.moveTo(0, 0);
      context.strokeStyle = "transparent";
      context.fillStyle = front_rear_color;
      context.arc(0, 0, radius2, 1.25 * Math.PI, -0.75);
      context.stroke();
      context.closePath();
      context.fill();
    }
  }

  /* function draw_hex_under_ship(ship) {
    if (ship.type != "CelestialBodies") {
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
  } */

  function draw_zoom_percentage() {
    context.save();
    context.fillStyle = full;
    context.font = "30px monospace";
    context.strokeStyle = full;
    context.lineWidth = 3;
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

      if (hpPercentage >= 75) {
        fillColor = full;
      } else if (hpPercentage >= 50) {
        fillColor = yellow;
      } else if (hpPercentage >= 25){
        fillColor = medium;
      }else{
        fillColor = empty;
      }
      if (selectedShip.type != "CelestialBodies") {
        context.save();
        context.translate(0, 0);
        context.font = "25px monospace";

        context.beginPath();
        context.strokeStyle = fillColor;
        context.rect(4, 15, 325, 50);
        context.fillStyle = fillColor;
        context.fill();
        context.stroke();

        context.beginPath();
        context.strokeStyle = fillColor;
        context.rect(4, 70, 325, 50);
        context.fillStyle = fillColor;
        context.fill();
        context.stroke();

        context.fillStyle = "white";
        context.fillText(`Ship Type: ${selectedShip.type}`, 10, 50);
        context.fillText(`HP: ${selectedShip.hp}`, 10, 100);


        context.restore();
      }
    }
  }

  function show_game_value() {
    const game_value_element = document.getElementById("gameValue");
    game_value_element.textContent = `Total Fleet Value: ${gameFleetValue}`;
  }

  function update_fleet_value() {
    const fleet_value_element = document.getElementById("shipValue");
    fleet_value_element.textContent = `Your Fleet Value: ${totalFleetValue}`;
  }

  function add_ship_value(ship) {
    totalFleetValue += ship.pointValue;
    if (totalFleetValue > gameFleetValue) {
      alert(`Your fleet value is too large. Keep it under: ${gameFleetValue}`);
    }
    console.log(totalFleetValue);
    update_fleet_value();
  }

  function on_mouse_move(event) {
    if (is_dragging && current_ship_index !== -1) {
      let ship = ships[current_ship_index];
      ship.x =
        (event.clientX - canvas.getBoundingClientRect().left - panX) / zoom + dragOffsetX;
      ship.y =
        (event.clientY - canvas.getBoundingClientRect().top - panY) / zoom + dragOffsetY;
      socket.emit("moveShip", { ...ship, image: { src: ship.image.src } });
    } else if (is_panning) {
      panX = event.clientX - startX;
      panY = event.clientY - startY;
    }
    draw_scene();
  }

  canvas.addEventListener("dblclick", (event) => {
    // Get canvas position and adjust mouse coordinates
    const mouseX =
      (event.clientX - canvas.getBoundingClientRect().left - panX) / zoom;
    const mouseY =
      (event.clientY - canvas.getBoundingClientRect().top - panY) / zoom;

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
        //dont go below zero
        totalFleetValue -= ship.pointValue;
        if (totalFleetValue <= 0) {
          totalFleetValue = 0;
        }
        console.log(ships);
        draw_scene();
        update_fleet_value();
        break; // Exit loop after removing the ship
      }
    }
  });

  canvas.addEventListener("mousedown", (event) => {
    const mouseX =
      (event.clientX - canvas.getBoundingClientRect().left - panX) / zoom;
    const mouseY =
      (event.clientY - canvas.getBoundingClientRect().top - panY) / zoom;
    let shipClicked = false;

    for (let i = ships.length - 1; i >= 0; i--) {
      let ship = ships[i];

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
        is_dragging = true;
        current_ship_index = i;
        ships.forEach((s) => (s.isSelected = false));
        ship.isSelected = true;
        ship.highlighted = true;
        shipClicked = true;


        dragOffsetX = ship.x - mouseX;
        dragOffsetY = ship.y - mouseY;
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
    save_canvas();
  });

  canvas.addEventListener("click", (event) => {
    // Calculate mouse position relative to canvas
    const mouseX =
      (event.clientX - canvas.getBoundingClientRect().left - panX) / zoom;
    const mouseY =
      (event.clientY - canvas.getBoundingClientRect().top - panY) / zoom;

    let clickedOnShip = false;

    for (let i = ships.length - 1; i >= 0; i--) {
      let ship = ships[i];

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
    const mouseX =
      (event.clientX - canvas.getBoundingClientRect().left - panX) / zoom;
    const mouseY =
      (event.clientY - canvas.getBoundingClientRect().top - panY) / zoom;

    let shipRotated = false;

    for (let i = ships.length - 1; i >= 0; i--) {
      let ship = ships[i];

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
        //ship rotation increment now its 45deg
        if (event.deltaY > 0) {
          ship.rotation_angle += Math.PI / 3;
        } else if (event.deltaY < 0) {
          ship.rotation_angle -= Math.PI / 3;
        }
        socket.emit("updateShipRotate", {
          id: ship.id,
          rotation_angle: ship.rotation_angle,
        });
        shipRotated = true;
        break;
      }
    }

    if (!shipRotated) {
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

  load_canvas();
  show_game_value();
});
