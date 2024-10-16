const shipTypes = [
    {
      type: "Fighter",
      shipTypeIcon: "../images/icons/rookie_64.png",
      hp: 1,
      toHit: 15,
      soak: 1,
      moveDistance: 80,
      maneuvers: "Full Throttle\nCombine Fire\nEvasive Maneuvers",
      weaponType: "Light Cannon",
      firingArc: "Forward(90°)",
      weaponDamage: "1d4",
      weaponRange: 30,
      pointValue: 1,
      cap:0
    },
    {
      type: "Destroyer",
      shipTypeIcon: "../images/icons/destroyer_64.png",
      hp: 8,
      toHit: 10,
      soak: 4,
      moveDistance: 60,
      maneuvers: "Full Throttle\nAnti-Fighter Barrage\nPower Up Main Guns",
      weaponType: "Medium Cannon",
      firingArc: "Forward(90°)",
      weaponDamage: "1d6",
      weaponRange: 30,
      pointValue: 30,
      cap: 0,
    },
    {
      type: "Cruiser",
      shipTypeIcon: "../images/icons/cruiser_64.png",
      hp: 8,
      toHit: 8,
      soak: 6,
      moveDistance: 50,
      maneuvers: "Full Throttle\nAll Systems Fire\nReinforce Shields\nBroadside" ,
      weaponType: "Heavy Cannon\nPlasma Cannon",
      firingArc: "Forward(90°)\nPort(90°)/Starboard(90°)",
      weaponDamage: "1d8\n1d10",
      weaponRange: "30\n30-60",
      pointValue: 80,
      cap: 0
    },
    {
      type: "Carrier",
      shipTypeIcon: "../images/icons/superCapital_64.png",
      hp: 14,
      toHit: 6,
      soak: 7,
      moveDistance: 40,
      maneuvers:"Full Throttle\nReinforce Shields\nLaunch Fighters\nAll Systems Fire",
      weaponType: "350 Railguns\nMissiles",
      firingArc: "Forward(90°)\nAll(360°)",
      weaponDamage: "1d8\n1d10",
      weaponRange: "30-120\n15-60",
      pointValue: 120,
      cap: 20,
    },
    {
      type: "Dreadnought",
      shipTypeIcon: "../images/icons/titan_64.png",
      hp: 30,
      toHit: 4,
      soak: 8,
      moveDistance: 30,
      maneuvers:"Full Throttle\nReinforce Shields\nLaunch Fighters\nAll Systems Fire\nCharge Ion Beam",
      weaponType: "Ion Particle Beam\nPlasma Cannon\n350 Railgun",
      firingArc: "Forward(90°)\nPort(90°)/Starboard(90°)\nForward(90°)/Aft(90°)",
      weaponDamage: "1d12\n1d10\n1d8",
      weaponRange: "30-60\n60\n30-120",
      pointValue: 240,
      cap: 20
    },
  ],
  selectedShip = document.getElementById("ship-stats"),
  listShip_t = document.querySelector("table#ship-table tbody");

shipTypes.forEach(ship => {
  let row = listShip_t.insertRow()

  row.insertCell().innerHTML = `<img style="height: 64px; width: 64px" src="${ship.shipTypeIcon}" alt="Ship Icon">`;
  row.insertCell().textContent = ship.type;
  row.insertCell().textContent = ship.hp;
  row.insertCell().textContent = ship.toHit;
  row.insertCell().textContent = ship.soak;
  row.insertCell().textContent = ship.moveDistance;
  row.insertCell().textContent = ship.maneuvers;
  row.insertCell().textContent = ship.weaponType;
  row.insertCell().textContent = ship.firingArc;
  row.insertCell().textContent = ship.weaponDamage;
  row.insertCell().textContent = ship.weaponRange;
  row.insertCell().textContent = ship.pointValue;
  row.insertCell().textContent = ship.cap;
});