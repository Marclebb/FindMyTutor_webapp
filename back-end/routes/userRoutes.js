const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/database');
const verifyJWT = require('../middleware/verifyJWT.js');


router.get("/profile", verifyJWT, (req, res) => {
    const userId = req.userId;
    db.query(`SELECT users.*, 
    ROUND(AVG(ratings.rate_value), 1) AS tutor_rate ,
    certificate, experience_years
    FROM users
    LEFT JOIN students_ratings ON students_ratings.tutor_id = users.id
    LEFT JOIN ratings ON students_ratings.rating_id = ratings.rating_id
    LEFT JOIN tutors ON tutors.id = users.id
    WHERE users.id = ?
    GROUP BY users.id;`, [userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error." });
        }
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            console.warn('User not found:', userId);
            res.status(404).json({ message: "User not found." });
        }
    });
});


router.get('/getuserposts', verifyJWT, (req, res) => {
    const userId = req.userId;
    db.query(`
        SELECT post_id, firstname, lastname, profilePicture, phoneNumber, Coursename, Date, time_range_value, learning_way, platform_name, learning_method, price_value, post_description, learning_method_description, location_city, course_duration
        FROM posts 
        LEFT JOIN courses ON courses.Course_id = posts.course_id 
        LEFT JOIN dates ON dates.Date_id = posts.date_id 
        LEFT JOIN times ON times.time_id = posts.time_id 
        LEFT JOIN locations ON locations.location_id = posts.location_id 
        LEFT JOIN learning_ways ON learning_ways.learning_way_id = posts.learning_way_id 
        LEFT JOIN platforms ON platforms.platform_id = posts.platform_id 
        LEFT JOIN learning_methods ON learning_methods.learning_method_id = posts.learning_method_id 
        LEFT JOIN prices ON prices.price_id = posts.price_id 
        LEFT JOIN course_duration ON course_duration.duration_id = posts.duration_id
        LEFT JOIN users ON users.id = posts.user_id 
        WHERE user_id = ?
    `, [userId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database error." });
        }
        if (result.length > 0) {
          return  res.json(result); 
        } else {
            return  res.json([])
           
        }
    })   
})

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

router.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: "An unexpected error occurred." });
});


router.get("/getuserbyid/:user_id", async (req,res)=>{
    const {user_id} = req.params;
    db.query(`SELECT 
    firstname,
    lastname,
    phoneNumber,
    Email,
    profilePicture,
    ROUND (avg(ratings.rate_value),1) AS tutor_rate,
    Bio,
    certificate,
    experience_years
    FROM users 
    LEFT JOIN students_ratings ON students_ratings.tutor_id = users.id
    LEFT JOIN ratings ON students_ratings.rating_id = ratings.rating_id
    LEFT JOIN tutors ON tutors.id = users.id
     WHERE tutors.id= ?`, 
    [user_id],(err,result)=>{
        if(err){
            console.log(err)
            return res.status(500).send("error fetching post")
        }
        if(result.length > 0){
            return res.json(result[0])
        }
        else{
            return res.status(404).send({ message: "Post not found" });
        }
    })
})


module.exports = router;