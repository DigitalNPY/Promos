let npyIdIntegration = "1331";
let npyIdPanier = "VRpVVVU";
let npyUi = "OSCH-72613";
window.langue = "fr";








const resortButtons = Array.from(document.querySelectorAll('.durationSelector'));
const npyWrapper = document.querySelector('.promo');
const npyWidgetWrapper = document.querySelector('.widget_resa');

//Initialisation
filterItemsByResort('all');

function filterItemsByResort(choix){
        npyWrapper.innerHTML='';
          for (var i = 0; i < npySummerProm.length; i++) {

            if((npySummerProm[i].station)===choix || choix==='all'){
            let npyUrl = npySummerProm[i].ui;
            let nom = npySummerProm[i].nom;
            let npyBackground = npySummerProm[i].pic;
            let npyType = npySummerProm[i].type;
            let npyLoc = npySummerProm[i].loc;
            let npyStation =npySummerProm[i].station;
      
            

            let item =`<div class="cont_grid4 lgmt" data-resort="${npyStation}" data-img="${npyBackground}" data-lgmt="${npyUrl}" data-titre="${nom}" data-type="${npyType}" data-loc="${npyLoc}"><div class="cont_grid_item"><div class="cont_grid_img"><img class="npyImage" /></div><div class="cont_grid_text"><h3 class="cont_title cont_title3">${nom}</h3></div></div></div>`;
            let textnode = document.createElement('div');
            textnode.innerHTML = item;  
            npyWrapper.appendChild(textnode);
            }

            else{}
         } 

         let createdItems = document.querySelectorAll('.lgmt');
         let createdImages= Array.from(document.querySelectorAll('.npyImage'));
         let itemLocs =Array.from(document.querySelectorAll('.cont_grid_text'));

         for (var i = 0; i < createdItems.length; i++) {
            let type = createdItems[i].dataset.type;
            let loc = createdItems[i].dataset.loc;
            let image = createdItems[i].dataset.img;
            createdImages[i].src= 'img/'+image;
            
            let itemLocsLieu = `<div class="cont_grid_baseline lieu"><img src="https://www.n-py.com/sites/n-py/files/commons/0_ICONES/gps.png"/><b>${loc}</b></div>`;
            let itemLocsType =`<div class="cont_grid_baseline type"><img alt="" src="https://www.n-py.com/sites/n-py/files/commons/0_ICONES/gps.png" /><b>${type}</b></div>`;
            let itemLocsNodeLieu = document.createElement('div');
            let itemLocsNodeType = document.createElement('div');
            itemLocsNodeLieu.innerHTML = itemLocsLieu;
            itemLocsNodeType.innerHTML= itemLocsType;
            itemLocs[i].appendChild(itemLocsNodeLieu);
            itemLocs[i].appendChild(itemLocsNodeType);
            

         }



         


         createdItems.forEach(element => element.addEventListener("click",function(e){
            npyWidgetWrapper.innerHTML='';
            let npyUi = this.dataset.lgmt;
            let res = npyUi.substring(0, 4);
            console.log(res);
            if(res==='OSMB'){
              location.href = `https://www.n-py.com/fr/reservation?_wos=v2%2Cu%2C${npyUi}`;
            
            }
            else{
              let npyNom =this.dataset.titre;
            let widgetHtml = `<h2 class="home_title">${npyNom}</b></h2><div id="widget-produit-${npyUi}" ></div>`;
            let npyWidget = document.createElement('div');
            npyWidget.innerHTML = widgetHtml;
            npyWidgetWrapper.appendChild(npyWidget);
            let widgetProduit = AllianceReseaux.Widget.Instance( "Produit", { idPanier:npyIdPanier, idIntegration:npyIdIntegration, langue:"fr", ui:npyUi } );
            widgetProduit.Initialise();
            scrollToElement('widget_resa');
            }
         }));


}








 function scrollToElement(element){
    window.scroll({
              behavior: 'smooth',
              left: 0,
              // top gets the distance from the top of the page of our target element
              top: document.getElementById(element).offsetTop
            });
};


//Definition Duree
resortButtons.forEach(element => element.addEventListener('click', function(e){
let chosenResort= this.dataset.resort;
for (var i = 0; i < resortButtons.length; i++) {
    resortButtons[i].classList.remove('active');
}
this.classList.add('active');
filterItemsByResort(chosenResort);

//document.querySelector('iframe').src=`https://www.n-py.com/fr/${chosenResort}`;


}));