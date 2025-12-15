const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require(`bcrypt`);
const path = require(`path`);

router.get(`/`, (req, res) => {
    res.sendFile(path.join(__dirname, `../public/createUser.html`));
})

router.post("/", (req, res) => {
    const { fornavn, etternavn, epost, tlf, passord } = req.body;
    
    try {
        const stmt = db.prepare("INSERT INTO person_new (fornavn, etternavn, epost, tlf, passord) VALUES (?,?,?,?,?)");
        stmt.run(fornavn, etternavn, epost, tlf, passord);
        res.json({ message: "Ny bruker lagt til!" });
    } catch (err) {
        console.error("Databasefeil:", err);
        res.status(500).json({ message: "Feil ved lagring av bruker." });
    }
});


module.exports = router;