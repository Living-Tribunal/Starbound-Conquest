
export function add_fighter_da(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/DiableAvionics/diableavionics_laminar.png";
    ship_image.onload = function () {
      console.log("Fighter loaded");
      let ship = {
        id: Date.now(),
        type: "Fighter",
        x: 100,
        y: 100,
        width: 46.4,
        height: 57.6,
        isSelected: false,
        highlighted: false,
        rotation_angle: 0,
        image: ship_image.src,
        globalAlpha: 1,
        hp: 1,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };

  export function add_frigate_da(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/DiableAvionics/diableavionics_calm_deck.png";
    ship_image.onload = function () {
      console.log("Frigate loaded");
      let ship = {
        id: Date.now(),
        type: "Frigate",
        x: 100,
        y: 100,
        width: 65.6,
        height: 160.8,
        isSelected: false,
        highlighted: false,
        rotation_angle: 0,
        image: ship_image.src,
        globalAlpha: 1,
        hp: 2,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };

  export function add_destroyer_da(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/DiableAvionics/diableavionics_gust.png";
    ship_image.onload = function () {
      console.log("Destroyer loaded");
      let ship = {
        id: Date.now(),
        type: "Destroyer",
        x: 100,
        y: 100,
        width: 81.6,
        height: 261.6,
        isSelected: false,
        highlighted: false,
        rotation_angle: 0,
        image: ship_image.src,
        globalAlpha: 1,
        hp: 3,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };

  export function add_lightcruiser_da(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/DiableAvionics/diableavionics_minigust.png";
    ship_image.onload = function () {
      console.log("Light Cruiser loaded");
      let ship = {
        id: Date.now(),
        type: "Light Cruiser",
        x: 100,
        y: 100,
        width: 55.2,
        height: 232.8,
        isSelected: false,
        highlighted: false,
        rotation_angle: 0,
        image: ship_image.src,
        globalAlpha: 1,
        hp: 4,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };

  export function add_heavycruiser_da(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/DiableAvionics/diableavionics_rime_p.png";
    ship_image.onload = function () {
      console.log("Heavy Cruiser loaded");
      let ship = {
        id: Date.now(),
        type: "Heavy Cruiser",
        x: 100,
        y: 100,
        width: 137.9,
        height: 228.8,
        isSelected: false,
        highlighted: false,
        rotation_angle: 0,
        image: ship_image.src,
        globalAlpha: 1,
        hp: 5,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };

  export function add_carrier_da(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/DiableAvionics/diableavionics_storm.png";
    ship_image.onload = function () {
      console.log("Carrier loaded");
      let ship = {
        id: Date.now(),
        type: "Carrier",
        x: 100,
        y: 100,
        width: 92,
        height: 246.4,
        isSelected: false,
        highlighted: false,
        rotation_angle: 0,
        image: ship_image.src,
        globalAlpha: 1,
        hp: 7,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };

  export function add_battleship_da(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/DiableAvionics/diableavionics_maelstrom.png";
    ship_image.onload = function () {
      console.log("Battleship loaded");
      let ship = {
        id: Date.now(),
        type: "Battleship",
        x: 100,
        y: 100,
        width: 150.4,
        height: 409.6,
        isSelected: false,
        rotation_angle: 0,
        highlighted: false,
        image: ship_image.src,
        globalAlpha: 1,
        hp: 8,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };


export function add_dreadnought_da(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/DiableAvionics/diableavionics_pandemonium.png";
    ship_image.onload = function () {
      console.log("Dreadnought loaded");
      let ship = {
        id: Date.now(),
        type: "Dreadnought",
        x: 100,
        y: 100,
        width: 284.5,
        height: 488,
        isSelected: false,
        highlighted: false,
        rotation_angle: 0,
        image: ship_image.src,
        globalAlpha: 1,
        hp: 10,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };