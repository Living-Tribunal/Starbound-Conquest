console.log('Server starting...');

if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const port = process.env.PORT || 3000
const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const socketio = require('socket.io');
const methodOverride = require('method-override')
let users = [];
let ships = [];
const bcrypt = require('bcrypt');
const initialize_passport = require('./passport-config');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const app = express();
const server = http.createServer(app);
const cors = require('cors');

app.use(express.json({limit: '10mb'}));

const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.set('views', './public/views');
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false, limit: '10mb' }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

const corsOptions = {
    origin: [
        "http://starboundconquest.com",
        "http://www.starboundconquest.com"
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions));

const io = socketio(server, {
    cors: {
        origin: [
            "http://starboundconquest.com",
            "http://www.starboundconquest.com"
        ],
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }
});

initialize_passport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id ===id)
)
console.log('Initializing Passport');

/* let db = new sqlite3.Database('./public/data/game_canvas.db', (err) =>{
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQLite Game Canvas database.');
});

db.close((err) =>{
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
}); */

io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`);

    socket.emit('initialize', ships);

    socket.on('createShip', (ship) => {
        console.log('Ship created');
        let index = ships.findIndex(s => s.id === ship.id);
        if (index === -1) {
            ships.push(ship);   
            io.emit('shipCreated', ship);
        }
    });
    
    socket.on('moveShip', (ship) => {
        let index = ships.findIndex(s => s.id === ship.id);
        if (index !== -1) {
            ships[index] = { ...ships[index], ...ship, image: ships[index].image };
        }
        io.emit('shipMoved', ship);
    });

    socket.on('updateShipHP', (shipData) => {
        let index = ships.findIndex(s => s.id === shipData.id);
        if (index !== -1) {
            ships[index].hp = shipData.hp;
            io.emit('shipHPUpdated', ships[index]);
        }
    });
    
    socket.on('updateShipRotate', (shipData) => {
        let index = ships.findIndex(s => s.id === shipData.id);
        if (index !== -1) {
            ships[index].rotation_angle = shipData.rotation_angle;
            io.emit('shipRotated', ships[index]);
        }
    });

    socket.on('deleteShip', (shipData) => {
        let index = ships.findIndex(ship => ship.id === shipData.id);
        if (index !== -1) {
            ships.splice(index, 1);
            io.emit('shipDeleted', shipData);
        }
    });

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected`);
    });
});

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/', check_authenticated, (req, res) => {
    res.render('index', { name: req.user.name })
  })

app.get('/login', check_not_authenticated, (req, res) => {
    res.render('index') //CHange this to go back to the login
})

app.post('/login', check_not_authenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

console.log(users)

app.post('/register', check_not_authenticated, async (req, res) =>{
    console.log('Register route hit');
    console.log('Request body:', req.body);
    try {
        const hashed_password = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashed_password
        })
        console.log('User registered:', users);
        res.redirect('/login')
    } catch {
        res.redirect('/register')
        console.log("array", users)

    }
})

app.post('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

 app.post('/upload-image', express.json(), (req, res) =>{
    console.log('Received body:', req.body);

    const { image } = req.body;
    if (!image) {
        console.error('No image data was received');
        return res.status(400).json({error: "No Image Data was recieved"});
    }
    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const filePath = path.join(uploadDir, 'canvas-image.png');

    fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
            console.error('Error saving the image:', err);
            return res.status(500).json({error: 'Error saving the image.'});
        }
        console.log('Image saved successfully');
        res.json({message:'Image uploaded successfully.'});
    });
});

function check_authenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function check_not_authenticated(req, res, next){
    if(req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

// Start the HTTP server listening on the specified port
server.listen(port, function(error) {
    if (error){
        console.log('Something went wrong', error);
    } else {
        console.log('Server is listening on port ' + port);
    }
});