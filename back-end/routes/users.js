const express = require('express');
const router = express.Router();
const { users } = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;




router.get("/", async (req, res) => {
    const listOfUsers = await users.findAll();
    res.json(listOfUsers);
});

router.post("/", async (req, res) => {
    const user = req.body;

    // Hash the password
    try {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;

        // Create user with hashed password
        const newUser = await users.create(user);
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error hashing password" });
    }
});

// Login endpoint
router.post("/login", async (req, res) => {
    const { Email, password } = req.body;

    try {
        const user = await users.findOne({ where: { Email } });
        if (!user) {
            return res.status(401).json({ message: "non existant user" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error logging in" });
    }
});

module.exports = router;
