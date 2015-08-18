/**
 * Created by Sedar on 12/06/2015.
 */

angular.module('stuart_dispatch')
    .factory('delivery',[function(){

        var createDelivery = function(desintation, pickupPath, deliveryPath, driverId, status, eta, edt, amount){

            var delivery = {};

            delivery.pickupPath = pickupPath;
            delivery.deliveryPath = deliveryPath;

            delivery.driverId = driverId;
            delivery.status = status;
            delivery.eta = eta;
            delivery.edt = edt;
            delivery.amount = amount;


            var tooltipContentClient = '';

            var tooltipContentDriver = "";



            delivery.marker = L.marker(L.latLng(pLat,pLng), {
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

            return delivery;

        }

        var cancelDelivery = function(){
            this.status = 'cancelled';
        }

        return {
            createDelivery: createDelivery
        }

    }]);