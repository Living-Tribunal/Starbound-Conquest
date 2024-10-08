import {
  add_fighter_da,
  add_destroyer_da,
  add_cruiser_da,
  add_carrier_da,
  add_dreadnought_da,
} from "../functions/da.js";

import {
  add_fighter_ge,
  add_destroyer_ge,
  add_cruiser_ge,
  add_carrier_ge,
  add_dreadnought_ge,
} from "../functions/ge.js";

import {
  add_fighter_ne,
  add_destroyer_ne,
  add_cruiser_ne,
  add_carrier_ne,
  add_dreadnought_ne,
} from "../functions/ne.js";

import {
  add_fighter_vo,
  add_destroyer_vo,
  add_cruiser_vo,
  add_carrier_vo,
  add_dreadnought_vo,
} from "../functions/vo.js";

import {
  add_fighter_ms,
  add_destroyer_ms,
  add_cruiser_ms,
  add_carrier_ms,
  add_dreadnought_ms,
} from "../functions/sw.js";

import {
  add_fighter_gr,
  add_destroyer_gr,
  add_cruiser_gr,
  add_carrier_gr,
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

  //markers
  let markers = [];
  let drawingMarker = false;


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
  window.zoom = 1;
  const minZoom = 0.25;
  const maxZoom = 1;
  const zoomStep = 0.1;

  //damage colors
  const full = "rgba(0, 255, 0, 0.25)";
  const yellow = "rgba(255, 255, 0, 0.25)";
  const medium = "rgba(255, 162, 0, 0.25)";
  const empty = "rgba(255, 0, 0, 0.25)";

  //weapon range colors and distanmces
  const lightCannon = "rgba(245, 213, 112, 0.5)"; // Light yellow
  const heavyCannon = "rgba(255, 99, 132, 0.5)"; // Soft red
  const mediumCannon = "rgba(54, 162, 235, 0.5)";  // Light blue
  const plasmaCannon = "rgba(153, 102, 255, 0.5)"; // Light purple
  const railguns = "rgba(255, 159, 64, 0.5)"; // Orange
  const missiles = "rgba(75, 192, 192, 0.5)"; // Aqua green
  const particleBeam = "rgba(201, 203, 207, 0.5)"; // Light gray

  const light = 445;
  const mediumBlaster = 440;
  const heavy = 440;
  const plasma = 890;
  const rail = 1800;
  const rocket = 900;
  const particle = 900;
  const dreadPlasma = 1200;


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
    add_destroyer_da: () => add_destroyer_da(shipImages, socket),
    add_cruiser_da: () => add_cruiser_da(shipImages, socket),
    add_carrier_da: () => add_carrier_da(shipImages, socket),
    add_dreadnought_da: () => add_dreadnought_da(shipImages, socket),
    add_fighter_ge: () => add_fighter_ge(shipImages, socket),
    add_destroyer_ge: () => add_destroyer_ge(shipImages, socket),
    add_cruiser_ge: () => add_cruiser_ge(shipImages, socket),
    add_carrier_ge: () => add_carrier_ge(shipImages, socket),
    add_dreadnought_ge: () => add_dreadnought_ge(shipImages, socket),
    add_fighter_ne: () => add_fighter_ne(shipImages, socket),
    add_destroyer_ne: () => add_destroyer_ne(shipImages, socket),
    add_cruiser_ne: () => add_cruiser_ne(shipImages, socket),
    add_carrier_ne: () => add_carrier_ne(shipImages, socket),
    add_dreadnought_ne: () => add_dreadnought_ne(shipImages, socket),
    add_fighter_vo: () => add_fighter_vo(shipImages, socket),
    add_destroyer_vo: () => add_destroyer_vo(shipImages, socket),
    add_cruiser_vo: () => add_cruiser_vo(shipImages, socket),
    add_carrier_vo: () => add_carrier_vo(shipImages, socket),
    add_dreadnought_vo: () => add_dreadnought_vo(shipImages, socket),
    add_fighter_gr: () => add_fighter_gr(shipImages, socket),
    add_destroyer_gr: () => add_destroyer_gr(shipImages, socket),
    add_cruiser_gr: () => add_cruiser_gr(shipImages, socket),
    add_carrier_gr: () => add_carrier_gr(shipImages, socket),
    add_dreadnought_gr: () => add_dreadnought_gr(shipImages, socket),
    add_fighter_ms: () => add_fighter_ms(shipImages, socket),
    add_destroyer_ms: () => add_destroyer_ms(shipImages, socket),
    add_cruiser_ms: () => add_cruiser_ms(shipImages, socket),
    add_carrier_ms: () => add_carrier_ms(shipImages, socket),
    add_dreadnought_ms: () => add_dreadnought_ms(shipImages, socket),
  });

  window.send_message_discord = function () {
    const request = new XMLHttpRequest();
    request.open(
      "POST",
      "https://discord.com/api/webhooks/1275156315420754085/cQ7B89BpZeboxzagTKFHpacugUT8xaj1qRN6ok68W_m3JBTFfHPX8tIalA-L-waVyvxZ"
    );
    request.setRequestHeader("Content-Type", "application/json");
    const params = {
      username: "Starbound Conquest",
      avatar_url: "",
      content: `${username} has ended their turn.`,
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

          shipData.weaponTypes = shipData.weaponTypes ? shipData.weaponTypes.split(',') : [];
          shipData.maneuvers = shipData.maneuvers ? shipData.maneuvers.split(',') : [];

          let ship_image = new Image();
          ship_image.onload = function () {
            let ship = {
              ...shipData,
              image: ship_image,
              highlighted: false,
              isSelected: false,
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
      switch (ship.type) {
        case "Fighter":
          context.drawImage(fighter, x, y, 48, 48);
          break;
        case "Destroyer":
          context.drawImage(destroyer, x, y, 48, 48);
          break;
        case "Cruiser":
          context.drawImage(light_cruiser, x, y, 48, 48);
          break;
        case "Carrier":
          context.drawImage(carrier, x, y, 48, 48);
          break;
        case "Dreadnought":
          context.drawImage(dreadnought, x, y, 48, 48);
          break;
      }
  }

  function draw_ship(ship) {
    if (!shipImages[ship.id].complete) {
      return;
    }
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

    if (ship.type === "CelestialBodies" /* || ship.type === ship.type */) {
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
      draw_selected_ship_firing_range(ship);
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

      context.strokeStyle = stroke_color;
      context.lineWidth = 10;
      context.strokeRect(0, 0, canvas.width, canvas.height);
    }
    /* drawGrid(); */

    ships.forEach((ship) => {
      draw_ship(ship);
    });

    markers.forEach((marker) => {
      context.fillStyle = full;
      context.beginPath();
      context.lineWidth = 1;
      context.arc(marker.x, marker.y, 30, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
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

  function draw_selected_ship_firing_range(ship) {
        switch (ship.type) {
          case "Fighter":
            context.beginPath();
            context.strokeStyle = lightCannon;
            context.fillStyle = 'transparent';
            context.lineWidth = 5;
            context.arc(0, 0, light, 0, 2 * Math.PI);
            context.stroke();
            context.closePath();
            context.fill();
            break;
          case "Destroyer":
            context.beginPath();
            context.strokeStyle = mediumCannon;
            context.fillStyle = 'transparent';
            context.lineWidth = 5;
            context.arc(0, 0, mediumBlaster, 0, 2 * Math.PI);
            context.stroke();
            context.closePath();
            context.fill();
            break;
          case "Cruiser":
            //heavy blaster
            context.beginPath();
            context.strokeStyle = heavyCannon;
            context.fillStyle = 'transparent';
            context.lineWidth = 5;
            context.arc(0, 0, heavy, 0, 2 * Math.PI);
            context.stroke();
            context.closePath();
            context.fill();
            //plasma cannon
            context.beginPath();
            context.strokeStyle = plasmaCannon;
            context.fillStyle = 'transparent';
            context.lineWidth = 5;
            context.arc(0, 0, plasma, 0, 2 * Math.PI);
            context.stroke();
            context.closePath();
            context.fill();
            break;
          case "Carrier":
            //350 railguns
            context.beginPath();
            context.strokeStyle = railguns;
            context.fillStyle = 'transparent';
            context.lineWidth = 5;
            context.arc(0, 0, rail, 0, 2 * Math.PI);
            context.stroke();
            context.closePath();
            context.fill();
            //missiel launches
            context.beginPath();
            context.strokeStyle = missiles;
            context.fillStyle = 'transparent';
            context.lineWidth = 5;
            context.arc(0, 0, rocket, 0, 2 * Math.PI);
            context.stroke();
            context.closePath();
            context.fill();
          break;
          case "Dreadnought":
            //350 railgun
            context.beginPath();
            context.strokeStyle = railguns;
            context.fillStyle = 'transparent';
            context.lineWidth = 5;
            context.arc(0, 0, rail, 0, 2 * Math.PI);
            context.stroke();
            context.closePath();
            context.fill();
            //plasma cannon
            context.beginPath();
            context.strokeStyle = plasmaCannon;
            context.fillStyle = 'transparent';
            context.lineWidth = 5;
            context.arc(0, 0, dreadPlasma, 0, 2 * Math.PI);
            context.stroke();
            context.closePath();
            context.fill();
            //paRTicle beam
            context.beginPath();
            context.strokeStyle = particleBeam;
            context.fillStyle = 'transparent';
            context.lineWidth = 5;
            context.arc(0, 0, particle, 0, 2 * Math.PI);
            context.stroke();
            context.closePath();
            context.fill();
          break;
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

function draw_zoom_percentage() {
    context.save();
    context.fillStyle = full;
    context.font = "30px monospace";
    context.strokeStyle = full;
    context.lineWidth = 3;
    if (zoom < 1) {
      context.beginPath();
      context.rect(4, 235, 250, 50);
      context.fill();
      context.stroke();
      context.fillStyle = "white";
      context.fillText(`Zoom: ${(zoom * 100).toFixed(0)}%`, 10, 269);
      context.restore();
    }
  }

  function draw_selected_ship_info() {
    if (selectedShip) {
      let maxHP = selectedShip.maxHP;
      let hpPercentage = (selectedShip.hp / maxHP) * 100;
      let angleInDegrees = selectedShip.rotation_angle * (180 / Math.PI);
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

        context.beginPath();
        context.strokeStyle = fillColor;
        context.rect(4, 125, 325, 50);
        context.fillStyle = fillColor;
        context.fill();
        context.stroke();

        context.beginPath();
        context.strokeStyle = fillColor;
        context.rect(4, 180, 325, 50);
        context.fillStyle = fillColor;
        context.fill();
        context.stroke();

        context.fillStyle = "white";
        context.fillText(`Ship Type: ${selectedShip.type}`, 10, 50);
        context.fillText(`${selectedShip.shipId}`, 10, 100);
        context.fillText(`HP: ${selectedShip.hp}`, 10, 157);
        context.fillText(`Ship Rotation: ${angleInDegrees.toFixed(2)}°`, 10, 211);
        context.fillText(`HP: ${selectedShip.weaponTypes}`, 10, 457);
        
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

  document.getElementById("marker").onclick = function () {
    drawingMarker = !drawingMarker;
    if (drawingMarker) {
        document.getElementById("marker").style.backgroundColor = 'gold';
        canvas.addEventListener('click', drawMarker);
        remove_markers();
    } else {
        document.getElementById("marker").style.backgroundColor = 'white';
        canvas.removeEventListener('click', drawMarker);
    }
  };

//drawing markers
function drawMarker(event) {
    let position = getCursorPosition(canvas, event);
    markers.push(position);
    console.log(position);
    draw_scene();
}

function getCursorPosition(canvas, event) {
  const mouseX = (event.clientX - canvas.getBoundingClientRect().left - panX) / zoom;
  const mouseY = (event.clientY - canvas.getBoundingClientRect().top - panY) / zoom;
    return{
        x: mouseX,
        y: mouseY
    };
}

function remove_markers(){
  markers = [];
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
        break;
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

  function radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
}

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
          ship.rotation_angle += Math.PI / 4;
        } else if (event.deltaY < 0) {
          ship.rotation_angle -= Math.PI / 4;
        }

            // Ensure the rotation stays within 0 to 2 * Math.PI radians (0 to 360 degrees)
        if (ship.rotation_angle >= 2 * Math.PI) {
          ship.rotation_angle -= 2 * Math.PI; //wraps back to 0
        } else if (ship.rotation_angle < 0) {
          ship.rotation_angle += 2 * Math.PI; // Wrap back to 360 degrees (2π radians)
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
    zoom = Math.max(minZoom, Math.min(maxZoom, zoom));

    draw_scene();
  });
    load_canvas();
    show_game_value();  
});
