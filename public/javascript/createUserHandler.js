async function leggTilPerson(event) {
    event.preventDefault() // Forhindre standard forminnsending

    const fornavn = document.getElementById("fornavn").value;
    const etternavn = document.getElementById("etternavn").value;
    const epost = document.getElementById("nyepost").value;
    const tlf = document.getElementById("tlf").value;
    const passord = document.getElementById("nypassord").value;

    const response = await fetch("/createUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify ({
            fornavn,
            etternavn,
            epost,
            tlf,
            passord
        })

    });

    const result = await response.json();
    alert(result.message);
}