const express = require(`express`);
const router = express.Router();
const db = require('../db');
const kreverInnlogging = require(`../auth.js`);
const bcrypt = require(`bcrypt`);
const path = require("path");


router.get("/", kreverInnlogging, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/beskyttet.html"));
});


module.exports = router;