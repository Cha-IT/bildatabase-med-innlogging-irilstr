const express = require(`express`);
const session = require(`express-session`);

// Skal sjekke om vi har opprettet en session
function kreverInnlogging(req, res, next) {
    // Hvis det ikke fins en session, eller ingen bruker
    if (!req.session || !req.session.bruker) {
        return res.status(401).json({ message: "Du må være innlogget for å få tilgang" });
    
    }
    next();
} 
module.exports = kreverInnlogging;