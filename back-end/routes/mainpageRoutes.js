const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Ensure this uses mysql2 with promise
const verifyJWT = require('../middleware/verifyJWT');


router.get("/getcards", async (req, res) => {
    db.query(`
    SELECT firstname, lastname,profilePicture, Coursename, Date, time_range_value, learning_way, platform_name, learning_method, price_value, post_description 
    FROM posts 
    LEFT JOIN courses ON courses.Course_id = posts.course_id 
    LEFT JOIN dates ON dates.Date_id = posts.date_id 
    LEFT JOIN times ON times.time_id = posts.time_id 
    LEFT JOIN locations ON locations.location_id = posts.location_id 
    LEFT JOIN learning_ways ON learning_ways.learning_way_id = posts.learning_way_id 
    LEFT JOIN platforms ON platforms.platform_id = posts.platform_id 
    LEFT JOIN learning_methods ON learning_methods.learning_method_id = posts.learning_method_id 
    LEFT JOIN prices ON prices.price_id = posts.price_id 
    LEFT JOIN users ON users.id = posts.user_id 
    WHERE post_type='tutor';
    `, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database error." });
        }
        // Send all results, even if it's an empty array
        res.json(result);
    });
});

module.exports=router