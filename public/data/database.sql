DROP TABLE IF EXISTS ship_weapon_types;
DROP TABLE IF EXISTS ship_maneuvers;
DROP TABLE IF EXISTS ships;

CREATE TABLE IF NOT EXISTS ships (
  id TEXT PRIMARY KEY,
  shipId TEXT NOT NULL,        
  type TEXT NOT NULL,           
  x INTEGER NOT NULL,
  y INTEGER NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  isSelected BOOLEAN NOT NULL,
  globalAlpha INTEGER NOT NULL,
  rotation_angle INTEGER NOT NULL,
  highlighted BOOLEAN NOT NULL,
  image TEXT,
  maxHP INTEGER DEFAULT NULL,
  hp INTEGER DEFAULT NULL,
  speed INTEGER DEFAULT NULL,
  to_hit INTEGER DEFAULT NULL,
  soak INTEGER DEFAULT NULL,
  capacity_value INTEGER DEFAULT NULL,
  pointValue INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS ship_weapon_types (
  ship_id INTEGER,
  ship_weapon_type TEXT DEFAULT NULL,
  PRIMARY KEY (ship_id, ship_weapon_type),
  FOREIGN KEY (ship_id) REFERENCES ships(id)
);

CREATE TABLE IF NOT EXISTS ship_maneuvers (
  ship_id INTEGER,
  ship_maneuver TEXT DEFAULT NULL,
  PRIMARY KEY (ship_id, ship_maneuver),
  FOREIGN KEY (ship_id) REFERENCES ships(id)
);

CREATE TABLE IF NOT EXISTS planets (
  planet_id INTEGER,
  planet_type TEXT DEFAULT NULL
);
