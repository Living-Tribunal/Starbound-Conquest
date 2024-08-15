
CREATE TABLE IF NOT EXISTS ships (
  id INTEGER PRIMARY KEY,       -- Unique identifier for the ship
  type TEXT NOT NULL,           -- Type or class of the ship
  x INTEGER NOT NULL,           -- X-coordinate of the ship's position
  y INTEGER NOT NULL,           -- Y-coordinate of the ship's position
  width INTEGER NOT NULL,       -- Width of the ship
  height INTEGER NOT NULL,      -- Height of the ship
  isSelected INTEGER NOT NULL,  -- Whether the ship is selected (0 or 1)
  rotation_angle REAL NOT NULL, -- Rotation angle of the ship
  highlighted INTEGER NOT NULL, -- Whether the ship is highlighted (0 or 1)
  image TEXT,                   -- URL or path to the ship's image
  globalAlpha REAL NOT NULL,    -- Alpha value (opacity) of the ship
  maxHp INTEGER NOT NULL,      -- Ships MAX HP value
  hp INTEGER NOT NULL           -- Health points of the ship
);
