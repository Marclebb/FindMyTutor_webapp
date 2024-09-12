const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/database');
const verifyJWT = require('../middleware/verifyJWT');


/*router.post("/register", (req, res) => {
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
});*/


router.get("/profile", verifyJWT, (req, res) => {
    const userId = req.userId;
    db.query("SELECT * FROM users WHERE id = ?", [userId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database error." });
        }
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: "User not found." });
        }
    });
});

router.patch("/EditProfile", verifyJWT, (req, res) => {
    const { phoneNumber, Bio, profilePicture } = req.body
    const userid = req.userId
    db.query("UPDATE users SET phoneNumber=?, Bio=?, profilePicture=? WHERE id=?",
        [phoneNumber, Bio, profilePicture, userid], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error inserting data into the database');
            } else {
                res.status(201).send('info modified successfully');
            }
        })
});

router.delete("/deleteprofile", verifyJWT, (req, res) => {
    const userid = req.userId;
    db.query("DELETE FROM users WHERE id=?", [userid], (err, result) => {
        if (err) {
            console.log("error deleting user", err);
            return res.status(500).json({ message: "Error deleting user" });
        }
        return res.status(200).json({ message: "User and all related data deleted successfully" });
    });
});

module.exports = router;