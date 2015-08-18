/**
 * Created by Sedar on 19/06/2015.
 */

angular.module('stuart_dispatch')
    .factory('invitation',['$http', 'StatusColors', 'InvitationStatusTypes','TransportTypes',
        function($http, StatusColors, InvitationStatusTypes, TransportTypes){

        // Create an invitation marker
        var createInvitation = function(id, pLat, pLng, time_created, transport, status, client_name){

            var invitation = {};

            //var createdTime = time_created.slice(time_created.indexOf('T')+1,time_created.indexOf('+'));
            //var createdDay = time_created.slice(0,time_created.indexOf('T'));

            var dateCreated = new Date(time_created.slice(0,time_created.indexOf('+')));
            var today = new Date();
            var diff = (today.getTime() - dateCreated.getTime());
            diffInMins = Math.round(diff / 60000); // minutes

            invitation.status = status;

            var tooltipContentClient = '<p style="text-align: center;">'+ '<a href="http://beta-backoffice.stuart.fr/job/">'
                + TransportTypes[transport] + ' request </a>' + '</p>' +
                '<p style="text-align:center;>' + '<span style="color:' + StatusColors[status-1] + ';">' +
                InvitationStatusTypes[status-1] + '</span>' + ' ' + diffInMins + ' mins ago.' +  '</p>';

            var tooltipContentDriver = "";



            invitation.marker = L.marker(L.latLng(pLat,pLng), {
                icon: L.icon({ // use L.divIcon instead of L.icon and uncomment className to use sprites
                        iconUrl: 'assets/img/Invitation'+ InvitationStatusTypes[status-1] + '.png',
                        iconSize: [18,40],
                        popupAnchor:[0,-20]}),
                title: id
            })
                .bindPopup(tooltipContentClient,{
                    closeButton: true,
                    minWidth: 160
                })
                .on('mouseover',function(e){
                        this.openPopup();
                })
                .on('mouseout',function(e){
                    this.closePopup();
                })

            return invitation;
        }

        var removeFromMap = function(id){

        }

        return {
            createInvitation: createInvitation
        }

    }]);