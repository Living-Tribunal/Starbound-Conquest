let shipNum = 0;

export function add_fighter_ms(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Shadow Wing/ms_enlil_red.png";
  ship_image.onload = function () {
    console.log("Fighter loaded");
    let ship = {
      id: Date.now(),
      shipId: "FG-ID:" +" " + new Date().getMilliseconds(5),
      type: "Fighter",
      x: 500,
      y: 200,
      prevX: 0,
      prevY: 0,
      width: 114,
      height: 87,
      isSelected: false,
      highlighted: false,
      isToggled: false,
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
      pointValue: 1,
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
      shipId: "DE-ID:" +" " + new Date().getMilliseconds(5),
      type: "Destroyer",
      x: 500,
      y: 200,
      prevX: 0,
      prevY: 0,
      width: 256,
      height: 128,
      isSelected: false,
      highlighted: false,
      isToggled: false,
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

export function add_cruiser_ms(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Shadow Wing/ms_elysium_red.png";
  ship_image.onload = function () {
    console.log("Cruiser loaded");
    let ship = {
      id: Date.now(),
      shipId: "CR-ID:" +" " + new Date().getMilliseconds(5),
      type: "Cruiser",
      x: 500,
      y: 200,
      prevX: 0,
      prevY: 0,
      width: 200,
      height: 280,
      isSelected: false,
      highlighted: false,
      isToggled: false,
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

export function add_carrier_ms(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Shadow Wing/ms_mimir_red.png";
  ship_image.onload = function () {
    console.log("Carrier loaded");
    let ship = {
      id: Date.now(),
      shipId: "CA-ID:" +" " + new Date().getMilliseconds(5),
      type: "Carrier",
      x: 500,
      y: 200,
      prevX: 0,
      prevY: 0,
      width: 250,
      height: 410,
      isSelected: false,
      highlighted: false,
      isToggled: false,
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

export function add_dreadnought_ms(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Shadow Wing/ms_vardr_red.png";
  ship_image.onload = function () {
    console.log("Dreadnought loaded");
    let ship = {
      id: Date.now(),
      shipId: "DR-ID:" +" " + new Date().getMilliseconds(5),
      type: "Dreadnought",
      x: 500,
      y: 200,
      prevX: 0,
      prevY: 0,
      width: 310,
      height: 443,
      isSelected: false,
      highlighted: false,
      isToggled: false,
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
