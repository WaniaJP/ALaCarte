//Clef API
const clefData= "I3pRDAzQwhWKUL3lq56eVlgMgfnxQYhK";
const limit = 100;
const rad = 20000;
const lang = "fr-FR";
const pois = "all";
const cat = 7315;
const vue= "Unified";
const pays = "France";

const url1Data = "https://api.tomtom.com/search/2/categorySearch/";
const url2Data = ".json?";


//Clef API
const clefTrad="c5135be1-5dbd-1ee7-e30f-e2b6dd1e021b:fx";

const sourceLang = "FR";
const targetLang = "EN";
const urlTrad = "https://api-free.deepl.com/v2/translate?";
//configuration de la carte
const config = {
  minZoom: 9,
  maxZoom: 18,
};

//île de la cité
const defaultPosition = {
  lat: 48.854,
  lon: 2.347,
};

//Position actuelle
var positionCenter = {lat: 0, lon: 0};

//Position actuelle
var positionLocalisation = {lat: 0, lon: 0};

//la carte
var map;

//l'ensemble des restos
var allRestoByType = new Map();

//La recherhce en cours
var search = "";

class Restaurant{
  #nom;
  #adresse;
  #phone;
  #url;
  #id;
  position;
  categories;
  constructor(nom, adresse, phone, url, position, categories, id){
      this.#nom = nom;
      this.#adresse = adresse;
      this.#phone = phone;
      this.#url = url;
      this.position = position;
      this.categories = categories;
      this.#id = id;
  }

  get nom(){
    return this.#nom;
  }

  get adresse(){
    return this.#adresse;
  }

  get phone(){
    return this.#phone;
  }

  get url(){
    return this.#url;
  }

  get position(){
    return this.position;
  }

  get categories(){
    return this.categories;
  }

  get lat(){
    return this.position.lat;
  }

  get lng(){
    return this.position.lon;
  }

  get id(){
    return this.#id;
  }

  appartientACeType(type){
      for(let i = 0; i < this.categories.length; ++i){
          if(type === this.categories[i]){
              return true;
          }
      }
      return false;
  }

  toString(){
    return "".concat(this.#nom," ",this.#adresse);
  }
};

var bouttonD;
var bouttonA;

function intialisationBoutton(){
  bouttonD = $(".disabled");
  bouttonA = $(".rechercher");

  bouttonA.click(desactiver);
}

function desactiver(){
  bouttonD.removeClass("disabled");
  $(this).addClass("disabled");
  bouttonD = $(".disabled");
  bouttonA = $(".rechercher");

  bouttonD.click(activer);
}

function activer(){
  $(this).removeClass("disabled");
  bouttonD = $(".disabled");
  bouttonA = $(".rechercher");
  bouttonA.click(desactiver);
  search = "";
  recuperationRestaurant();
}

$(document).ready(intialisation);

function intialisation(){
  //Appel de la carte
  map = L.map("map", config).setView([defaultPosition.lat, defaultPosition.lon], config.maxZoom-config.minZoom);

  //Affichage de la carte
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);


  
  intialisationBoutton();
  activateLocalisation();
  showMesure();
  createLegend();
  intialisationEventCenter();

  $(".rechercher").click(hum);
  $("#search").click(rechercher);
  $("#bloc2").hide();
}

function rechercher(){
  translate($("#fsearch").val());
}

function routeSettings(){
  $(".leaflet-routing-geocoder input[placeholder='Arrivée']").prop("disabled", true);
  $(".leaflet-routing-remove-waypoint, .leaflet-routing-add-waypoint").hide();
}

function translate(mot){
  let parameter = {}
  parameter.text = mot;
  parameter.source_lang = sourceLang;
  parameter.target_lang = targetLang;
  parameter.auth_key = clefTrad;
  $.ajax({
    type: "POST",
    url: urlTrad,
    data: parameter,
    dataType: "JSON",
    success: function(resultat){
      search = resultat.translations[0].text;
      removeall();
      recuperationRestaurant();
    },
    error: function(resultat){
      console.log(resultat);
    }
  });
}

function hum(){
  search = $(this).attr("name");
  removeall();
  recuperationRestaurant();
}

function intialisationEventCenter(){
  // on drag end
  map.on("dragend", updateInfo);

  // on zoom end
  map.on("zoomend", updateInfo);

  // update info about bounds when site loaded
  updateInfo();
}

function showMesure(){
  //Affiche la mesure
  L.control
  .scale({
    imperial: false,
  })
  .addTo(map);
}

function createLegend(){
  let legend = L.control({ position: "bottomleft" });

  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "description");
    L.DomEvent.disableClickPropagation(div);
    let text =
      "<div class='legend'><b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book...</div>";
    div.insertAdjacentHTML("beforeend", text);
    return div;
  };
  legend.addTo(map);
}

function activateLocalisation(){
  //Activer la localisation
  map.locate({
    setView: true,
    enableHighAccuracy: true,
  })
  // si la localisation est trouvée --> on place à position de l'utilisateur
  .on("locationfound", (e) => {
    map.setView([e.latitude, e.longitude], map.getZoom());
    positionCenter.lat = e.latitude;
    positionCenter.lon = e.longitude;

    positionLocalisation.lat = e.latitude;
    positionLocalisation.lon = e.longitude;
  })
  // Si la localisation n'est pas trouvée --> on place sur l'île de la cité
  .on("locationerror", (e) => {
    console.log(e);
    map.setView([defaultPosition.lat, defaultPosition.lon], map.getZoom());
    positionCenter.lat = defaultPosition.lat;
    positionCenter.lon = defaultPosition.lon;

    positionLocalisation.lat = defaultPosition.lat;
    positionLocalisation.lon = defaultPosition.lon;
  });
}

function modeRoute(){
  $("#bloc").hide();
  $("#bloc2").show();
  $(".leave").on("click", quitterModeRoute);
}

function quitterModeRoute(){
  $("#bloc").show();
  $("#bloc2").hide();
  $(".leave").off("click", quitterModeRoute);
  removeRoute();
}

function recuperationRestaurant(){
  var parameter= {}
  parameter.limit = limit;
  parameter.countrySet = pays;
  parameter.lat = positionCenter.lat;
  parameter.lon = positionCenter.lon;
  //parameter.radius =rad;
  parameter.language = lang;
  parameter.categorySet = cat;
  parameter.view = vue;
  parameter.relatedPois = pois;
  parameter.key = clefData;
  parameter.typehead = true;

  var url = url1Data + search + url2Data;
  $.ajax({
    type: "GET",
    url: url,
    data: parameter,
    dataType: "JSON",
    success: function(resultat){
      afficher(resultat.results);
    },
    error: function(resultat){
      console.log(resultat);
    }
  });
}

function enregistrer(){

  restoRoute = restaurants.get($(this).attr("name"));

  let parameter = {};
  parameter.nom = restoRoute.nom;
  parameter.adresse = restoRoute.adresse;

  
  $.ajax({
    type: "POST",
    url: "./../php/enregistrerRestaurants.php",
    data: parameter,
    dataType: "JSON",
    success: function(resultat){
      console.log("coucou");
    },
    error: function(resultat){
      console.log(resultat);
    }
  });

}

const buttonRemove =
  "<button type='button' class='routeSearch'>S'y rendre</button>";


const customPopup1 = '<div class="popup"> <div class="infoPopUp"> <img> <div class="infoRestoPopUp"> <p class="nomResto">';
const customPopup2 = '</p> <p class="adresseResto">';
const customPopup3 = '</p> </div></div>' 
const customPopup4 ='<button type="button" class="routeSearch" name=';
const customPopup5 = '> En route !</button></div>';
const customPopup7 = '<button type="button" class="enregistrer" name = ';
const customPopup8 = '>Ajouter</button></div>';
// specify popup options
const customOptions = {
  maxWidth: "auto", // set max-width
  className: "customPopup", // name custom popup
};

const couleurMarker = "#BDD3D3";
var markers = [];
var restaurants = new Map();
function afficher(r){
  for(let i = 0; i < r.length; i++){
    if(r[i].id != idResto){
      marker = L.marker([r[i].position.lat,r[i].position.lon], {icon : colorMarker(couleurMarker)})
      .bindPopup(customPopup1 +r[i].poi.name + customPopup2 + r[i].address.freeformAddress + customPopup3 + customPopup4 + r[i].id+ customPopup5 + customPopup7 + r[i].id+ customPopup8)
      .on("popupopen", routeMarker)
      .addTo(map);
      markers.push(marker);
      restaurants.set(r[i].id, new Restaurant(
        r[i].poi.name, 
        r[i].address.freeformAddress,
        r[i].poi.phone,
        r[i].poi.url,
        r[i].position,
        r[i].poi.categories,
        r[i].id
        ))
    }
  }
}

function colorMarker(color) {
  const svgTemplate = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker">
      <path fill-opacity=".25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/>
      <path stroke="#fff" fill="${color}" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/>
    </svg>`;

  const icon = L.divIcon({
    className: "marker",
    html: svgTemplate,
    iconSize: [40, 40],
    iconAnchor: [12, 24],
    popupAnchor: [7, -16],
  });

  return icon;
}

function routeMarker() {
  $(".routeSearch").on("click", clique);
  $(".enregistrer").on("click", enregistrer);
}

var route;
var restoRoute;
var idResto;

const couleurDepart = "#BBCB9D";
const couleurArrive = "#41240F";
const couleurLigne = "#F3471E";
function clique(){
  modeRoute();
  removeRoute();
  //console.log($(this).attr("name"));
  restoRoute = restaurants.get($(this).attr("name"));
  console.log(restoRoute.id);
  idResto = restoRoute.id;
  route = L.Routing.control({
    waypoints: [
      L.latLng(positionLocalisation.lat, positionLocalisation.lon),
      L.latLng(restoRoute.lat, restoRoute.lng)
    ],
    geocoder: L.Control.Geocoder.nominatim(),
    routeWhileDragging: true,
    language:'fr',
    lineOptions: {
      styles: [{color: couleurLigne, opacity: 1, weight: 5}]
   },
    createMarker: function (i, start, n){
      var marker_icon = null
      if (i == 0) {
          // This is the first marker, indicating start
          var marker = L.marker (start.latLng, {
            draggable: true,
            icon : colorMarker(couleurDepart)
          });
          return marker;
      } else if (i == n -1) {
          var marker = L.marker (start.latLng, {
            draggable: false,
            icon : colorMarker(couleurArrive)
          });
          marker.bindPopup(customPopup1 +restoRoute.nom + customPopup2 + restoRoute.adresse + customPopup3);
          return marker;
      }
    }
    
  }).addTo(map);

  routeSettings();
}

function removeRoute(){
  if(route != undefined){
    map.removeControl(route);
  }
}

function removeall(){
  for(let i = 0; i < markers.length; ++i){
    map.removeLayer(markers[i]);
  }
  markers = [];
}

function trierRestaurant(resto){
  for(let i = 0; i < resto.length; i++){
    var tmp = new Restaurant(
      resto[i].poi.name, 
      resto[i].address.freeformAddress,
      resto[i].poi.phone,
      resto[i].poi.url,
      resto[i].position,
      resto[i].poi.categories
      );

    for(let cat = 0; cat < tmp.categories.length; cat++){
      if(!allRestoByType.has(tmp.categories[cat])){
        allRestoByType.set(tmp.categories[cat], new ensembleRestaurant(tmp.categories[cat]));
      }

      allRestoByType.get(tmp.categories[cat]).addRestaurant(tmp);
    }
  }
  console.log(allRestoByType);
  createMarkerGroup();
}

function updateInfo() {
  const { lat, lng } = map.getCenter();
  positionCenter.lat = lat;
  positionCenter.lon = lng;
  removeall();
  recuperationRestaurant();
}

// set center map
function clickZoom(e) {
  map.setView(e.target.getLatLng(), map.getZoom());
}