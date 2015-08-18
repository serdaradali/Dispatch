/**
 * Created by Sedar on 12/06/2015.
 */


angular.module('stuart_dispatch')
    .factory('deliveryConnector',['$http','delivery','stats','Urls','Cities','$interval','leafletMapObj','DeliveryStatusColors','events',
        function($http, delivery, stats, Urls, Cities, $interval, leafletMapObj, DeliveryStatusColors, events){

            var invitationList = {};

            var promiseArr = [];

            var ON_GOING_DELIVERY_FREQ = 10000;

            // no courier assigned to these requests
            function getOnGoingDeliveries(selectedCityId){
                var deliveryReq = {
                    url: Urls.ongoing,
                    method: "GET",
                    headers: {
                     'x-channel': 'dispatch'//Basic c3R1YXJ0OnN0dWFydGJjbg=='
                     },
                    params: {
                        limit: 1000,
                        cityId: selectedCityId // 0 or 1
                    }
                };
                var promise = $http(deliveryReq).then(function (response) {
                    var deliveriesData = response.data;
                    var activeDeliveryCount = Object.keys(deliveriesData).length;

                }).catch(function (data) {
                    console.log("Error: request returned status " + data.status);
                })
                return promise;
            }

            function getDelivery(selectedCityId, jobId){
                var deliveryReq = {
                    url: Urls.ongoing,
                    method: "GET",
                    headers: {
                        'x-channel': 'dispatch'//Basic c3R1YXJ0OnN0dWFydGJjbg=='
                    },
                    params: {
                        limit: 100,
                        cityId: selectedCityId, // 0 or 1
                        jobId: jobId
                    }
                };

                var promise = $http(deliveryReq).then(function (response) {
                    var deliveryData = response.data;

                    var desintation = deliveryData[0].job.destinationPlace.address;
                    var pickupPath = deliveryData[0].suggestedPolylineToOrigin;
                    var deliveryPath = deliveryData[0].suggestedPolylineToDestination;
                    var statusPicked = deliveryData[0].deliveryStatusPicked;
                    var statusDelivered = deliveryData[0].deliveryStatusDelivered;
                    var eta = deliveryData[0].estimatedMinutesForPick;
                    var edt = deliveryData[0].estimatedMinutesToDeliver;
                    var driver_id = deliveryData[0].driver.id;
                    var delivery_id = deliveryData[0].id;

                    // draw the path if it is picking
                    if(pickupPath && !statusPicked) {
                        events.updateDeliveryTicker(1, DeliveryStatusColors[0], driver_id, delivery_id);
                        delivery.createDelivery(desintation, pickupPath, deliveryPath, 1, statusPicked, eta, edt); // this draws destination
                        // draw here
                        var waypoints = google.maps.geometry.encoding.decodePath(pickupPath);
                        var line_points = [];
                        var lenWP = waypoints.length;
                        var polyline_options = {
                            stroke: true,
                            weight: 20,
                            color: 'red',
                            fillColor: 'yellow',
                            opacity: 1,
                            fillOpacity: 1
                        };
                        for(var i=0; i<lenWP; i++){
                            line_points[i] = [waypoints[i].lat(), waypoints[i].lng()];
                        }

                        L.polygon(line_points, polyline_options).addTo(leafletMapObj.map);
                    }
                    else if(statusPicked && !statusDelivered) {
                        events.updateDeliveryTicker(2, DeliveryStatusColors[1], driver_id, delivery_id);
                        google.maps.geometry.encoding.decodePath(deliveryPath);
                    }
                    else if(statusPicked && statusDelivered){
                        events.updateDeliveryTicker(3, DeliveryStatusColors[2], driver_id, delivery_id);
                    }


                }).catch(function (data) {
                    console.log("Error: request returned status " + data.status);
                })
                return promise;
            }

            return {
                getDelivery: getDelivery
            }

        }]);