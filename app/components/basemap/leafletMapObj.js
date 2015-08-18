/**
 * Created by serdaradali on 7/22/15.
 */

angular.module('stuart_dispatch')
    .factory('leafletMapObj',['DriverStatusTypes','TransportTypes','Cities',
        function(DriverStatusTypes,TransportTypes,Cities){
            this.map = {};

            var updateMapCenter = function(lat,lng){
                this.map.setView([lat, lng]);
            }

            return {
                map: this.map,
                updateMapCenter: updateMapCenter
            }
        }]);