let shipNum = 0;

export function add_fighter_ne(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Neutrino Corp/neutrino_causality.png";
  ship_image.onload = function () {
    console.log("Fighter loaded");
    let ship = {
      id: Date.now(),
      shipId: "FG-ID:" +" " + (++shipNum),
      type: "Fighter",
      x: 500,
      y: 200,
      width: 76,
      height: 102,
      isSelected: false,
      highlighted: false,
      rotation_angle: 0,
      image: ship_image.src,
      globalAlpha: 1,
      maxHP: 1,
      hp: 1,
      speed: 80,
      to_hit: 15,
      soak: 1,
      pointValue: 10,
      capacity_value: 0,
      weaponTypes: ["Light Blaster"],
      maneuvers: ["Full Throttle", "Evasive Maneuvers", "Combine Fire"]
    };
    shipImages[ship.id] = ship_image;
    socket.emit("createShip", ship);
  };
}

export function add_destroyer_ne(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Neutrino Corp/neutrino_lathe.png";
  ship_image.onload = function () {
    console.log("Destroyer loaded");
    let ship = {
      id: Date.now(),
      shipId: "DE-ID:" +" " + (++shipNum),
      type: "Destroyer",
      x: 500,
      y: 200,
      width: 100,
      height: 172,
      isSelected: false,
      highlighted: false,
      rotation_angle: 0,
      image: ship_image.src,
      globalAlpha: 1,
      maxHP: 8,
      hp: 8,
      speed: 60,
      to_hit: 10,
      soak: 1,
      pointValue: 30,
      capacity_value: 0,
      weaponTypes: ["Medium Blaster"],
      maneuvers: ["Full Throttle", "Anti-Fighter Barrage", "Power Up Main Guns"]
    };
    shipImages[ship.id] = ship_image;
    socket.emit("createShip", ship);
  };
}

export function add_cruiser_ne(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Neutrino Corp/neutrino_nirvash.png";
  ship_image.onload = function () {
    console.log("Cruiser loaded");
    let ship = {
      id: Date.now(),
      shipId: "CR-ID:" +" " + (++shipNum),
      type: "Cruiser",
      x: 500,
      y: 200,
      width: 114,
      height: 239,
      isSelected: false,
      highlighted: false,
      rotation_angle: 0,
      image: ship_image.src,
      globalAlpha: 1,
      maxHP: 12,
      hp: 12,
      speed: 50,
      to_hit: 8,
      soak: 6,
      pointValue: 80,
      capacity_value: 0,
      weaponTypes: ["Medium Blaster", "Plasma Cannon"],
      maneuvers: ["Full Throttle", "All Systems Fire", "Reinforce Shields", "Broadside"]
    };
    shipImages[ship.id] = ship_image;
    socket.emit("createShip", ship);
  };
}

export function add_carrier_ne(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Neutrino Corp/neutrino_nausicaa.png";
  ship_image.onload = function () {
    console.log("Carrier loaded");
    let ship = {
      id: Date.now(),
      shipId: "CA-ID:" +" " + (++shipNum),
      type: "Carrier",
      x: 500,
      y: 200,
      width: 160,
      height: 370,
      isSelected: false,
      highlighted: false,
      rotation_angle: 0,
      image: ship_image.src,
      globalAlpha: 1,
      maxHP: 14,
      hp: 14,
      speed: 40,
      to_hit: 7,
      soak: 7,
      pointValue: 120,
      capacity_value: 20,
      weaponTypes: ["350mm Railgun", "Rockets"],
      maneuvers: ["Full Throttle", "All Systems Fire", "Reinforce Shields", "Broadside"]
    };
    shipImages[ship.id] = ship_image;
    socket.emit("createShip", ship);
  };
}

export function add_dreadnought_ne(shipImages, socket) {
  let ship_image = new Image();
  ship_image.src = "../images/Neutrino Corp/neutrino_unsung.png";
  ship_image.onload = function () {
    console.log("Dreadnought loaded");
    let ship = {
      id: Date.now(),
      shipId: "DR-ID:" +" " + (++shipNum),
      type: "Dreadnought",
      x: 500,
      y: 200,
      width: 188,
      height: 591,
      isSelected: false,
      highlighted: false,
      rotation_angle: 0,
      image: ship_image.src,
      globalAlpha: 1,
      maxHP: 30,
      hp: 30,
      speed: 30,
      to_hit: 4,
      soak: 8,
      pointValue: 240,
      capacity_value: 20,
      weaponTypes: ["Plasma Cannon", "350mm Railgun", "Ion Particle Beam"],
      maneuvers: ["Full Throttle", "Reinforce Shields", "All Systems Fire", "Charge Ion Beams"]
    };
    shipImages[ship.id] = ship_image;
    socket.emit("createShip", ship);
  };
}
