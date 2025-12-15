const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require(`bcrypt`);
const path = require(`path`);


router.get(`/`, (req, res) => {
    res.sendFile(path.join(__dirname, `../public/login.html`));
})

// Det som skal skje når vi sender data inn i formet
// Henter epost og passord fra selve requesten
// Prepare er en metode vi bruker for å hente ut data fra databasen (hører til sqlite)
router.post(`/`, async (req, res) => {
    const { epost, passord } = req.body;

    const bruker = db.prepare("SELECT * FROM person_new WHERE epost = ?").get(epost);
    if (!bruker) {
        return res.status(401).json({ message: "Feil epost eller passord" }) // Lar ikke hackere vite om det er epost eller passord som er feil.
    }

    const passordErGyldig = passord === bruker.passord;
    if (!passordErGyldig) {
        return res.status(401).json( { message: "Feil epost eller passord" });
    }

    req.session.bruker = { id: bruker.id, fornavn: bruker.fornavn};
    res.json({ message: "Innlogging vellykket" });

})

module.exports = router;