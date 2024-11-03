const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Ensure this uses mysql2 with promise
const verifyJWT = require('../middleware/verifyJWT');

router.get('/postinfo', async (req, res) => {
    try {
        // Fetch data from multiple tables in a single database
        const [courseData, dateData, timeData, locationData, learning_wayData, platformData, learning_methodData, priceData, durationData] = await Promise.all([
            db.promise().query('SELECT Course_id, Coursename FROM courses'),
            db.promise().query('SELECT Date_id, Date FROM dates'),
            db.promise().query('SELECT time_id, time_range_value FROM times'),
            db.promise().query('SELECT location_id, location_city FROM locations'),
            db.promise().query('SELECT learning_way_id, learning_way FROM learning_ways'),
            db.promise().query('SELECT platform_id, platform_name FROM platforms'),
            db.promise().query('SELECT learning_method_id, learning_method FROM learning_methods'),
            db.promise().query('SELECT price_id, price_value FROM prices'),
            db.promise().query('SELECT duration_id,course_duration FROM course_duration')
        ]);

        res.json({
            selectCourse: courseData[0].map(row => ({ value: row.Course_id, label: row.Coursename })),
            selectdate: dateData[0].map(row => ({ value: row.Date_id, label: row.Date })),
            selecttime: timeData[0].map(row => ({ value: row.time_id, label: row.time_range_value })),
            selectlocation: locationData[0].map(row => ({ value: row.location_id, label: row.location_city })),
            selectlearningway: learning_wayData[0].map(row => ({ value: row.learning_way_id, label: row.learning_way })),
            selectplatform: platformData[0].map(row => ({ value: row.platform_id, label: row.platform_name })),
            selectlearningmethod: learning_methodData[0].map(row => ({ value: row.learning_method_id, label: row.learning_method })),
            selectprice: priceData[0].map(row => ({ value: row.price_id, label: row.price_value })),
            selectduration: durationData[0].map(row=>({value: row.duration_id, label:row.course_duration}))
        });
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});


router.post('/submitpost', verifyJWT, (req, res) => {
    const { course_id, date_id, time_id, location_id, learning_way_id, platform_id, learning_method_id, price_id, post_description, post_type,duration_id } = req.body;
    const user_id = req.userId;
    
    db.query("INSERT INTO posts (user_id, course_id, date_id, time_id, location_id, learning_way_id, platform_id, learning_method_id, price_id, post_description, post_type,duration_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", 
    [user_id, course_id, date_id, time_id, location_id, learning_way_id, platform_id, learning_method_id, price_id, post_description, post_type,duration_id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error inserting data into the database');
        } else {
            res.status(201).send('Post added successfully');
        }
    });
});

module.exports = router;
