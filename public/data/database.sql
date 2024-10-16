DROP TABLE IF EXISTS ships;
CREATE TABLE IF NOT EXISTS ships (
  id INTEGER PRIMARY KEY,
  shipId TEXT NOT NULL,     
  type TEXT NOT NULL,           
  x INTEGER NOT NULL,
  y INTEGER NOT NULL,
  prevX INTEGER NULL,
  prevY INTEGER NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  isSelected INTEGER NOT NULL,
  isToggled BOOLEAN NOT NULL,
  rotation_angle REAL NOT NULL,
  highlighted INTEGER NOT NULL,
  image TEXT,
  globalAlpha REAL NOT NULL,
  maxHP INTEGER NOT NULL,
  hp INTEGER NOT NULL,
  damageThreshold INTEGER NOT NULL,
  threatLevel INTEGER NOT NULL,
  moveDistance TEXT NOT NULL,
  weaponType TEXT NOT NULL,
  firingArc TEXT NOT NULL,
  weaponDamage TEXT NOT NULL,
  weaponRange TEXT NOT NULL,
  pointValue INTEGER NOT NULL

);