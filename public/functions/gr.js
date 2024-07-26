
export function add_fighter_gr(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Galactic Constellate/gr_Pleiades_drone.png";
    ship_image.onload = function () {
      console.log("Fighter loaded");
      let ship = {
        id: Date.now(),
        type: "Fighter",
        x: 100,
        y: 100,
        width: 52,
        height: 54,
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

  export function add_frigate_gr(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Galactic Constellate/gr_Xamidimura.png";
    ship_image.onload = function () {
      console.log("Frigate loaded");
      let ship = {
        id: Date.now(),
        type: "Frigate",
        x: 100,
        y: 100,
        width: 108,
        height: 134,
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

  export function add_destroyer_gr(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Galactic Constellate/gr_Algenib.png";
    ship_image.onload = function () {
      console.log("Destroyer loaded");
      let ship = {
        id: Date.now(),
        type: "Destroyer",
        x: 100,
        y: 100,
        width: 100,
        height: 114,
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

  export function add_lightcruiser_gr(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Galactic Constellate/gr_Nunki.png";
    ship_image.onload = function () {
      console.log("Light Cruiser loaded");
      let ship = {
        id: Date.now(),
        type: "Light Cruiser",
        x: 100,
        y: 100,
        width: 148,
        height: 222,
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

  export function add_heavycruiser_gr(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Galactic Constellate/gr_Sadalmelik.png";
    ship_image.onload = function () {
      console.log("Heavy Cruiser loaded");
      let ship = {
        id: Date.now(),
        type: "Heavy Cruiser",
        x: 100,
        y: 100,
        width: 216,
        height: 288,
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

  export function add_carrier_gr(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Galactic Constellate/gr_Sadalsuud.png";
    ship_image.onload = function () {
      console.log("Carrier loaded");
      let ship = {
        id: Date.now(),
        type: "Carrier",
        x: 100,
        y: 100,
        width: 246,
        height: 314,
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

  export function add_battleship_gr(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Galactic Constellate/gr_Kitalpha.png";
    ship_image.onload = function () {
      console.log("Battleship loaded");
      let ship = {
        id: Date.now(),
        type: "Battleship",
        x: 100,
        y: 100,
        width: 327,
        height: 369,
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


export function add_dreadnought_gr(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Galactic Constellate/gr_Alkes.png";
    ship_image.onload = function () {
      console.log("Dreadnought loaded");
      let ship = {
        id: Date.now(),
        type: "Dreadnought",
        x: 100,
        y: 100,
        width: 500,
        height: 313,
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