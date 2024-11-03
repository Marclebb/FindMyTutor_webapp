const express = require('express');
const router = express.Router();
const db = require('../config/database');
const verifyJWT = require('../middleware/verifyJWT.js');

router.get('/getmatches', verifyJWT, (req, res) => {
    const user_id = req.userId;

    // Fetch all matches for the user
    db.query(`
        SELECT 
            m.tutor_post_id,
            m.time_matched,
            tutor.firstname AS tutor_firstname,
            tutor.lastname AS tutor_lastname,
            student.firstname AS student_firstname,
            student.lastname AS student_lastname,
            student.phoneNumber AS student_number,
            student.Email AS student_email,
            c.Coursename
        FROM matches m
        LEFT JOIN users tutor ON m.tutor_id = tutor.id
        LEFT JOIN users student ON m.student_id = student.id
        LEFT JOIN posts p ON m.tutor_post_id = p.post_id
        LEFT JOIN courses c ON p.course_id = c.Course_id
        WHERE m.student_id = ? OR m.tutor_id = ?
    `, [user_id, user_id], (err, result) => {
        if (err) {
            console.error('Error fetching match details:', err);
            return res.status(500).json({ message: "Error fetching match details", error: err.message });
        }

        // Send response with all matches
        res.json({ matches: result });
    });
});


router.get('/check-notifications', verifyJWT, (req, res) => {
    const user_id = req.userId;

    db.query('SELECT last_notification_time FROM users WHERE id = ?', [user_id], (err, userResult) => {
        if (err) {
            console.error('Error fetching user details:', err);
            return res.status(500).json({ message: "Error fetching user details", error: err.message });
        }

        const lastNotificationTime = userResult[0]?.last_notification_time || new Date(0);

        db.query(`
            SELECT 
                m.tutor_post_id,
                m.time_matched,
                tutor.firstname AS tutor_firstname,
                tutor.lastname AS tutor_lastname,
                student.firstname AS student_firstname,
                student.lastname AS student_lastname
            FROM matches m
            LEFT JOIN users tutor ON m.tutor_id = tutor.id
            LEFT JOIN users student ON m.student_id = student.id
            WHERE (m.student_id = ? OR m.tutor_id = ?) AND m.time_matched > ?
        `, [user_id, user_id, lastNotificationTime], (err, result) => {
            if (err) {
                console.error('Error checking for new matches:', err);
                return res.status(500).json({ message: "Error checking for new matches", error: err.message });
            }

            const newMatches = result.map(match => ({
                title: "New Match Found!",
                body: `You have been matched, check the MyMatches page to see it `
            }));

            res.json({ notifications: newMatches });

            // Update last_notification_time if there are new matches
            if (newMatches.length > 0) {
                const currentTime = new Date();
                db.query('UPDATE users SET last_notification_time = ? WHERE id = ?', [currentTime, user_id], (updateErr) => {
                    if (updateErr) {
                        console.error('Error updating last notification time:', updateErr);
                    }
                });
            }
        });
    });
});


module.exports = router;