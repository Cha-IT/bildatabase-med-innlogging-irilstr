const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require(`bcrypt`);
const path = require(`path`);




router.post("/", (req, res) => {
    // Sletter sessionen til brukeren
    req.session.destroy(() => {
        res.json({ message: "Du er logget ut." });
    });
});


module.exports = router;