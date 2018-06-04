const cityElem = document.getElementsByClassName('info-city')[0];
const tempElem = document.getElementsByClassName('info-temp')[0];
const mapElem = document.getElementById('map');

let map;
let markers = [];
let latLng;
let imgSrc;
const haightAshbury = {lat: 49.233083, lng: 28.4682169};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: haightAshbury,
    });

    map.addListener('click', function(event) {
        deleteMarkers();
        getWeatherData(event.latLng.lat(), event.latLng.lng());
        console.log(imgSrc);
       
        
    });
    // addMarker(haightAshbury);
}


function getWeatherData(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=1b5ee5a1a74d624a74750350327ea372`)
        .then(function(response) {
            response.json().then(function(data) {
                imgSrc = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                cityElem.innerHTML = data.name + " ";
                tempElem.innerHTML =(data.main.temp - 273).toFixed(1) + " °C";
                 addMarker({lat, lng}, imgSrc);
            });
        });
}

function addMarker(location) {
    let marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: imgSrc,
        animation: google.maps.Animation.DROP
    });
    markers.push(marker);
}
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
}
function clearMarkers() {
    setMapOnAll(null);
}
function deleteMarkers() {
    clearMarkers();
    markers = [];
}