export function add_fighter_ge(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Gensoukyou/FM_BBA.png";
  ship_image.onload = function () {
    console.log("Fighter loaded");
    let ship = {
      id: Date.now(),
      type: "Fighter",
      x: 500,
      y: 200,
      width: 81,
      height: 110,
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

export function add_frigate_ge(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Gensoukyou/FM_Aya.png";
  ship_image.onload = function () {
    console.log("Frigate loaded");
    let ship = {
      id: Date.now(),
      type: "Frigate",
      x: 500,
      y: 200,
      width: 148,
      height: 144,
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

export function add_destroyer_ge(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Gensoukyou/FM_Loupgarou.png";
  ship_image.onload = function () {
    console.log("Destroyer loaded");
    let ship = {
      id: Date.now(),
      type: "Destroyer",
      x: 500,
      y: 200,
      width: 110,
      height: 172,
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

export function add_lightcruiser_ge(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Gensoukyou/FM_Egret.png";
  ship_image.onload = function () {
    console.log("Light Cruiser loaded");
    let ship = {
      id: Date.now(),
      type: "Light Cruiser",
      x: 500,
      y: 200,
      width: 132,
      height: 270,
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

export function add_heavycruiser_ge(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Gensoukyou/FM_Miracle.png";
  ship_image.onload = function () {
    console.log("Heavy Cruiser loaded");
    let ship = {
      id: Date.now(),
      type: "Heavy Cruiser",
      x: 500,
      y: 200,
      width: 154,
      height: 246,
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

export function add_carrier_ge(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src ="../images/Gensoukyou/FM_Hearn.png";
  ship_image.onload = function () {
    console.log("Carrier loaded");
    let ship = {
      id: Date.now(),
      type: "Carrier",
      x: 500,
      y: 200,
      width: 196,
      height: 239,
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

export function add_battleship_ge(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Gensoukyou/FM_Konpaku.png";
  ship_image.onload = function () {
    console.log("Battleship loaded");
    let ship = {
      id: Date.now(),
      type: "Battleship",
      x: 500,
      y: 200,
      width: 176,
      height: 280,
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

export function add_dreadnought_ge(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Gensoukyou/FM_Yagokoro.png";
  ship_image.onload = function () {
    console.log("Dreadnought loaded");
    let ship = {
      id: Date.now(),
      type: "Dreadnought",
      x: 500,
      y: 200,
      width: 290,
      height: 400,
      isSelected: false,
      highlighted: false,
      rotation_angle: 0,
      image: ship_image.src,
      globalAlpha: 1,
      maxHP: 10,
      hp: 10,
      hp: 10,
      damageThreshold: 10,
      threatLevel: 15,
      moveDistance: "4 hexes",
      weaponType: "Plasma Torpedos\nRailGuns\nIon Beams",
      firingArc: "Forward(90°)/Port(90°) \nStarboard(90°)/Aft(90°)",
      weaponDamage: "2d8\n2d6\n2d8",
      weaponRange: "50ft\n80ft\n40ft",
      pointValue: 200,
    };
    shipImages[ship.id] = ship_image;
    socket.emit("createShip", ship);
  };
}
