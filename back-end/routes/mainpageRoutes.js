const express = require('express');
const router = express.Router();
const db = require('../config/database'); 
const verifyJWT = require('../middleware/verifyJWT');

router.get("/getcards", async (req, res) => {
    db.query(`
    SELECT post_id,firstname,lastname,profilePicture,phoneNumber,Email,Coursename, Date, time_range_value, learning_way, platform_name, learning_method, price_value, post_description 
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
    
        res.json(result);
    });
});

router.get('/getpostbyid/:post_id',async (req,res)=>{
    const {post_id}=req.params
    db.query(`
    SELECT users.id,post_id,firstname,lastname,Email,profilePicture,certificate, experience_years,phoneNumber,Coursename, Date, time_range_value, learning_way, platform_name, learning_method, price_value, post_description,learning_method_description,location_city,course_duration,
    ROUND(AVG(ratings.rate_value), 1) AS tutor_rate 
FROM posts 
LEFT JOIN courses ON courses.Course_id = posts.course_id 
LEFT JOIN dates ON dates.Date_id = posts.date_id 
LEFT JOIN times ON times.time_id = posts.time_id 
LEFT JOIN locations ON locations.location_id = posts.location_id 
LEFT JOIN learning_ways ON learning_ways.learning_way_id = posts.learning_way_id 
LEFT JOIN platforms ON platforms.platform_id = posts.platform_id 
LEFT JOIN learning_methods ON learning_methods.learning_method_id = posts.learning_method_id 
LEFT JOIN prices ON prices.price_id = posts.price_id 
LEFT JOIN course_duration ON course_duration.duration_id=posts.duration_id
LEFT JOIN users ON users.id = posts.user_id 
LEFT JOIN tutors ON users.id = tutors.id
LEFT JOIN students_ratings ON students_ratings.tutor_id = users.id
LEFT JOIN ratings ON students_ratings.rating_id = ratings.rating_id
WHERE post_type='tutor' AND  post_id=?;
    `, [post_id],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).send("error fetching post")
        }
        if (result.length > 0) {
           return res.json(result[0])
        }
        else {
           return res.status(404).send({ message: "Post not found" });
        }
    })
})




module.exports=router