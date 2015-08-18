/**
 * Created by Sedar on 25/05/2015.
 */

/*
 Main factory for providing Stuart driver objects
 It is used to create stuart markers after Tracking gets driver data from servers
 */

angular.module('stuart_dispatch')
    .factory('courier',['Urls','TransportTypes','icons','utils','DriverStatusTypes','trackingStatus','DriverPage','DriverStatusColors','leafletMapObj',
        function(Urls,TransportTypes,icons,utils, DriverStatusTypes, trackingStatus, DriverPage, DriverStatusColors, leafletMapObj){

            var courier = {}; // main geojson point object for a driver

            // sets marker icon with correct status, transport type and size (small & large)
            courier.setIcon = function(){
                var iconSize = [];
                var size = 'S';
                if(!this.geoJSON.properties.isTracking){
                    iconSize = [25,27];
                }
                else{ // large icon for tracking
                    iconSize = [51,55];
                    size = '';
                }

                this.geoJSON.icon = L.divIcon({
                    className: 'driverIcon' + TransportTypes[this.geoJSON.properties.transport_id - 1] +
                                DriverStatusTypes[this.geoJSON.properties.status_id - 1] + size,
                    iconSize: iconSize,
                    popupAnchor:[0,-20]
                });
            }

            courier.updatePosition = function(newPos){
                //
            }

            // change the status id of driver, update its icon and its content
            courier.updateStatus = function(newStatusId){
                this.geoJSON.properties.status_id = newStatusId;

                this.setIcon();
            }

            // initializes the Driver marker object, fills it with the data coming from server
            var createCourier = function(full_name, transport_id, id, lat, lng, status, job_id){

                /*var driverLink = '<a style="padding-left:1em"' + ' href="' + DriverPage + id + '">' + full_name + '</a>';

                var tooltipContent = '<p style="text-align: center;">'+ driverLink + ' is ' + '<span style="color:'
                    + DriverStatusColors[status-1] + ';">' + DriverStatusTypes[status-1] + '</span></p>'; */

                courier.geoJSON = {
                    "type": "Feature",
                    "geometry": {
                        "coordinates": [lat, lng],
                        "type": "Point"
                    },
                    "properties": {
                        "id": id,
                        "job_id": job_id,
                        "transport_id": transport_id,
                        "status_id": status,
                        "isTracking": false
                    }
                }

                this.setIcon();

                return courier;
            }

        return {
            createCourier: createCourier
        }

    }]);
