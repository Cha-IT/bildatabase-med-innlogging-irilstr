const express = require(`express`);
const router = express.Router();
const db = require('../db');
const kreverInnlogging = require(`../auth.js`);
const bcrypt = require(`bcrypt`);

router.get("/", kreverInnlogging, (req, res) => {
    // Sender data vi siden man er inne på
    res.send(`Velkommen ${req.session.bruker.fornavn}! Dette er en beskyttet side`);

})

module.exports = router;