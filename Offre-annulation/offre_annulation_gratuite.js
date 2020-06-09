let npyIdIntegration = "1331";
let npyIdPanier = "VRpVVVU";
let npyUi = "OSCH-72613";
window.langue = "fr";

const resortButtons = Array.from(document.querySelectorAll('.durationSelector'));
const adultPlus = document.getElementById('adultPlus');
const adultScore = document.getElementById('adultScore');
const adultMoins = document.getElementById('adultMoins');


let nbPers = 1;
let chosenResort = 'all';


//change class from "promo" to "offer_annul"
const npyWrapper = document.querySelector('.offer_annul');
const npyWidgetWrapper = document.querySelector('.widget_resa');


//Creation de la map
var mymap = L.map('npyMap').setView([43.1731, -1.225], 5);

//Chargement de Mapbox
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibnB5c2tpIiwiYSI6ImNrYXF4ZG0xZTA0OHozMW1zczNtY3R4YWoifQ.sI3nrGuPRzcU7FmPXXLFkA'
}).addTo(mymap);

let markersLayer = [];
let mapBounds = []


//Initialisation - Premier lancement de la fonction au chargement de la page
filterItemsByResort('all',0);


function filterItemsByResort(choix, pers) {

    //Reinitialisation de la carte et des blocs
    npyWrapper.innerHTML = '';
    for (var i = 0; i < markersLayer.length; i++) {
         mymap.removeLayer(markersLayer[i]);
     } 
    
    for (var i = 0; i < npySummerProm.length; i++) {

    //creation des items   
        if (((npySummerProm[i].station) === choix || choix === 'all')&&((npySummerProm[i].capacite) >= pers)) {
            let npyUrl = npySummerProm[i].ui;
            let nom = npySummerProm[i].nom;
            let npyBackground = npySummerProm[i].pic;
            let npyType = npySummerProm[i].type;
            let npyLoc = npySummerProm[i].loc;
            let npyStation = npySummerProm[i].station;
            let npyCap = npySummerProm[i].capacite;
            let npyPrix = npySummerProm[i].tarif;
            let npyDuree = npySummerProm[i].duree;
            let npyLat =npySummerProm[i].lat;
            let npyLng =npySummerProm[i].lng;


    //delete class "cont_grid4"
            let item = `<div class="lgmt" data-prix="${npyPrix}" data-duree="${npyDuree}" data-cap="${npyCap}" data-lat="${npyLat}" data-lng="${npyLng}" data-resort="${npyStation}" data-img="${npyBackground}" data-lgmt="${npyUrl}" data-titre="${nom}" data-type="${npyType}" data-loc="${npyLoc}"><div class="cont_grid_item"><div class="cont_grid_img"><img class="npyImage" /></div><div class="cont_grid_text"><h3 class="cont_title cont_title3">${nom}</h3></div></div></div>`;
            let textnode = document.createElement('div');
            textnode.innerHTML = item;
            npyWrapper.appendChild(textnode);
        } else {}
    }


    //Mise en tableau des items crees
    let createdItems = document.querySelectorAll('.lgmt');
    let createdImages = Array.from(document.querySelectorAll('.npyImage'));
    let itemLocs = Array.from(document.querySelectorAll('.cont_grid_text'));


    //Remplissage des elements des items
    for (let i = 0; i < createdItems.length; i++) {


        let type = createdItems[i].dataset.type;
        let loc = createdItems[i].dataset.loc;
        let image = createdItems[i].dataset.img;
        let lat = createdItems[i].dataset.lat;
        let lng = createdItems[i].dataset.lng;
        let prix = createdItems[i].dataset.prix;
        let duree = createdItems[i].dataset.duree;
        let npyMapUi = createdItems[i].dataset.lgmt;
        let capacite = createdItems[i].dataset.cap;

        let itemLocsPrice = `<div class="price"><p><span class="npyFrom">À partir de</span><br><span>${prix}€</span> par ${duree}</p></div>`
        let itemLocsLieu = `<div class="cont_grid_baseline lieu"><img src="https://www.n-py.com/sites/n-py/files/commons/0_ICONES/npyPin2.png"/><b>${loc}</b></div>`;
        let itemLocsType = `<div class="cont_grid_baseline type"><img alt="" src="https://www.n-py.com/sites/n-py/files/commons/0_ICONES/npyMaison2.png" /><b>${type}</b></div>`;
        let itemLocsCap = `<div class="cont_grid_baseline type"><img alt="" src="https://www.n-py.com/sites/n-py/files/commons/0_ICONES/npyPerson2.png" /><b>${capacite} Pers. Max</b></div>`;
        
        let itemLocsNodePrice = document.createElement('div');
        let itemLocsNodeLieu = document.createElement('div');
        let itemLocsNodeType = document.createElement('div');
        let itemLocsNodeCap = document.createElement('div');

        itemLocsNodePrice.innerHTML = itemLocsPrice;
        itemLocsNodeLieu.innerHTML = itemLocsLieu;
        itemLocsNodeType.innerHTML = itemLocsType;
        itemLocsNodeCap.innerHTML = itemLocsCap;

        itemLocs[i].appendChild(itemLocsNodePrice);
        itemLocs[i].appendChild(itemLocsNodeLieu);
        itemLocs[i].appendChild(itemLocsNodeType);
        itemLocs[i].appendChild(itemLocsNodeCap);

        createdImages[i].src = 'https://www.n-py.com/sites/n-py/files/commons/2020-2021/Ete/Offre_annulation_gratuite/' + image;

    //Creation des POIS ssur la map et centrage ICI ESSAYER DE CONVERTIR EN STRING
        if (lat==='0' && lng==='0'){

            }
            else{
              let marker = L.marker([lat, lng]).addTo(mymap);
              let markerImgSrc = ('https://www.n-py.com/sites/n-py/files/commons/2020-2021/Ete/Offre_annulation_gratuite/' + image).toString();
              let markerLinkUrl = ('https://www.n-py.com/sites/n-py/files/commons/2020-2021/Ete/Offre_annulation_gratuite/' + npyMapUi).toString();
              marker.bindPopup();
              marker.setPopupContent(`<p><img id="npyMapImg" data-url="${npyMapUi}" data-img="${image}" src="https://www.n-py.com/sites/n-py/files/commons/2020-2021/Ete/Offre_annulation_gratuite/placeholder.jpg"></p><p><b>${type}</b><br>${loc}<br>${capacite} Pers. max</p><p><a class="npyMapCta" id="npyMapCta" >En savoir +</a></p>`);
              markersLayer.push(marker); 
              mapBounds.push([lat,lng]);

            }
        
        
    };

    mymap.invalidateSize();
    mymap.fitBounds(mapBounds);


//Creation d'un tableau comprenant uniquement les elements localises sur la map
    let createdItemsWithLocal =[];
    for (var i = 0; i < createdItems.length; i++) {
        if(createdItems[i].dataset.lat==='0'){
           
        }
        else{
          createdItemsWithLocal.push(createdItems[i])
        }
    }

//Assignation des data images et url aux points sur la carte
    let createdMarkers = Array.from(document.querySelectorAll('.leaflet-marker-icon'));

    for (var i = 0; i < createdMarkers.length; i++) {

    createdMarkers[i].dataset.img=createdItemsWithLocal[i].dataset.img;
    createdMarkers[i].dataset.lgmt=createdItemsWithLocal[i].dataset.lgmt;         
    };


//Remplissage img popups    
    createdMarkers.forEach(marker => marker.addEventListener('click', function(e){
    setTimeout(delayIt,1000);

       }));


    function delayIt(e){
        let imageBubble = document.querySelector('#npyMapImg');
        let linkBubble = document.querySelector('#npyMapCta');
        imageBubble.src = 'https://www.n-py.com/sites/n-py/files/commons/2020-2021/Ete/Offre_annulation_gratuite/' + imageBubble.dataset.img;
        linkBubble.href = 'https://www.n-py.com/fr/reservation?_wos=v2%2Cu%2C' + imageBubble.dataset.url;

        }

//Logique métier au clic sur les éléments
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


//Scroll au clic
    function scrollToElement(element) {
        window.scroll({
            behavior: 'smooth',
            left: 0,
            // top gets the distance from the top of the page of our target element
            top: document.getElementById(element).offsetTop
        });
    };

//Definition Station
    resortButtons.forEach(element => element.addEventListener('click', function (e) {
        chosenResort = this.dataset.resort;
        for (var i = 0; i < resortButtons.length; i++) {
            resortButtons[i].classList.remove('active');
        }
        this.classList.add('active');
        filterItemsByResort(chosenResort,nbPers);
        mymap.setView([this.dataset.lat, this.dataset.long], 10);

    }));


//Definition nombre de personnes
    adultPlus.addEventListener('click', function(){
        nbPers++;
        adultScore.innerHTML=nbPers;
        filterItemsByResort(chosenResort,nbPers);
    });

    adultMoins.addEventListener('click', function(){
        if(nbPers!=0){
            nbPers--;
            adultScore.innerHTML=nbPers;
            filterItemsByResort(chosenResort,nbPers);
        } else{}
    });