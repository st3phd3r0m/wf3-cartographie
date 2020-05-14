let mymap;
let latitude = 46.3;
let longitude = 4.8333;

let marqueurs = [];
let markersCluster;

window.onload = () => {

    //Initialiser la carte (centrée sur Mâcon et zoomée à 11)
    mymap = L.map('mapid').setView([latitude, longitude], 11);

    // On ajoute les "tuiles" (images de la carte)
    L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png ", {
        attribution: "Carte Openstreetmap.org",
        minZoom: 1,
        maxZoom: 18
    }).addTo(mymap);

    let marker = L.marker([latitude, longitude]);
    marker.bindPopup("<h3>Agence Mâcon</h3><p>Agence Mâcon</p>");
    marqueurs.push(marker);

    getListe();
    getDepartementList();

}


function getListe() {

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
        // On attend la fin de la requete et la reception d'une reponse
        if (xmlhttp.readyState == 4) {
            //Ici la requete est terminée et on a une reponse
            if (xmlhttp.status == 200) {
                //Ici on a une reponse
                let agences = JSON.parse(xmlhttp.responseText);

                for (let agence of agences) {
                    let marker = L.marker([agence.lat, agence.lon]);
                    marker.bindPopup("<h3>" + (agence.nom) + "</h3><p>" + agence.description + "</p>");
                    marqueurs.push(marker);
                }

                //On crée un "groupe leaflet" de marqueurs
                let groupe = L.featureGroup(marqueurs);

                //On récupère les extremités du "rectangle"
                let extremites = groupe.getBounds();

                //On adapte le zoom aux extremités
                mymap.fitBounds(extremites);

                //Fonctionnalités de la Librairie markercluster@1.4.1
                //Instanciation objet
                markersCluster = new L.MarkerClusterGroup();
                //Ajoute le "groupe leaflet"
                markersCluster.addLayer(groupe);
                mymap.addLayer(markersCluster);

            }
        }
    }

    //On ouvre la requête
    xmlhttp.open("GET", "https://nouvelle-techno.fr/dist/liste");
    //On envoie la requete
    xmlhttp.send();

}

function getDepartementList() {

    //Nouvelle instanciation de requete HTTP : on va chercher la liste des départements
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
        // On attend la fin de la requete et la reception d'une reponse
        if (xmlhttp.readyState == 4) {
            //Ici la requete est terminée et on a une reponse
            if (xmlhttp.status == 200) {
                //Ici on a une reponse
                let departements = JSON.parse(xmlhttp.responseText);

                let selecteur = document.querySelector("select");
                for (departement of departements) {
                    let option = document.createElement("option");
                    option.value = departement.dept;
                    option.innerText = departement.dept;
                    selecteur.appendChild(option);
                }
                selecteur.addEventListener("change", afficheDepartement);
            }
        }
    }

    //On ouvre la requête
    xmlhttp.open("GET", "https://nouvelle-techno.fr/dist/departements");
    //On envoie la requete
    xmlhttp.send();
}

function afficheDepartement() {
    let codeDepartement = this.value;

    let url = (codeDepartement == '') ? "https://nouvelle-techno.fr/dist/liste" : ("https://nouvelle-techno.fr/dist/departement/" + codeDepartement);

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        // On attend la fin de la requete et la reception d'une reponse
        if (xmlhttp.readyState == 4) {
            //Ici la requete est terminée et on a une reponse
            if (xmlhttp.status == 200) {
                //Ici on a une reponse

                //On enlève la carte
                marqueurs = [];
                mymap.removeLayer(markersCluster);

                //On charge la reponse 
                let agences = JSON.parse(xmlhttp.responseText);

                for (let agence of agences) {
                    let marker = L.marker([agence.lat, agence.lon]);
                    marker.bindPopup("<h3>" + (agence.nom) + "</h3><p>" + agence.description + "</p>");
                    marqueurs.push(marker);
                }

                //On crée un "groupe leaflet" de marqueurs
                let groupe = L.featureGroup(marqueurs);

                //On récupère les extremités du "rectangle"
                let extremites = groupe.getBounds();

                //On adapte le zoom aux extremités
                mymap.fitBounds(extremites);

                //Fonctionnalités de la Librairie markercluster@1.4.1
                //Instanciation objet
                markersCluster = new L.MarkerClusterGroup();
                //Ajoute le "groupe leaflet"
                markersCluster.addLayer(groupe);
                //Ajoute le cluster à la carte
                mymap.addLayer(markersCluster);
            }
        }
    }
    //On ouvre la requête
    xmlhttp.open("GET", url);
    //On envoie la requete
    xmlhttp.send();
}