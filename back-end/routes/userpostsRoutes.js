const express = require('express');
const router = express.Router();
const db = require('../config/database'); 
const verifyJWT = require('../middleware/verifyJWT');

router.get('/getuserpostbyid/:post_id', verifyJWT, (req, res) => {
    const { post_id } = req.params;
    const user_id = req.userId; 

    // First, check if the post belongs to the authenticated user
    db.query(
        'SELECT user_id FROM posts WHERE post_id = ?',
        [post_id],
        (err, result) => {
            if (err) {
                console.error('Error checking post ownership:', err);
                return res.status(500).json({ message: "Error fetching post" });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: "Post not found" });
            }

            if (result[0].user_id !== user_id) {
                return res.status(403).json({ message: "You don't have permission to access this post" });
            }

            // If the post belongs to the user, fetch the full details
            db.query(`
            SELECT posts.post_id, posts.user_id, firstname, lastname, profilePicture, phoneNumber, Coursename, 
                   Date, time_range_value, learning_way, platform_name, learning_method, price_value, 
                   post_description, learning_method_description, location_city, course_duration
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
            WHERE posts.post_id = ? AND posts.user_id = ?;
        `, [post_id, user_id], (err, result) => {
            if (err) {
                console.error('Error fetching post details:', err);
                return res.status(500).json({ message: "Error fetching post details" });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: "Post not found or you don't have permission to access it" });
            }
            res.json(result[0]);
        });
        
        }
    );
});

module.exports = router;