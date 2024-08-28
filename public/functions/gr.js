
export function add_fighter_gr(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Galactic Constellate/gr_Pleiades_drone.png";
    ship_image.onload = function () {
      console.log("Fighter loaded");
      let ship = {
        id: Date.now(),
        type: "Fighter",
        x: 500,
        y: 200,
        width: 61,
        height: 61,
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

  export function add_frigate_gr(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Galactic Constellate/gr_Xamidimura.png";
    ship_image.onload = function () {
      console.log("Frigate loaded");
      let ship = {
        id: Date.now(),
        type: "Frigate",
        x: 500,
        y: 200,
        width: 108,
        height: 134,
        isSelected: false,
        highlighted: false,
        rotation_angle: 0,
        image: ship_image.src,
        globalAlpha: 1,
        maxHP: 2,
        hp: 2,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };

  export function add_destroyer_gr(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Galactic Constellate/gr_Algenib.png";
    ship_image.onload = function () {
      console.log("Destroyer loaded");
      let ship = {
        id: Date.now(),
        type: "Destroyer",
        x: 500,
        y: 200,
        width: 100,
        height: 114,
        isSelected: false,
        highlighted: false,
        rotation_angle: 0,
        image: ship_image.src,
        globalAlpha: 1,
        maxHP: 3,
        hp: 3,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };

  export function add_lightcruiser_gr(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Galactic Constellate/gr_Nunki.png";
    ship_image.onload = function () {
      console.log("Light Cruiser loaded");
      let ship = {
        id: Date.now(),
        type: "Light Cruiser",
        x: 500,
        y: 200,
        width: 148,
        height: 222,
        isSelected: false,
        highlighted: false,
        rotation_angle: 0,
        image: ship_image.src,
        globalAlpha: 1,
        maxHP: 4,
        hp: 4,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };

  export function add_heavycruiser_gr(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Galactic Constellate/gr_Sadalmelik.png";
    ship_image.onload = function () {
      console.log("Heavy Cruiser loaded");
      let ship = {
        id: Date.now(),
        type: "Heavy Cruiser",
        x: 500,
        y: 200,
        width: 216,
        height: 288,
        isSelected: false,
        highlighted: false,
        rotation_angle: 0,
        image: ship_image.src,
        globalAlpha: 1,
        maxHP: 5,
        hp: 5,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };

  export function add_carrier_gr(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Galactic Constellate/gr_Sadalsuud.png";
    ship_image.onload = function () {
      console.log("Carrier loaded");
      let ship = {
        id: Date.now(),
        type: "Carrier",
        x: 500,
        y: 200,
        width: 246,
        height: 314,
        isSelected: false,
        highlighted: false,
        rotation_angle: 0,
        image: ship_image.src,
        globalAlpha: 1,
        maxHP: 7,
        hp: 7,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };

  export function add_battleship_gr(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Galactic Constellate/gr_Kitalpha.png";
    ship_image.onload = function () {
      console.log("Battleship loaded");
      let ship = {
        id: Date.now(),
        type: "Battleship",
        x: 500,
        y: 200,
        width: 327,
        height: 369,
        isSelected: false,
        rotation_angle: 0,
        highlighted: false,
        image: ship_image.src,
        globalAlpha: 1,
        maxHP: 8,
        hp: 8,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };


export function add_dreadnought_gr(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Galactic Constellate/gr_Alkes.png";
    ship_image.onload = function () {
      console.log("Dreadnought loaded");
      let ship = {
        id: Date.now(),
        type: "Dreadnought",
        x: 500,
        y: 200,
        width: 500,
        height: 313,
        isSelected: false,
        highlighted: false,
        rotation_angle: 0,
        image: ship_image.src,
        globalAlpha: 1,
        maxHP: 10,
        hp: 10,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };