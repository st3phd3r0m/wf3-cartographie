window.onload = () => {
    getListe();
}


function getListe() {

    let xmlhttp = new XMLHttpRequest();
    // On attend la fin de la requete et la reception d'une reponse
    console.log(1);
    if (xmlhttp.readyState == 4) {
        console.log(2);
        //Ici la requete est terminée et on a une reponse
        if (xmlhttp.status == 200) {
            console.log(3);
            //Ici on a une reponse
            console.log("ok");
            console.log(xmlhttp.response);
            console.log(JSON.parse(xmlhttp.response));
        }
    }


    //On ouvre la requête
    xmlhttp.open("GET", "https://nouvelle-techno.fr/dist/liste");

    // myHeaders.append('Content-Type')
    //On envoie la requete
    xmlhttp.send();

}