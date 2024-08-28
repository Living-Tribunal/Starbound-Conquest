
export function add_fighter_vo(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Volantian/metatron.png";
    ship_image.onload = function () {
      console.log("Fighter loaded");
      let ship = {
        id: Date.now(),
        type: "Fighter",
        x: 500,
        y: 200,
        width: 112,
        height: 98,
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

  export function add_frigate_vo(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Volantian/glint.png";
    ship_image.onload = function () {
      console.log("Frigate loaded");
      let ship = {
        id: Date.now(),
        type: "Frigate",
        x: 500,
        y: 200,
        width: 128,
        height: 93,
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

  export function add_destroyer_vo(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Volantian/medusa_vri.png";
    ship_image.onload = function () {
      console.log("Destroyer loaded");
      let ship = {
        id: Date.now(),
        type: "Destroyer",
        x: 500,
        y: 200,
        width: 160,
        height: 247,
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

  export function add_lightcruiser_vo(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Volantian/pyralis_vri.png";
    ship_image.onload = function () {
      console.log("Light Cruiser loaded");
      let ship = {
        id: Date.now(),
        type: "Light Cruiser",
        x: 500,
        y: 200,
        width: 216,
        height: 260,
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

  export function add_heavycruiser_vo(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Volantian/curator.png";
    ship_image.onload = function () {
      console.log("Heavy Cruiser loaded");
      let ship = {
        id: Date.now(),
        type: "Heavy Cruiser",
        x: 500,
        y: 200,
        width: 132,
        height: 280,
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

  export function add_carrier_vo(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Volantian/Caelum.png";
    ship_image.onload = function () {
      console.log("Carrier loaded");
      let ship = {
        id: Date.now(),
        type: "Carrier",
        x: 500,
        y: 200,
        width: 216,
        height: 260,
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

  export function add_battleship_vo(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Volantian/ionos_vri.png";
    ship_image.onload = function () {
      console.log("Battleship loaded");
      let ship = {
        id: Date.now(),
        type: "Battleship",
        x: 500,
        y: 200,
        width: 154,
        height: 286,
        isSelected: false,
        rotation_angle: 0,
        highlighted: false,
        image: "http://starboundconquest.com/images/Volantian/Caelum.png",
        globalAlpha: 1,
        maxHP: 8,
        hp: 8,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };


export function add_dreadnought_vo(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/Volantian/radiant_vri.png";
    ship_image.onload = function () {
      console.log("Dreadnought loaded");
      let ship = {
        id: Date.now(),
        type: "Dreadnought",
        x: 500,
        y: 200,
        width: 316,
        height: 324,
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