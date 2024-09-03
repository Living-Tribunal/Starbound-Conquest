const shipTypes = [
    {
      type: "Fighter",
      hp: 1,
      damageThreshold: 1,
      threatLevel: 5,
      moveDistance: "14 hexes",
      weaponType: "Laser Cannon",
      firingArc: "Turret(360°)",
      weaponDamage: "1d3",
      weaponRange: "30ft",
      pointValue: 30,
    },
    {
      type: "Frigate",
      hp: 2,
      damageThreshold: 2,
      threatLevel: 6,
      moveDistance: "12 hexes",
      weaponType: "Missile Batteries",
      firingArc: "Forward(90°)",
      weaponDamage: "1d6",
      weaponRange: "70ft",
      pointValue: 50,
    },
    {
      type: "Destroyer",
      hp: 3,
      damageThreshold: 3,
      threatLevel: 7,
      moveDistance: "10 hexes",
      weaponType: "Plasma Torpedos",
      firingArc: "Forward(90°)",
      weaponDamage: "1d8",
      weaponRange: "50ft",
      pointValue: 70,
    },
    {
      type: "Light Cruiser",
      hp: 4,
      damageThreshold: 4,
      threatLevel: 8,
      moveDistance: "10 hexes",
      weaponType: "Dual Laser Cannon",
      firingArc: "Turret(360°)",
      weaponDamage: "2d3",
      weaponRange: "30ft",
      pointValue: 90,
    },
    {
      type: "Heavy Cruiser",
      hp: 5,
      damageThreshold: 6,
      threatLevel: 9,
      moveDistance: "6 hexes",
      weaponType: "Railguns",
      firingArc: "Portside(90°)/Starboard(90°)",
      weaponDamage: "2d6",
      weaponRange: "80ft",
      pointValue: 120,
    },
    {
      type: "Carrier",
      hp: 7,
      damageThreshold: 7,
      threatLevel: 10,
      moveDistance: "6 hexes",
      weaponType: "Railguns",
      firingArc: "Portside(90°)/Starboard(90°)",
      weaponDamage: "2d6",
      weaponRange: "80ft",
      pointValue: 120,
    },
    {
      type: "Battleship",
      hp: 8,
      damageThreshold: 8,
      threatLevel: 12,
      moveDistance: "6 hexes",
      weaponType: "Ion Beams",
      firingArc: "Portside(90°)/Starboard(90°)",
      weaponDamage: "2d8",
      weaponRange: "40ft",
      pointValue: 150,
    },
    {
      type: "Dreadnought",
      hp: 10,
      damageThreshold: 10,
      threatLevel: 15,
      moveDistance: "4 hexes",
      weaponType: "Plasma Torpedos \nRailGuns \nIon Beams",
      firingArc: "Forward(90°)\nPort(90°)/Starboard(90°)\nPort(90°)/Starboard(90°)",
      weaponDamage: "2d8\n2d6\n2d8",
      weaponRange: "50ft\n80ft\n40ft",
      pointValue: 200,
    },
  ],
  selectedShip = document.getElementById("ship-stats"),
  listShip_t = document.querySelector("table#ship-table tbody");

shipTypes.forEach(ship => {
  let row = listShip_t.insertRow()

  row.insertCell().textContent = ship.type;
  row.insertCell().textContent = ship.hp;
  row.insertCell().textContent = ship.damageThreshold;
  row.insertCell().textContent = ship.threatLevel;
  row.insertCell().textContent = ship.moveDistance;
  row.insertCell().textContent = ship.weaponType;
  row.insertCell().textContent = ship.firingArc;
  row.insertCell().textContent = ship.weaponDamage;
  row.insertCell().textContent = ship.weaponRange;
  row.insertCell().textContent = ship.pointValue;
});