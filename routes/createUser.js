const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require(`bcrypt`);
const path = require(`path`);

// Håndter GET-forespørsel til "/createUser" ved å sende HTML-filen for brukeroppretting
router.get(`/`, (req, res) => {
    res.sendFile(path.join(__dirname, `../public/createUser.html`));
})

router.post("/", async (req, res) => {
    const { fornavn, etternavn, epost, tlf, passord } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(passord, saltRounds);
    
    // Sjekke om epost allerede finnes
    const existingUser = db.prepare("SELECT id FROM person WHERE epost = ?").get(epost); // get(epost) erstatter spørsmålstegnet i spørringen
    if (existingUser) {
        return res.status(400).json({ message: "E-postadressen er allerede i bruk." });
    }
    
    // Id har ikke AI, så vi må lage en unik id selv
    let newId;
    do {
        newId = Math.floor(Math.random() * 1000000) + 1; // Tilfeldig id mellom 1 og 1 million
        var checkId = db.prepare("SELECT id FROM person WHERE id = ?").get(newId);
    } while (checkId); // Loop until a unique id is found
    
    try {
        // Legg til ny bruker i databasen
        const stmt = db.prepare("INSERT INTO person (id, fornavn, etternavn, epost, tlf, passord) VALUES (?,?,?,?,?,?)");
        stmt.run(newId, fornavn, etternavn, epost, tlf, hashedPassword);
        res.json({ message: "Ny bruker lagt til!" });
    } catch (err) {
        console.error("Databasefeil:", err);
        res.status(500).json({ message: "Feil ved lagring av bruker." });
    }
});


module.exports = router;