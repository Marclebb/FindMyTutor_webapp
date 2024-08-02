const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "fmt_test_database"
});

const secret = "your_jwt_secret"; // Replace with your own secret

app.post("/users", (req, res) => {
    const { firstname, lastname, Email, accounttype, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.log(err);
        }
        db.query("INSERT into users (firstname, lastname, Email, accounttype, password) VALUES (?,?,?,?,?)",
            [firstname, lastname, Email, accounttype, hash], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error inserting data into the database');
                } else {
                    res.status(201).send('User added successfully');
                }
            });
    });
});

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
                    const token = jwt.sign({ id: result[0].id }, secret, { expiresIn: '7d' });
                    res.json({ auth: true, token: token, user: result[0] });
                } else {
                    res.send({ message: "Wrong Email/password , please try again!" });
                }
            });
        } else {
            res.send({ message: "User doesn't exist! " });
        }
    });
});

// Middleware to verify JWT
const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        res.send({ auth: false, message: "No token provided." });
    } else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.send({ auth: false, message: "Failed to authenticate token." });
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
};

app.get("/isUserAuth", verifyJWT, (req, res) => {
    db.query("SELECT * FROM users WHERE id = ?", [req.userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching user data');
        }

        if (result.length > 0) {
            res.send({ auth: true, user: result[0] });
        } else {
            res.send({ auth: false, message: "User doesn't exist! " });
        }
    });
});

app.get("/emailexists",(req,res)=>{
    const {Email}=req.query;
    db.query("SELECT * FROM users WHERE Email= ?",[Email],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).send("error fetching email")
        }
        if(result.length > 0){
            res.send({exists:true})
        }
        else{
            res.send({exists:false})
        }
    })
})

app.listen(3001, () => {
    console.log("Server running on port 3001");
});

