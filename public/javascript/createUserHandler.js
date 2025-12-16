// Denne funksjonen håndterer innsending av skjemaet for å opprette en ny bruker
async function leggTilPerson(event) {
    // Forhindre at nettleseren utfører standard handling for forminnsending (som å laste siden på nytt)
    event.preventDefault();

    // Hent verdier fra inputfeltene i HTML-skjemaet ved hjelp av deres ID-er
    const fornavn = document.getElementById("fornavn").value;
    const etternavn = document.getElementById("etternavn").value;
    const epost = document.getElementById("nyepost").value;
    const tlf = document.getElementById("tlf").value;
    const passord = document.getElementById("nypassord").value;

    // Send en asynkron HTTP-forespørsel til serveren på endepunktet "/createUser"
    const response = await fetch("/createUser", {
        method: "POST", // Bruk POST-metoden for å sende data til serveren
        headers: {
            "Content-Type": "application/json" // Angi at dataene som sendes er i JSON-format
        },
        body: JSON.stringify({ // Konverter JavaScript-objektet til en JSON-streng for å sende som forespørselens kropp
            fornavn,
            etternavn,
            epost,
            tlf,
            passord
        })
    });

    // Vent på og parse svaret fra serveren som JSON
    const result = await response.json();
    // Vis en alert-boks med meldingen fra serveren (f.eks. suksess eller feil)
    if (response.ok) {
        alert(result.message);
        window.location.href = "/login";
    } else {
        alert(result.message);
    }
}