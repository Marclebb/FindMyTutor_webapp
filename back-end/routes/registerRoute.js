const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/database');

router.post("/register", (req, res) => {
    const { firstname, lastname, phoneNumber, Email, accounttype, password, profilePicture, Bio, certificate, experience_years } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error hashing password');
        }

        // Insert into users table
        db.query(
            "INSERT INTO users (firstname, lastname, phoneNumber, Email, accounttype, password, profilePicture, Bio) VALUES (?,?,?,?,?,?,?,?)",
            [firstname, lastname, phoneNumber, Email, accounttype, hash, profilePicture, Bio],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error inserting data into the users table');
                }

                const userId = result.insertId;

                if (accounttype === 'tutor') {
                    // If tutor, insert additional data into tutor table
                    db.query(
                        "UPDATE tutors SET certificate = ?, experience_years = ? WHERE id = ?",
                        [certificate, experience_years,userId],
                        (err, result) => {
                            if (err) {
                                console.log(err);
                                // If tutor insertion fails, delete the user
                                db.query("DELETE FROM users WHERE id = ?", [userId], (deleteErr) => {
                                    if (deleteErr) {
                                        console.log("Failed to delete user after tutor insertion failed", deleteErr);
                                    }
                                    return res.status(500).send('Error inserting data into the tutor table');
                                });
                            } else {
                                res.status(201).send('Tutor added successfully');
                            }
                        }
                    );
                } else {
                    res.status(201).send('User added successfully');
                }
            }
        );
    });
});

module.exports = router;