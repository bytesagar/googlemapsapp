window.onload = () =>{
    displayStores();
    showStoresMarkers();
}

var map;
var infoWindow;
var markers = [];

function initMap() {
    var kathmandu    = {
        lat: 27.7172, 
        lng: 85.3240
    };
   

    var styledMapType = new google.maps.StyledMapType(
        [
          {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
          {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
          {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
          {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{color: '#c9b2a6'}]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'geometry.stroke',
            stylers: [{color: '#dcd2be'}]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{color: '#ae9e90'}]
          },
          {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#93817c'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [{color: '#a5b076'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#447530'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#f5f1e6'}]
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{color: '#fdfcf8'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#f8c967'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#e9bc62'}]
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [{color: '#e98d58'}]
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.stroke',
            stylers: [{color: '#db8555'}]
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{color: '#806b63'}]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.fill',
            stylers: [{color: '#8f7d77'}]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#ebe3cd'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{color: '#b9d3c2'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#92998d'}]
          }
        ],
        {name: 'Styled Map'});

        map = new google.maps.Map(document.getElementById('map'), {
            center: kathmandu,
            zoom: 11,
            mapTypeId: 'roadmap',
            mapTypeControlOptions: {
              mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                      'styled_map']
            }
           
          });
          map.mapTypes.set('styled_map', styledMapType);
          map.setMapTypeId('styled_map');
    infoWindow = new google.maps.InfoWindow();
    
    showStoresMarkers();
}

function displayStores(){
    var storesHtml = '';
    for (var [index,store] of stores.entries()){
        var address  = store['addressLines'];
        var phone = store['phoneNumber'];

    storesHtml += `
    <div class="store">
        <div class="store-info-container">
            <div class="store-address">
              <span>${address[0]}</span>
              <span>${address[1]}</span>
            </div>
            <div class="store-phone-number">
             ${phone}
            </div>
        </div>
            <div class="store-number-container">
              <div class="store-number">
                ${index+1}
              </div>
         </div>
    </div>
        `
        document.querySelector('.stores-list').innerHTML = storesHtml;
        
    }


}

function showStoresMarkers(){
    var bounds = new google.maps.LatLngBounds();
    for (var [index,store] of stores.entries()){
        var latLng = new google.maps.LatLng(
            store["coordinates"]["latitude"],
            store["coordinates"]["longitude"]
        );
        var name = store['name'];
        var address = store['addressLines'][0];
        var openTime = store['openStatusText'];
        var phoneNumber = store['phoneNumber'];
        bounds.extend(latLng);
        createMarker(latLng,name,address,openTime,phoneNumber,index+1)
    }
    map.fitBounds(bounds);




}

function createMarker(latLng,name,address,openTime,phoneNumber,index){
    var html = `
    <div class="infoWindow">
    <div class="top">
      <span>${name}</span>
    <span>${openTime}</span>
    </div>
    <div class="info-sep">
        <div class="infoWindow-container">
         <i class="fas fa-map-marker-alt"></i>
         ${address}
        </div>
        <div class="infoWindow-container">
        <i class="fas fa-phone"></i>
         ${phoneNumber}
        </div>
    
    </div>
  </div>
    `;

    var myMarker = new google.maps.Marker({
        position: latLng,
        map: map,
        label: index.toString(),
        icon: './icons8-marker-48.png',
    });
    

    google.maps.event.addListener(myMarker, 'click', function(e) {
        infoWindow.setContent(html);
        infoWindow.open(map, myMarker);
      });
    markers.push(myMarker);
    
}


    

   

 
