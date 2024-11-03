const express = require('express');
const router = express.Router();
const db = require('../config/database'); 
const verifyJWT = require('../middleware/verifyJWT');

router.post('/submitrate', verifyJWT, (req, res) => {
    const { rating_id, tutor_id } = req.body;
    const student_id = req.userId; 

    db.query("INSERT INTO students_ratings (student_id, tutor_id, rating_id) VALUES (?,?,?)", 
        [student_id, tutor_id, rating_id], 
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error inserting data into the database');
            } else {
                res.status(201).send('Rate added successfully');
            }
        }
    );
});

module.exports = router;
