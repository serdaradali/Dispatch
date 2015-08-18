/**
 * Created by Sedar on 12/06/2015.
 */


angular.module('stuart_dispatch')
    .factory('mapBoxObj',['DriverStatusTypes','TransportTypes','Cities', 'tracking', 'leafletMapObj','trackingStatus',
        'invitationConnector', 'filters',
        function(DriverStatusTypes,TransportTypes,Cities, tracking, leafletMapObj, trackingStatus, invitationConnector, filters){

            var map = {};

            var controlSearch = {};

            var groupedOverlays = {
                "Drivers_by_Status": {
                    "OffDuty": tracking.driverMarkerLayerGroupsByStatus[1],
                    "OnDuty": tracking.driverMarkerLayerGroupsByStatus[2],
                    "Delivering": tracking.driverMarkerLayerGroupsByStatus[3],
                    "Picking": tracking.driverMarkerLayerGroupsByStatus[4]
                },
                "Drivers_by_Transport": {
                    "Walk": tracking.driverMarkerLayerGroupsByTransport.Walk,
                    "Bike": tracking.driverMarkerLayerGroupsByTransport.Bike,
                    "Moto": tracking.driverMarkerLayerGroupsByTransport.Moto,
                    "Car": tracking.driverMarkerLayerGroupsByTransport.Car,
                    "Van": tracking.driverMarkerLayerGroupsByTransport.Van
                }
            }


            var baseLayers = {},
                layerControl = {};


            var getMapObj = function() {
                return map;
            }

            var basemap = function() {
                L.mapbox.accessToken = 'pk.eyJ1IjoicGV0ZXJxbGl1IiwiYSI6ImpvZmV0UEEifQ._D4bRmVcGfJvo1wjuOpA1g';
                baseLayers = {
                    "Standard": L.mapbox.tileLayer('mapbox.light'),
                    "HotSpots": L.mapbox.tileLayer('mapbox.dark')
                };

                var currentCity = Cities.defaultCity();
                map = L.mapbox.map('map', null,
                    {
                        fullscreenControl: true,
                        loadingControl: false,
                        scrollWheelZoom: false
                    })
                    .setView([currentCity.center.lat, currentCity.center.lng], currentCity.center.zoom);

                //map.fitBounds(polyline.getBounds());

                // Default base layer is the standard layer
                baseLayers.Standard.addTo(map);

                //map.spin(true);

                groupedOverlays.Drivers_by_Status.OnDuty.addTo(map);
                groupedOverlays.Drivers_by_Status.Delivering.addTo(map);
                groupedOverlays.Drivers_by_Status.Picking.addTo(map);

                // add filters to filter object
                filters.status.push('OnDuty');
                filters.status.push('Delivering');
                filters.status.push('Picking');

                /*groupedOverlays.Drivers_by_Transport.Walk.addTo(map);
                groupedOverlays.Drivers_by_Transport.Bike.addTo(map);
                groupedOverlays.Drivers_by_Transport.Moto.addTo(map);
                groupedOverlays.Drivers_by_Transport.Car.addTo(map);
                groupedOverlays.Drivers_by_Transport.Van.addTo(map);*/

                L.control.groupedLayers(baseLayers, groupedOverlays).addTo(map);

                // zoom to area control
                var control = L.control.zoomBox({
                    modal: true,  // If false (default), it deactivates after each use.
                                  // If true, zoomBox control stays active until you click on the control to deactivate.
                    // position: "topleft",
                    // className: "customClass"  // Class to use to provide icon instead of Font Awesome
                });
                map.addControl(control);


                // search by client control
                controlSearch = new L.Control.Search({layer: tracking.driverMarkerLayerGroupsAll, initial: false, position:'topright', zoom:map.getZoom()+1, animateLocation:false});
                map.addControl( controlSearch );


                // save map object to use elsewhere
                leafletMapObj.map = map;


                // highlight the found marker and start tracking it
                controlSearch.on('search_locationfound', function(e) {
                    var iconBig = L.divIcon({
                        className: 'driverIcon' + TransportTypes[tracking.courierMarkerArray[+e.text].transportId -1] + DriverStatusTypes[tracking.courierMarkerArray[+e.text].status-1],
                        iconSize: [51, 55],
                        popupAnchor:[0,-20]
                    });

                    // make this marker bigger
                    tracking.courierMarkerArray[+e.text].marker.setIcon(iconBig);
                    tracking.courierMarkerArray[+e.text].marker.openPopup();

                });

                // when clicked on any of the driver transportation filter layers
                $('#leaflet-control-layers-group-2 label input').map(function(i,d){
                    $(this).click(function(){
                        // filter all the status layers with transporatation status type
                        tracking.driverMarkerLayerGroupsByStatus.eachLayer();
                        if($this.checked) {
                            filters.transport.push(i); // add this transport
                        }
                    })
                });

                /*var loadingControl = L.Control.loading({
                 spinjs: true
                 });
                 //map.addControl(loadingControl);
                 */

                return map;
            }


            myLayer.on('layeradd', function(e) {
                var marker = e.layer,
                    feature = marker.feature;

                // Create custom popup content
                var popupContent =  '<a target="_blank" class="popup" href="' + feature.properties.url + '">' +
                    '<img src="' + feature.properties.image + '" />' +
                    feature.properties.city +
                    '</a>';

                // http://leafletjs.com/reference.html#popup
                marker.bindPopup(popupContent,{
                    closeButton: false,
                    minWidth: 320
                });
            });

            var updateOverlay = function(lName,lGroup){
                overlayMaps[lName] = lGroup;
            }

            var changeMapCenter = function(newCenter){
                map.setView(new L.LatLng(newCenter.lat, newCenter.lng), newCenter.zoom);
            }

            return {
                basemap: basemap,
                getMapObj: getMapObj,
                updateOverlay: updateOverlay,
                changeMapCenter: changeMapCenter
            }

    }]);