// async: når vi kommuniserer med en annen fil, venter vi med å gå videre i koden til vi har fått svar.
// Når vi kommuniserer med en database, må vi alltdi tvinge serveren til å vente på svar før den går videre i koden.
async function loggInn(event) {
    event.preventDefault(); // Hindrer at siden ikke lastes inn på nytt når man trykker submit på loggInn-formet.
    const epost = document.querySelector("#epost").value;
    const passord = document.querySelector("#password").value;

    const response = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({ epost, passord }) // JSON-data som er hentet fra databasen gjøres om fra klartekst til string.
    });

    const result = await response.json();
    if (response.ok) {
        alert(result.message);
        window.location.href = "/beskyttet";
    } else {
        alert(result.message);
    }
}

async function loggUt() {
    const response = await fetch("/logout", {
        method: "POST"
    });

    if (response.ok) {
        alert("Du er nå logget ut.");
        window.location.href = "/login.html"; // Omdirigerer til login-siden
    } else {
        alert("Noe gikk galt under utlogging.");
    }
}
