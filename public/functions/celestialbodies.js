export function add_planet_azura(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/celestialbodies/azura.png";
    ship_image.onload = function () {
      console.log("Planet loaded");

      // Define the range for random positions
      const canvasWidth = 2559;
      const canvasHeight = 2559;

      // Generate random positions
      let randomX = Math.floor(Math.random() * (canvasWidth - 1000));
      let randomY = Math.floor(Math.random() * (canvasHeight - 1000));
      let randomRotation = Math.floor(Math.random() * (canvasHeight - 1000));

      let ship = {
        id: Date.now(),
        type: "CelestialBodies",
        x: randomX,
        y: randomY,
        width: 1000,
        height: 1000,
        isSelected: false,
        highlighted: false,
        rotation_angle: randomRotation,
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

      // Define the range for random positions
      const canvasWidth = 2559;
      const canvasHeight = 2559;

      // Generate random positions
      let randomX = Math.floor(Math.random() * (canvasWidth - 1000));
      let randomY = Math.floor(Math.random() * (canvasHeight - 1000));
      let randomRotation = Math.floor(Math.random() * (canvasHeight - 1000));

      let ship = {
        id: Date.now(),
        type: "CelestialBodies",
        x: randomX,
        y: randomY,
        width: 1000,
        height: 1000,
        isSelected: false,
        highlighted: false,
        rotation_angle: randomRotation,
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

      // Define the range for random positions
      const canvasWidth = 2559;
      const canvasHeight = 2559;

      // Generate random positions
      let randomX = Math.floor(Math.random() * (canvasWidth - 1000));
      let randomY = Math.floor(Math.random() * (canvasHeight - 1000));
      let randomRotation = Math.floor(Math.random() * (canvasHeight - 1000));


      let ship = {
        id: Date.now(),
        type: "CelestialBodies",
        x: randomX,
        y: randomY,
        width: 1000,
        height: 1000,
        isSelected: false,
        highlighted: false,
        rotation_angle: randomRotation,
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

      // Define the range for random positions
      const canvasWidth = 2559;
      const canvasHeight = 2559;

      // Generate random positions
      let randomX = Math.floor(Math.random() * (canvasWidth - 1000));
      let randomY = Math.floor(Math.random() * (canvasHeight - 1000));
      let randomRotation = Math.floor(Math.random() * (canvasHeight - 1000));

      let ship = {
        id: Date.now(),
        type: "CelestialBodies",
        x: randomX,
        y: randomY,
        width: 1000,
        height: 1000,
        isSelected: false,
        highlighted: false,
        rotation_angle: randomRotation,
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

      // Define the range for random positions
      const canvasWidth = 2559;
      const canvasHeight = 2559;

      // Generate random positions
      let randomX = Math.floor(Math.random() * (canvasWidth - 1000));
      let randomY = Math.floor(Math.random() * (canvasHeight - 1000));
      let randomRotation = Math.floor(Math.random() * (canvasHeight - 1000));

      let ship = {
        id: Date.now(),
        type: "CelestialBodies",
        x: randomX,
        y: randomY,
        width: 1000,
        height: 1000,
        isSelected: false,
        highlighted: false,
        rotation_angle: randomRotation,
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

      // Define the range for random positions
      const canvasWidth = 2559;
      const canvasHeight = 2559;

      // Generate random positions
      let randomX = Math.floor(Math.random() * (canvasWidth - 100));
      let randomY = Math.floor(Math.random() * (canvasHeight - 100));
      let randomRotation = Math.floor(Math.random() * (canvasHeight - 100));

      let ship = {
        id: Date.now(),
        type: "CelestialBodies",
        x: randomX,
        y: randomY,
        width: 58,
        height: 72,
        isSelected: false,
        highlighted: false,
        rotation_angle: randomRotation,
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

      // Define the range for random positions
      const canvasWidth = 2559;
      const canvasHeight = 2559;

      // Generate random positions
      let randomX = Math.floor(Math.random() * (canvasWidth - 478));
      let randomY = Math.floor(Math.random() * (canvasHeight - 241));
      let randomRotation = Math.floor(Math.random() * (canvasHeight - 1000));

      let ship = {
        id: Date.now(),
        type: "CelestialBodies",
        x: randomX,
        y: randomY,
        width: 478,
        height: 241,
        isSelected: false,
        highlighted: false,
        rotation_angle: randomRotation,
        image: ship_image.src,
        globalAlpha: 1,
        maxHP: 1,
        hp: 1,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };
