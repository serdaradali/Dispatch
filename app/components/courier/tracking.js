/**
 * Created by Sedar on 18/06/2015.
 * Controls the courier tracking services
 * Gets active/busy/idle drivers from our system
 * Stores them in the courierMarkerArray object array
 */

angular.module('stuart_dispatch')
    .factory('tracking',['Urls', '$q', '$http', 'courier', 'DriverStatusTypes','TransportTypes',
        'trackingStatus','leafletMapObj','DriverStatusColors','stats','Cities','$interval','DriverPage',
        function(Urls, $q, $http, courier, DriverStatusTypes, TransportTypes,
                 trackingStatus, leafletMapObj, DriverStatusColors, stats, Cities, $interval, DriverPage){

            var courierMarkerArray = {}, // marker array for all drivers
                driverMarkerLayerGroups = L.mapbox.featureLayer(),
                driverCountsByStatus = [],
                driverCountsByTransport = [];


            var IDLE = 2, OFF = 1, BUSY = 3;

            var promiseArr = [];

            var ACTIVE_DRIVER_UPDATE_POS = 2000,
                OFFDUTY_DRIVER_UPDATE_POS = 10000,
                ONDUTY_DRIVER_UPDATE_POS = 2000; // in miliseconds

            driverCountsByStatus[1] = 0;
            driverCountsByStatus[2] = 0;
            driverCountsByStatus[3] = 0;
            driverCountsByStatus[4] = 0;

                driverCountsByTransport.Walk = 0;
                driverCountsByTransport.Bike = 0;
                driverCountsByTransport.Moto = 0;
                driverCountsByTransport.Car = 0;
                driverCountsByTransport.Van = 0;

                // gets couriers with courierStatus,
                var getCouriers = function (activeStatus, selectedCityId)
                {

                    var requestObj = {
                    url: Urls.drivers,
                    method: "GET",
                    /*headers: {
                     'x-channel': 'Dispatch'//Basic c3R1YXJ0OnN0dWFydGJjbg=='
                     },*/
                    params: {
                        limit: 1000,
                        status: activeStatus, // 1: Offline, 2: Idle, 3: Busy
                        cityId: selectedCityId // 1 for Paris
                    }
                };


                var promise = $http(requestObj).then(function (response) {
                    var respData = response.data;
                    var courierCount = Object.keys(respData).length;

                    // reset the count to zero everytime we get the new list of drivers
                    driverCountsByStatus[response.config.params.status] = 0;
                    if(response.config.params.status == 3){
                        driverCountsByStatus[4] = 0;
                    }

                    var driver_status = 1;


                    for(var i=0;i<courierCount;i++){
                        var courierData = respData[i];

                        if(courierData.currentDriverDevice !== null) {
                            var name = courierData.firstname + (courierData.lastnameInitial ? (' '+ courierData.lastnameInitial) : "");
                            var id = courierData.id;
                            if(!courierData.currentDriverWorkMode){
                                console.log(courierData);
                            }
                            var transport_id = courierData.currentDriverWorkMode.transportType.id;
                            var courierLastLocation = courierData.currentDriverDevice.lastDriverDeviceLocation; // which last driver location to use?
                            var status_id = courierData.lastDriverStatus.driverStatusType.id;
                            driver_status = status_id;
                            driverCountsByTransport[TransportTypes[transport_id-1]]++;
                            if (courierData.currentDelivery) {
                                var job_id = courierData.currentDelivery.id;
                                var delivery_status_id = courierData.currentDelivery.lastDeliveryStatus.deliveryStatusType.id;
                                //Check if it is
                                if(delivery_status_id == 1){ // if it is picking
                                    status_id = 4;
                                }
                            }


                            driverCountsByStatus[status_id]++;

                            // if driver does not exist, create it
                            if (!courierMarkerArray[id]) {
                                // Create the driver marker
                                courierMarkerArray[id] = courier.createCourier(name, transport_id, courierData.id, courierLastLocation.latitude, courierLastLocation.longitude, status_id, job_id);
                            }
                            else { // if exists
                                if(activeStatus != 1) { // update its position only if it is not an offline driver

                                    courierMarkerArray[id].marker.setLatLng(L.latLng(courierLastLocation.latitude, courierLastLocation.longitude));
                                    if(courierMarkerArray[id].geoJSON.properties.isTracking){
                                        leafletMapObj.updateMapCenter(courierLastLocation.latitude, courierLastLocation.longitude);
                                    }

                                }
                                if(status_id != courierMarkerArray[id].geoJSON.properties.status_id) { // status changed

                                    // update its status id
                                    courierMarkerArray[id].geoJSON.properties.status_id = status_id;

                                }
                            }
                        }
                    }

                    // Because the order of layers on leaflet control is not as we put it, we need to dynamically find layer indexes
                    $('.leaflet-control-layers-overlays span').map(function(index,data){
                        var found = false;
                        for(var j=0; j<DriverStatusTypes.length && !found;j++){
                            if($(this).text().includes(DriverStatusTypes[j])){
                                $(this).text(' '+ DriverStatusTypes[j]+ ' (' +
                                    driverCountsByStatus[j+1] + ')');
                                found = true;
                            }
                        }
                    })

                }).catch(function (data) {
                    console.log("Error: request returned status " + data.status);
                })

                return promise;
            }

            // wait for drivers with all statuses are called to set transport type counts, to avoid the flickering effect
            var updateTransportCount = function(data) {
                $('#leaflet-control-layers-group-2 label span').map(function(index,data){
                    var found = false;
                    for(var j=0; j<TransportTypes.length && !found;j++){
                        if($(this).text().includes(TransportTypes[j])){
                            $(this).text(' '+ TransportTypes[j]+ ' (' +
                                driverCountsByTransport[TransportTypes[j]] + ')');
                            found = true;
                        }
                    }
                });

                driverCountsByTransport.Walk = 0;
                driverCountsByTransport.Bike = 0;
                driverCountsByTransport.Moto = 0;
                driverCountsByTransport.Car = 0;
                driverCountsByTransport.Van = 0;
            }

            var resetAllLayers = function(){
                courierMarkerArray = {};
                driverMarkerLayerGroups = L.mapbox.featureLayer();

            }

            var startTracking = function(){
                promiseArr.push(getCouriers(IDLE,Cities.getSelectedCity().id));
                promiseArr.push(getCouriers(OFF,Cities.getSelectedCity().id));
                promiseArr.push(getCouriers(BUSY,Cities.getSelectedCity().id));


                var stopOff = $interval(function() {
                    /*mapBoxObj.getMapObj().on('dataloading',function(){

                     })*/
                    promiseArr = [];
                    promiseArr.push(getCouriers(IDLE,Cities.getSelectedCity().id));
                    promiseArr.push(getCouriers(OFF,Cities.getSelectedCity().id));
                    promiseArr.push(getCouriers(BUSY,Cities.getSelectedCity().id));

                    $q.all(promiseArr).then(function(values){

                        // when all markers are done, add them as a layer
                        driverMarkerLayerGroups.setGeoJSON()

                        updateTransportCount();
                        //stats.totalDriverCount
                        //mapBoxObj.updateLayerControls();

                        stats.onGoingDeliveries = driverCountsByStatus[3];
                        stats.pickingDeliveries = driverCountsByStatus[4];


                        stats.busyRatio = ( ( driverCountsByStatus[3] + driverCountsByStatus[4]) / (driverCountsByStatus[4] + driverCountsByStatus[3] + driverCountsByStatus[2])) * 100;
                        stats.busyRatio = Math.floor(stats.busyRatio);

                        //mapBoxObj.getMapObj().spin(false);

                        /*mapBoxObj.getMapObj().on('dataload',function(){

                         })*/
                    });

                    // when all these calls are finished, reset every layer

                    //tracking.resetAllLayers();
                }, OFFDUTY_DRIVER_UPDATE_POS);

                $q.all(promiseArr).then(function(values){

                    updateTransportCount();
                    stats.onGoingDeliveries = driverCountsByStatus[3];
                    stats.pickingDeliveries = driverCountsByStatus[4];

                    stats.busyRatio = ( (driverCountsByStatus[4] + driverCountsByStatus[3]) / (driverCountsByStatus[4] + driverCountsByStatus[3] + driverCountsByStatus[2])) * 100;
                    stats.busyRatio = Math.floor(stats.busyRatio);
                    //mapBoxObj.updateLayerControls();

                    //mapBoxObj.getMapObj().spin(false);

                    /*mapBoxObj.getMapObj().on('dataload',function(){

                     })*/
                });
            }

            return {
                startTracking: startTracking,
                getCouriers: getCouriers,
                driverMarkerLayerGroups: driverMarkerLayerGroups,
                driverCountsByStatus: driverCountsByStatus,
                resetAllLayers: resetAllLayers,
                updateTransportCount: updateTransportCount,
                courierMarkerArray: courierMarkerArray
            }

    }]);
