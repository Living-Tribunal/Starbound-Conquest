
CREATE TABLE IF NOT EXISTS ships (
  id INTEGER PRIMARY KEY,       
  type TEXT NOT NULL,           
  x INTEGER NOT NULL,
  y INTEGER NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  isSelected INTEGER NOT NULL,
  rotation_angle REAL NOT NULL,p
  highlighted INTEGER NOT NULL,
  image TEXT,
  globalAlpha REAL NOT NULL,
  maxHP INTEGER NOT NULL,
  hp INTEGER NOT NULL,
  damageThreshold INTEGER NOT NULL,
  threatLevel INTEGER NOT NULL,
  moveDistance TEXT NOT NULL,
  weaponType: TEXT NOT NULL,
  firingArc: TEXT NOT NULL,
  weaponDamage: TEXT NOT NULL,
  weaponRange: TEXT NOT NULL,
  pointValue: INTEGER NOT NULL,

);