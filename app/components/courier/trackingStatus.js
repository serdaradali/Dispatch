/**
 * Created by serdaradali on 7/22/15.
 */

angular.module('stuart_dispatch')
    .factory('trackingStatus',[function(){
        var isTracking = false;

        var markerId = -1;

        var marker = null, icon = null;

        var markerLeafletId = -1;

        return {
            isTracking: isTracking,
            markerId: markerId,
            markerLeafletId: markerLeafletId,
            marker: marker,
            icon: icon
        }
    }]);