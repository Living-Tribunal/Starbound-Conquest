console.log("Server starting...");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT || 3000;
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const http = require("http");
const path = require("path");
const User = require("./public/models/user.js");
const fs = require("fs");
const socketio = require("socket.io");
const methodOverride = require("method-override");
let ships = [];
const passport = require("passport");
const local_strategy = require("passport-local");
const flash = require("express-flash");
const session = require("express-session");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const crypto = require("crypto");

app.use(express.json({ limit: "10mb" }));

const sequelize = require("./database");
sequelize.sync().then(() => console.log("Connected to the Users database"));

const dataDir = path.join(__dirname, "public", "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));
app.set("views", "./public/views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(flash());
app.use(
  session({
    secret: "SECRETKEY",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

const corsOptions = {
  origin: ["http://starboundconquest.com", "http://www.starboundconquest.com"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

const io = socketio(server, {
  cors: {
    origin: [
      "http://starboundconquest.com",
      "http://www.starboundconquest.com",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

let db = new sqlite3.Database("./public/data/ship_data.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the SQLite Ships database.");
});

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.emit("initialize", ships);

  socket.on("createShip", (ship) => {
    console.log("Ship created");
    let index = ships.findIndex((s) => s.id === ship.id);
    if (index === -1) {
      ships.push(ship);
      io.emit("shipCreated", ship);
    }
  });

  socket.on("moveShip", (ship) => {
    let index = ships.findIndex((s) => s.id === ship.id);
    if (index !== -1) {
      ships[index] = { ...ships[index], ...ship, image: ships[index].image };
    }
    io.emit("shipMoved", ship);
  });

  socket.on("updateShipHP", (shipData) => {
    let index = ships.findIndex((s) => s.id === shipData.id);
    if (index !== -1) {
      ships[index].hp = shipData.hp;
      io.emit("shipHPUpdated", ships[index]);
    }
  });

  socket.on("updateShipRotate", (shipData) => {
    let index = ships.findIndex((s) => s.id === shipData.id);
    if (index !== -1) {
      ships[index].rotation_angle = shipData.rotation_angle;
      io.emit("shipRotated", ships[index]);
    }
  });

  socket.on("deleteShip", (shipData) => {
    let index = ships.findIndex((ship) => ship.id === shipData.id);
    if (index !== -1) {
      ships.splice(index, 1);
      io.emit("shipDeleted", shipData);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

passport.use(
  new local_strategy(async function verify(username, password, done) {
    try {
      const user = await User.findOne({ where: { username: username } });
      if (!user) {
        return done(null, false, { message: "Incorrect username or password" });
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashed_password) {
          if (err) {
            return done(err);
          }

          if (!crypto.timingSafeEqual(user.password, hashed_password)) {
            return done(null, false, {
              message: "Incorrect username or password",
            });
          }
          return done(null, user);
        }
      );
    } catch (e) {
      return done(e);
    }
  })
);

passport.serializeUser(function (user, done) {
  /* console.log('Serializing user:', user.id); */
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id)
    .then((user) => {
      if (user) {
        /* console.log('Deserializing user:', user); */
        done(null, user);
      } else {
        done(new Error("User not found"));
      }
    })
    .catch((err) => {
      /* console.error('Error in deserializeUser:', err); */
      done(err);
    });
});

//routes to main
app.get("/", function (req, res) {
  if (req.user) {
    res.render("index", { username: req.user.username });
  } else {
    res.redirect("/login");
  }
});

//route to register
app.get("/register", (req, res, next) => {
  const failed = req.query.failed;
  let message = "";
  switch (failed) {
    case "1":
      message = "Something went wrong on our site.";
      break;
    case "2":
      message = "Username is already taken.";
      break;
    case "3":
      message = "Failed to login.";
      break;
  }
  res.render("register", { failed: failed, message: message });
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login?failed=1",
    failureFlash: true,
  })
);

//to login
app.get("/login", (req, res, next) => {
  res.render("login");
});

//registartion
app.post("/register", (req, res, next) => {
  //setting salt
  let salt = crypto.randomBytes(16);
  //hashing passsword
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    "sha256",
    async function (err, hashed_password) {
      //if hashing failes redirect to register
      if (err) {
        res.redirect("/register?failed=1");
      }
      try {
        //create the user
        const user = await User.create({
          username: req.body.username,
          password: hashed_password,
          salt,
        });
        console.log("User created successfully:", user);
        //
        req.login(user, function (err) {
          console.error("Error logging in after registration:", err);
          //if there is a login error after signing up, redirect to login
          if (err) {
            res.redirect("/register?failed=3");
          }
          res.redirect("/");
        });
      } catch (err) {
        console.error("Error during user creation:", err);
        //if creating unique user failes redirect to register
        res.redirect("/register?failed=2");
      }
    }
  );
});

app.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.post("/upload-ship-data", (req, res) => {
  console.log("Received body:", req.body);

  const currentShips = req.body.ships;

  if (!Array.isArray(currentShips)) {
    console.error("Invalid data format received");
    return res.status(400).json({ error: "Invalid data format." });
  }

  db.serialize(() => {
    const currentShipIds = currentShips.map((ship) => ship.id);
    db.run("BEGIN TRANSACTION");

    db.run(
      "DELETE FROM ships WHERE id NOT IN (" +
        currentShipIds.map(() => "?").join(", ") +
        ")",
      currentShipIds,
      (err) => {
        if (err) {
          console.error("Error deleting obsolete ships:", err);
          return db.run("ROLLBACK");
        }

        // Insert/Update ships
        const shipStatement = db.prepare(
          `INSERT OR REPLACE INTO ships (
              id, shipId, type, x, y, width, height, isSelected, highlighted, rotation_angle, image, globalAlpha, maxHP, hp, speed, to_hit, soak, pointValue, capacity_value
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        );

        try {
          currentShips.forEach((ship) => {
            shipStatement.run(
              ship.id,
              ship.shipId,
              ship.type,
              ship.x,
              ship.y,
              ship.width,
              ship.height,
              ship.isSelected ? 1 : 0,
              ship.highlighted ? 1 : 0,
              ship.rotation_angle,
              ship.image,
              ship.globalAlpha,
              ship.maxHP,
              ship.hp,
              ship.speed,
              ship.to_hit,
              ship.soak,
              ship.pointValue,
              ship.capacity_value
            );
          });
        } finally {
          shipStatement.finalize(); // Finalize here, ensuring it is executed regardless of errors
        }

        // Delete obsolete weapon types
        db.run(
          "DELETE FROM ship_weapon_types WHERE ship_id NOT IN (" +
            currentShipIds.map(() => "?").join(", ") +
            ")",
          currentShipIds,
          (err) => {
            if (err) {
              console.error("Error deleting weapon types:", err);
              return db.run("ROLLBACK");
            }

            const weaponTypeStatement = db.prepare(
              `INSERT OR REPLACE INTO ship_weapon_types (ship_id, ship_weapon_type) VALUES (?, ?)`
            );

            try {
              currentShips.forEach((ship) => {
                console.log("Ship ID:", ship.id, "Weapon Types:", ship.weaponTypes);
                
                // Ensure weaponTypes is always an array
                let weaponTypesArray = Array.isArray(ship.weaponTypes) 
                  ? ship.weaponTypes 
                  : ship.weaponTypes.split(',').map(weapon => weapon.trim());
                  console.log("Processed Weapon Types Array:", weaponTypesArray);            
                // Insert each weapon type into the database
                weaponTypesArray.forEach((weaponType) => {
                  weaponTypeStatement.run(ship.id, weaponType);
                });
              });
            } finally {
              weaponTypeStatement.finalize();
            }

            // Delete obsolete maneuvers
            db.run(
              "DELETE FROM ship_maneuvers WHERE ship_id NOT IN (" +
                currentShipIds.map(() => "?").join(",") +
                ")",
              currentShipIds,
              (err) => {
                if (err) {
                  console.error("Error deleting maneuvers:", err);
                  return db.run("ROLLBACK");
                }

                // Insert or update maneuvers
                const maneuverTypeStatement = db.prepare(
                  `INSERT OR REPLACE INTO ship_maneuvers (ship_id, ship_maneuver) VALUES (?, ?)`
                );

                try {
                  currentShips.forEach((ship) => {
                    console.log("Ship ID:", ship.id, "Maneuvers:", ship.maneuvers)
                    let maneuversArray = Array.isArray(ship.maneuvers) 
                    ? ship.maneuvers
                    : ship.maneuvers.split(',').map(maneuver => maneuver.trim());
                    console.log("Processed Weapon Types Array:", maneuversArray);            
                    maneuversArray.forEach((maneuver) => {
                      maneuverTypeStatement.run(ship.id, maneuver);
                    });
                  });
                } finally {
                  maneuverTypeStatement.finalize();
                }

                // Commit the transaction
                db.run("COMMIT", (err) => {
                  if (err) {
                    console.error("Transaction commit error:", err);
                    return res
                      .status(500)
                      .json({ error: "Error committing transaction." });
                  }
                  console.log("Ship Data, weapon types, and Maneuvers Saved Successfully!");
                  return res.json({ message: "Game saved successfully." });
                });
              }
            );
          }
        );
      }
    );
  });
});

app.get("/load-ship-data", (req, res) => {
  const query = `
    SELECT ships.*, 
      GROUP_CONCAT(DISTINCT ship_weapon_types.ship_weapon_type) AS weaponTypes,
      GROUP_CONCAT(DISTINCT ship_maneuvers.ship_maneuver) AS maneuvers
  FROM ships
  LEFT JOIN ship_weapon_types ON ships.id = ship_weapon_types.ship_id
  LEFT JOIN ship_maneuvers ON ships.id = ship_maneuvers.ship_id
  GROUP BY ships.id
`;

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Database query failed" });
      return;
    }
    res.json({ ships: rows });
  });
});

// Start the HTTP server listening on the specified port
server.listen(port, "0.0.0.0", function (error) {
  if (error) {
    console.log("Something went wrong", error);
  } else {
    console.log("Server is listening on port " + port);
  }
});
