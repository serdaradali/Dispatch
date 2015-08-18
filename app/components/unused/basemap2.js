/**
 * Created by serdaradali on 7/17/15.
 */
/**
 * Created by Sedar on 12/06/2015.
 */


angular.module('stuart_dispatch')
    .factory('mapBoxObj',['DriverStatusTypes','TransportTypes','Cities',
        function(DriverStatusTypes,TransportTypes,Cities){

            var map = {};

            var driverMarkerLayer = {}, // this will hold all the markers for drivers
                invitationsMarkerLayer = {},
                driverMarkerArr = {}; // layer for invitation markers

            var driverMarkerObjs = {
                type: 'FeatureCollection',
                features: []
            };

            var getMapObj = function() {
                return map;
            }

            var basemap = function() {
                L.mapbox.accessToken = 'pk.eyJ1IjoicGV0ZXJxbGl1IiwiYSI6ImpvZmV0UEEifQ._D4bRmVcGfJvo1wjuOpA1g';

                var currentCity = Cities.defaultCity();
                map = L.mapbox.map('map', 'mapbox.light',{fullscreenControl: true})
                    .setView([currentCity.center.lat, currentCity.center.lng], currentCity.center.zoom);
                map.scrollWheelZoom.disable();

                // initialize marker layer
                driverMarkerLayer = L.mapbox.featureLayer().addTo(map);

                invitationsMarkerLayer = L.mapbox.featureLayer().addTo(map);

                // bind popup events
                driverMarkerLayer.on('mouseover', function(e) {
                    e.layer.openPopup();
                });
                driverMarkerLayer.on('mouseout', function(e) {
                    e.layer.closePopup();
                });

                // bind popup events
                invitationsMarkerLayer.on('mouseover', function(e) {
                    e.layer.openPopup();
                });
                invitationsMarkerLayer.on('mouseout', function(e) {
                    e.layer.closePopup();
                });

                // bind custom icons to markers
                driverMarkerLayer.on('layeradd', function(e) {
                    var marker = e.layer,
                        feature = marker.feature;

                    marker.setIcon(L.icon(feature.properties.icon));
                });

                // bind custom icons to markers
                invitationsMarkerLayer.on('layeradd', function(e) {
                    var marker = e.layer,
                        feature = marker.feature;

                    marker.setIcon(L.icon(feature.properties.icon));
                });

                return map;
            }

            // Generic marker adding method
            /*
             *** Adds m_obj to the map,
             */
            var addMarker = function(mIcon,m_obj) {
                var courierMarker = L.marker(L.latLng(m_obj.position.lat,m_obj.position.lng), {
                    icon: L.icon(mIcon)
                })
                    .bindPopup('<p>'+m_obj.name+'</p>'+'<p>'+TransportTypes[m_obj.transport]+'</p>'+'<p>'+DriverStatusTypes[m_obj.status]+'</p>')
                    .on('mouseover',function(e){
                        this.openPopup();
                    });

                courierMarker.addTo(map);

                return courierMarker;
            }

            var addMarkerGeoJSON = function(title,m_obj) {
                driverMarkerObjs.features.push({
                    type: 'Feature',
                    properties: {
                        title: title,
                        icon: m_obj.icon,
                        'marker-id': m_obj.id
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [m_obj.position.lng,m_obj.position.lat]
                    }
                });
                driverMarkerLayer.setGeoJSON(driverMarkerObjs);

            }

            function findMarkerById (id){
                var currMarker = null;
                var driverCount = driverMarkerObjs.features.length;
                var markerFound = false;
                for(var i=0; i<driverCount && !markerFound; i++){
                    var currId = +driverMarkerObjs.features[i].properties['marker-id'];
                    if(currId == id){
                        markerFound = true;
                        currMarker = driverMarkerObjs.features[i];
                    }
                }
                return currMarker;
            }

            // changes driver marker status & Icon due to change in driver Status.
            var changeMarkerStatus = function(m_obj) {
                var currMarker = findMarkerById(m_obj.id);
                currMarker.properties.icon = m_obj.icon;
                currMarker.properties.title = '<p>'+m_obj.name+'</p>' + '<p>'+DriverStatusTypes[m_obj.status]+'</p>';
            }

            var deleteMarker = function(id){
                var currMarker = findMarkerById(m_obj.id);
            }

            var changeMapCenter = function(newCenter){
                map.setView(new L.LatLng(newCenter.lat, newCenter.lng), newCenter.zoom);
            }

            return {
                basemap: basemap,
                getMapObj: getMapObj,
                addMarker: addMarker,
                addMarkerGeoJSON: addMarkerGeoJSON,
                changeMapCenter: changeMapCenter
            }

        }]);