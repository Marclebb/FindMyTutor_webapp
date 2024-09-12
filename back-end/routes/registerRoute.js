const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/database');
const verifyJWT = require('../middleware/verifyJWT');

router.post("/register", (req, res) => {
    const { firstname, lastname, phoneNumber, Email, accounttype, password, profilePicture, Bio } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error hashing password');
        }
        db.query("INSERT INTO users (firstname, lastname, phoneNumber, Email, accounttype, password, profilePicture, Bio) VALUES (?,?,?,?,?,?,?,?)",
            [firstname, lastname, phoneNumber, Email, accounttype, hash, profilePicture, Bio], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error inserting data into the database');
                } else {
                    res.status(201).send('User added successfully');
                }
            });
    });
})

module.exports=router