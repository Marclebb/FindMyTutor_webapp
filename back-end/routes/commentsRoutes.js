const express = require('express');
const router = express.Router();
const db = require('../config/database');
const verifyJWT = require('../middleware/verifyJWT');

router.post('/submitcomment/:post_id', verifyJWT, (req, res) => {
    const user_id = req.userId; // Assuming verifyJWT middleware sets this
    const { post_id } = req.params;
    const { comment } = req.body;
    db.query(
        "INSERT INTO comments (user_id, post_id, comment) VALUES (?, ?, ?)",
        [user_id, post_id, comment],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error inserting comment into the database' });
            }
            res.status(201).json({
                message: 'Comment added successfully',
            });
        }
    );
});

router.get('/getcomments/:postId', (req, res) => {
    const postId = req.params.postId;

    const query = `
    SELECT 
    comments.comment_id, 
    comments.user_id, 
    comments.comment, 
    users.firstname, 
    users.lastname, 
    users.profilePicture,
    replies.id,
    replies.user_id,
    replies.reply,
    replier.firstname AS reply_firstname,
    replier.lastname AS reply_lastname,
    replier.profilePicture AS reply_profilePicture
FROM comments
LEFT JOIN users ON comments.user_id = users.id
LEFT JOIN replies ON comments.comment_id = replies.comment_id
LEFT JOIN users AS replier ON replies.user_id = replier.id
WHERE comments.post_id = ?;
    `;

    db.query(query, [postId], (err, results) => {
        if (err) {
            console.error("Error fetching comments:", err);
            return res.status(500).json({ message: "Error fetching comments" });
        }

        const comments = [];
        results.forEach(row => {
            // Check if this comment already exists in the array
            let comment = comments.find(c => c.comment_id === row.comment_id);
            if (!comment) {
                // Create a new comment object
                comment = {
                    comment_id: row.comment_id,
                    user_id: row.user_id,
                    comment: row.comment,
                    firstname: row.firstname,
                    lastname: row.lastname,
                    profilePicture: row.profilePicture,
                    replies: [] // Initialize replies as an empty array
                };
                comments.push(comment);
            }

            // If there is a reply, add it to the replies array of the comment
            if (row.id) {
                comment.replies.push({
                    id: row.id,
                    tutor_id: row.tutor_id,
                    reply: row.reply,
                    firstname: row.reply_firstname,
                    lastname: row.reply_lastname,
                    profilePicture: row.reply_profilePicture
                });
            }
        });

        res.json(comments);
    });
});


router.post('/submitreply/:comment_id', verifyJWT, (req, res) => {
    const user_id = req.userId; // Assuming verifyJWT middleware sets this
    const { comment_id } = req.params;
    const { reply } = req.body;

    db.query(
        "INSERT INTO replies (comment_id, user_id, reply) VALUES (?, ?, ?)",
        [comment_id, user_id, reply],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error inserting reply into the database' });
            }
            res.status(201).json({ message: 'Reply added successfully' });
        }
    );
});


module.exports = router;