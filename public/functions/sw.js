export function add_fighter_ms(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Shadow Wing/ms_enlil_red.png";
  ship_image.onload = function () {
    console.log("Fighter loaded");
    let ship = {
      id: Date.now(),
      type: "Fighter",
      x: 500,
      y: 200,
      width: 114,
      height: 87,
      isSelected: false,
      highlighted: false,
      rotation_angle: 0,
      image: ship_image.src,
      globalAlpha: 1,
      maxHP: 1,
      hp: 1,
      damageThreshold: 1,
      threatLevel: 5,
      moveDistance: "14 hexes",
      weaponType: "Laser Cannon",
      firingArc: "Turret(360°)",
      weaponDamage: "1d3",
      weaponRange: "30ft",
      pointValue: 30,
    };
    shipImages[ship.id] = ship_image;
    socket.emit("createShip", ship);
  };
}

export function add_frigate_ms(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Shadow Wing/ms_morningstar_red.png";
  ship_image.onload = function () {
    console.log("Frigate loaded");
    let ship = {
      id: Date.now(),
      type: "Frigate",
      x: 500,
      y: 200,
      width: 116,
      height: 172,
      isSelected: false,
      highlighted: false,
      rotation_angle: 0,
      image: ship_image.src,
      globalAlpha: 1,
      maxHP: 2,
      hp: 2,
      damageThreshold: 2,
      threatLevel: 6,
      moveDistance: "12 hexes",
      weaponType: "Missile Batteries",
      firingArc: "Forward(90°)",
      weaponDamage: "1d6",
      weaponRange: "70ft",
      pointValue: 50,
    };
    shipImages[ship.id] = ship_image;
    socket.emit("createShip", ship);
  };
}

export function add_destroyer_ms(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Shadow Wing/ms_carmine_red.png";
  ship_image.onload = function () {
    console.log("Destroyer loaded");
    let ship = {
      id: Date.now(),
      type: "Destroyer",
      x: 500,
      y: 200,
      width: 256,
      height: 128,
      isSelected: false,
      highlighted: false,
      rotation_angle: 0,
      image: ship_image.src,
      globalAlpha: 1,
      maxHP: 3,
      hp: 3,
      damageThreshold: 3,
      threatLevel: 7,
      moveDistance: "10 hexes",
      weaponType: "Plasma Torpedos",
      firingArc: "Forward(90°)",
      weaponDamage: "1d8",
      weaponRange: "50ft",
      pointValue: 70,
    };
    shipImages[ship.id] = ship_image;
    socket.emit("createShip", ship);
  };
}

export function add_lightcruiser_ms(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Shadow Wing/ms_elysium_red.png";
  ship_image.onload = function () {
    console.log("Light Cruiser loaded");
    let ship = {
      id: Date.now(),
      type: "Light Cruiser",
      x: 500,
      y: 200,
      width: 200,
      height: 280,
      isSelected: false,
      highlighted: false,
      rotation_angle: 0,
      image: ship_image.src,
      globalAlpha: 1,
      maxHP: 4,
      hp: 4,
      damageThreshold: 4,
      threatLevel: 8,
      moveDistance: "10 hexes",
      weaponType: "Dual Laser Cannon",
      firingArc: "Turret(360°)",
      weaponDamage: "2d3",
      weaponRange: "30ft",
      pointValue: 90,
    };
    shipImages[ship.id] = ship_image;
    socket.emit("createShip", ship);
  };
}

export function add_heavycruiser_ms(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Shadow Wing/ms_charybdis_red.png";
  ship_image.onload = function () {
    console.log("Heavy Cruiser loaded");
    let ship = {
      id: Date.now(),
      type: "Heavy Cruiser",
      x: 500,
      y: 200,
      width: 320,
      height: 230,
      isSelected: false,
      highlighted: false,
      rotation_angle: 0,
      image: ship_image.src,
      globalAlpha: 1,
      maxHP: 5,
      hp: 5,
      damageThreshold: 6,
      threatLevel: 9,
      moveDistance: "6 hexes",
      weaponType: "Railguns",
      firingArc: "Portside(90°)/Starboard(90°)",
      weaponDamage: "2d6",
      weaponRange: "80ft",
      pointValue: 120,
    };
    shipImages[ship.id] = ship_image;
    socket.emit("createShip", ship);
  };
}

export function add_carrier_ms(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Shadow Wing/ms_mimir_red.png";
  ship_image.onload = function () {
    console.log("Carrier loaded");
    let ship = {
      id: Date.now(),
      type: "Carrier",
      x: 500,
      y: 200,
      width: 250,
      height: 410,
      isSelected: false,
      highlighted: false,
      rotation_angle: 0,
      image: ship_image.src,
      globalAlpha: 1,
      maxHP: 7,
      hp: 7,
      damageThreshold: 6,
      threatLevel: 9,
      moveDistance: "6 hexes",
      weaponType: "Railguns",
      firingArc: "Portside(90°)/Starboard(90°)",
      weaponDamage: "2d6",
      weaponRange: "80ft",
      pointValue: 120,
    };
    shipImages[ship.id] = ship_image;
    socket.emit("createShip", ship);
  };
}

export function add_battleship_ms(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Shadow Wing/ms_skadi_red.png";
  ship_image.onload = function () {
    console.log("Battleship loaded");
    let ship = {
      id: Date.now(),
      type: "Battleship",
      x: 500,
      y: 200,
      width: 440,
      height: 440,
      isSelected: false,
      rotation_angle: 0,
      highlighted: false,
      image: ship_image.src,
      globalAlpha: 1,
      maxHP: 8,
      hp: 8,
      damageThreshold: 8,
      threatLevel: 12,
      moveDistance: "6 hexes",
      weaponType: "Ion Beams",
      firingArc: "Portside(90°)/Starboard(90°)",
      weaponDamage: "2d8",
      weaponRange: "40ft",
      pointValue: 150,
    };
    shipImages[ship.id] = ship_image;
    socket.emit("createShip", ship);
  };
}

export function add_dreadnought_ms(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Shadow Wing/ms_vardr_red.png";
  ship_image.onload = function () {
    console.log("Dreadnought loaded");
    let ship = {
      id: Date.now(),
      type: "Dreadnought",
      x: 500,
      y: 200,
      width: 310,
      height: 443,
      isSelected: false,
      highlighted: false,
      rotation_angle: 0,
      image: ship_image.src,
      globalAlpha: 1,
      maxHP: 10,
      hp: 10,
      damageThreshold: 10,
      threatLevel: 15,
      moveDistance: "4 hexes",
      weaponType: "Plasma\nTorpedos\nRailGuns\nIon Beams",
      firingArc: "Forward(90°)/Port(90°)\nStarboard(90°)/Aft(90°)",
      weaponDamage: "2d8\n2d6\n2d8",
      weaponRange: "50ft\n80ft\n40ft",
      pointValue: 200,
    };
    shipImages[ship.id] = ship_image;
    socket.emit("createShip", ship);
  };
}
