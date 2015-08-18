/**
 * Created by Sedar on 18/06/2015.
 */


angular.module('stuart_dispatch')
    .controller('mapController',['mapBoxObj','tracking', 'invitationConnector',
        function(mapBoxObj, tracking, invitationConnector){
            var map = mapBoxObj.basemap();

            tracking.startTracking();
            invitationConnector.trackInvitations();

    }]);