export function add_planet_azura(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/celestialbodies/azura.png";
    ship_image.onload = function () {
      console.log("Planet loaded");
      let ship = {
        id: Date.now(),
        type: "CelestialBodies",
        x: 500,
        y: 500,
        width: 1000,
        height: 1000,
        isSelected: false,
        highlighted: false,
        rotation_angle: 0,
        image: ship_image.src,
        globalAlpha: 1,
        maxHP: 1,
        hp: 1,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };

  export function add_planet_eldoria(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/celestialbodies/eldoria.png";
    ship_image.onload = function () {
      console.log("Planet loaded");
      let ship = {
        id: Date.now(),
        type: "CelestialBodies",
        x: 500,
        y: 500,
        width: 1000,
        height: 1000,
        isSelected: false,
        highlighted: false,
        rotation_angle: 0,
        image: ship_image.src,
        globalAlpha: 1,
        maxHP: 1,
        hp: 1,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };

  export function add_planet_hesperia(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/celestialbodies/hesperia.png";
    ship_image.onload = function () {
      console.log("Planet loaded");
      let ship = {
        id: Date.now(),
        type: "CelestialBodies",
        x: 500,
        y: 500,
        width: 1000,
        height: 1000,
        isSelected: false,
        highlighted: false,
        rotation_angle: 0,
        image: ship_image.src,
        globalAlpha: 1,
        maxHP: 1,
        hp: 1,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };

  export function add_planet_crysalon(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/celestialbodies/crysalon.png";
    ship_image.onload = function () {
      console.log("Planet loaded");
      let ship = {
        id: Date.now(),
        type: "CelestialBodies",
        x: 500,
        y: 500,
        width: 1000,
        height: 1000,
        isSelected: false,
        highlighted: false,
        rotation_angle: 0,
        image: ship_image.src,
        globalAlpha: 1,
        maxHP: 1,
        hp: 1,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };

  export function add_planet_pyraxis(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/celestialbodies/pyraxis.png";
    ship_image.onload = function () {
      console.log("Planet loaded");
      let ship = {
        id: Date.now(),
        type: "CelestialBodies",
        x: 500,
        y: 500,
        width: 1000,
        height: 1000,
        isSelected: false,
        highlighted: false,
        rotation_angle: 0,
        image: ship_image.src,
        globalAlpha: 1,
        maxHP: 1,
        hp: 1,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };

  export function add_asteroid(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/celestialbodies/asteroid.png";
    ship_image.onload = function () {
      console.log("Asteroid loaded");

      let ship = {
        id: Date.now(),
        type: "CelestialBodies",
        x: 500,
        y: 200,
        width: 58,
        height: 72,
        isSelected: false,
        highlighted: false,
        rotation_angle: 0,
        image: ship_image.src,
        globalAlpha: 1,
        maxHP: 1,
        hp: 1,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };
  export function add_asteroid_field(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/celestialbodies/asteroidfield.png";
    ship_image.onload = function () {
      console.log("Asteroid loaded");

      let ship = {
        id: Date.now(),
        type: "CelestialBodies",
        x: 500,
        y: 200,
        width: 478,
        height: 241,
        isSelected: false,
        highlighted: false,
        rotation_angle: 0,
        image: ship_image.src,
        globalAlpha: 1,
        maxHP: 1,
        hp: 1,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };
