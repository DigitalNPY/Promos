let npyIdIntegration = "1331";
let npyIdPanier = "VRpVVVU";
let npyUi = "OSCH-72613";
window.langue = "fr";

const resortButtons = Array.from(document.querySelectorAll('.durationSelector'));
//change class from "promo" to "offer_annul"
const npyWrapper = document.querySelector('.offer_annul');
const npyWidgetWrapper = document.querySelector('.widget_resa');



//Map
var mymap = L.map('npyMap').setView([43.1731, -1.225], 5);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibnB5c2tpIiwiYSI6ImNrYW54d244dDA4YmsydHFuMzBncHZjOWsifQ.7X-PCXnhqjmCpFrWjbg0Ag'
}).addTo(mymap);
var markersLayer = []


//Initialisation
filterItemsByResort('all');


function filterItemsByResort(choix) {

//Reinitialisation de la carte et des blocs
    npyWrapper.innerHTML = '';
    for (var i = 0; i < markersLayer.length; i++) {
         mymap.removeLayer(markersLayer[i]);
     } 
    
    for (var i = 0; i < npySummerProm.length; i++) {

        if ((npySummerProm[i].station) === choix || choix === 'all') {
            let npyUrl = npySummerProm[i].ui;
            let nom = npySummerProm[i].nom;
            let npyBackground = npySummerProm[i].pic;
            let npyType = npySummerProm[i].type;
            let npyLoc = npySummerProm[i].loc;
            let npyStation = npySummerProm[i].station;
            let npyLat =npySummerProm[i].lat;
            let npyLng =npySummerProm[i].lng;

            //delete class "cont_grid4"
            let item = `<div class="lgmt" data-lat="${npyLat}" data-lng="${npyLng}" data-resort="${npyStation}" data-img="${npyBackground}" data-lgmt="${npyUrl}" data-titre="${nom}" data-type="${npyType}" data-loc="${npyLoc}"><div class="cont_grid_item"><div class="cont_grid_img"><img class="npyImage" /></div><div class="cont_grid_text"><h3 class="cont_title cont_title3">${nom}</h3></div></div></div>`;
            let textnode = document.createElement('div');
            textnode.innerHTML = item;
            npyWrapper.appendChild(textnode);
        } else {}
    }

    let createdItems = document.querySelectorAll('.lgmt');
    let createdImages = Array.from(document.querySelectorAll('.npyImage'));
    let itemLocs = Array.from(document.querySelectorAll('.cont_grid_text'));

    for (let i = 0; i < createdItems.length; i++) {


        


        let type = createdItems[i].dataset.type;
        let loc = createdItems[i].dataset.loc;
        let image = createdItems[i].dataset.img;
        let lat = createdItems[i].dataset.lat;
        let lng = createdItems[i].dataset.lng;

        let itemLocsLieu = `<div class="cont_grid_baseline lieu"><img src="https://www.n-py.com/sites/n-py/files/commons/0_ICONES/gps.png"/><b>${loc}</b></div>`;
        let itemLocsType = `<div class="cont_grid_baseline type"><img alt="" src="https://www.n-py.com/sites/n-py/files/commons/0_ICONES/gps.png" /><b>${type}</b></div>`;
        
        let itemLocsNodeLieu = document.createElement('div');
        let itemLocsNodeType = document.createElement('div');

        itemLocsNodeLieu.innerHTML = itemLocsLieu;
        itemLocsNodeType.innerHTML = itemLocsType;

        itemLocs[i].appendChild(itemLocsNodeLieu);
        itemLocs[i].appendChild(itemLocsNodeType);

        createdImages[i].src = 'img/' + image;

        if (lat==='0' && lng==='0'){

            }
            else{
              let marker = L.marker([lat, lng]).addTo(mymap);
              marker.bindPopup(`<p><img src="img/${image}"></p><p><b>${type}</b><br>${loc}</p><p></p>`);
              markersLayer.push(marker); 
            }
        
        
    };

    createdItems.forEach(element => element.addEventListener("click", function (e) {
        npyWidgetWrapper.innerHTML = '';
        let npyUi = this.dataset.lgmt;

        let res = npyUi.substring(0, 4);
        if (res === 'OSMB') {
            location.href = `https://www.n-py.com/fr/reservation?_wos=v2%2Cu%2C${npyUi}`;

        } else {
            let npyNom = this.dataset.titre;
            let widgetHtml = `<h2 class="home_title">${npyNom}</b></h2><div id="widget-produit-${npyUi}" ></div>`;
            let npyWidget = document.createElement('div');
            npyWidget.innerHTML = widgetHtml;
            npyWidgetWrapper.appendChild(npyWidget);
            let widgetProduit = AllianceReseaux.Widget.Instance("Produit", {
                idPanier: npyIdPanier,
                idIntegration: npyIdIntegration,
                langue: "fr",
                ui: npyUi
            });
            widgetProduit.Initialise();
            scrollToElement('widget_resa');
        }
    }));
}

function scrollToElement(element) {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        // top gets the distance from the top of the page of our target element
        top: document.getElementById(element).offsetTop
    });
};

//Definition Duree
resortButtons.forEach(element => element.addEventListener('click', function (e) {
    let chosenResort = this.dataset.resort;
    for (var i = 0; i < resortButtons.length; i++) {
        resortButtons[i].classList.remove('active');
    }
    this.classList.add('active');
    filterItemsByResort(chosenResort);
    mymap.setView([this.dataset.lat, this.dataset.long], 10);
    //document.querySelector('iframe').src=`https://www.n-py.com/fr/${chosenResort}`;
}));