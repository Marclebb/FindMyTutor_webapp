const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const saltRounds = 10;
const app = express();

app.use(express.json());

// CORS configuration with explicit headers
app.use(cors({
    origin: ["http://localhost:5173"], 
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    key: "userid",
    secret: "secretcode78",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24 * 7, // 1 week
    }
}));

// Additional middleware to confirm CORS headers are correctly set
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Database connection
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "fmt_test_database"
});

// User registration route
app.post("/users", (req, res) => {
    const { firstname, lastname, Email, accounttype, password } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error hashing password');
        }
        db.query("INSERT INTO users (firstname, lastname, Email, accounttype, password) VALUES (?, ?, ?, ?, ?)",
            [firstname, lastname, Email, accounttype, hash], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error inserting data into the database');
                }
                res.status(201).send('User added successfully');
            });
    });
});

// Login route with session management
app.post("/login", (req, res) => {
    const { Email, password } = req.body;

    db.query("SELECT * FROM users WHERE Email = ?", [Email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error checking credentials');
        }

        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
                if (response) {
                    req.session.user = result[0]; // Store user info in session
                    res.send({ firstname: result[0].firstname });
                    console.log(req.session.user);
                } else {
                    res.send({ message: "Wrong Email/password, please try again!" });
                }
            });
        } else {
            res.send({ message: "User doesn't exist!" });
        }
    });
});

// Route to check login status
app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
