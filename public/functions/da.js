
export function add_dreadnought(shipImages, socket) {
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
        hp: 2,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };

  export function add_battleship(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/DiableAvionics/diableavionics_rime_p.png";
    ship_image.onload = function () {
      console.log("Battleship loaded");
      let ship = {
        id: Date.now(),
        type: "Battleship",
        x: 500,
        y: 500,
        width: 137.9,
        height: 228.8,
        isSelected: false,
        rotation_angle: 0,
        highlighted: false,
        image: ship_image.src,
        globalAlpha: 1,
        hp: 4,
      };
      shipImages[ship.id] = ship_image;
      socket.emit("createShip", ship);
    };
  };

  export function add_frigate(shipImages, socket) {
    let ship_image = new Image();
    ship_image.src = "../images/DiableAvionics/diableavionics_hayle.png";
    ship_image.onload = function () {
      console.log("Frigate loaded");
      let ship = {
        id: Date.now(),
        type: "Frigate",
        x: 100,
        y: 100,
        width: 108.8,
        height: 149.6,
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