const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Ensure this uses mysql2 with promise
const verifyJWT = require('../middleware/verifyJWT');

router.delete("/deletepost/:post_id",verifyJWT,(req,res)=>{
    const post_id = req.params.post_id;
    db.query("DELETE FROM posts WHERE post_id=?", [post_id], (err, result) => {
        if (err) {
            console.log("error deleting user's post", err);
            return res.status(500).json({ message: "Error deleting post" });
        }
        return res.status(200).json({ message: "Post and all related data deleted successfully" });
    });
})


module.exports = router;

