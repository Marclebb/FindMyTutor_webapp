const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const verifyJWT = require('../middleware/verifyJWT');

const secret = "my_jwt_secret";

router.post("/login", (req, res) => {
    const { Email, password } = req.body;

    db.query("SELECT * FROM users WHERE Email = ?", [Email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error checking credentials');
        }

        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
                if (response) {
                    const token = jwt.sign({ id: result[0].id, role: result[0].accounttype }, secret, { expiresIn: '7d' });
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

router.get("/isUserAuth", verifyJWT, (req, res) => {
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

router.get("/emailexists", (req, res) => {
    const { Email } = req.query;
    db.query("SELECT * FROM users WHERE Email = ?", [Email], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("error fetching email")
        }
        if (result.length > 0) {
            res.send({ exists: true })
        }
        else {
            res.send({ exists: false })
        }
    })
});

router.post("/verify-password", verifyJWT, (req, res) => {
    const { password } = req.body;
    const userId = req.userId;

    db.query("SELECT password FROM users WHERE id = ?", [userId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, isMatch) => {
                if (isMatch) {
                    res.json({ valid: true });
                } else {
                    res.status(401).json({ valid: false, message: "Incorrect password" });
                }
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    });
});

module.exports = router;