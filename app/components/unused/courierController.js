/**
 * Created by Sedar on 18/06/2015.
 */

angular.module('stuart_dispatch')
    .controller('courierController',['$scope','tracking','$interval','Cities','$q','mapBoxObj','stats',
        function($scope,tracking,$interval,Cities,$q, mapBoxObj, stats){

            var IDLE = 2, OFF = 1, BUSY = 3;

            var promiseArr = [];

            var ACTIVE_DRIVER_UPDATE_POS = 2000,
                OFFDUTY_DRIVER_UPDATE_POS = 10000,
                ONDUTY_DRIVER_UPDATE_POS = 2000; // in miliseconds

            promiseArr.push(tracking.getCouriers(IDLE,Cities.getSelectedCity().id));
            promiseArr.push(tracking.getCouriers(OFF,Cities.getSelectedCity().id));
            promiseArr.push(tracking.getCouriers(BUSY,Cities.getSelectedCity().id));


            var stopOff = $interval(function() {
                /*mapBoxObj.getMapObj().on('dataloading',function(){

                })*/
                promiseArr = [];
                promiseArr.push(tracking.getCouriers(IDLE,Cities.getSelectedCity().id));
                promiseArr.push(tracking.getCouriers(OFF,Cities.getSelectedCity().id));
                promiseArr.push(tracking.getCouriers(BUSY,Cities.getSelectedCity().id));

                $q.all(promiseArr).then(function(values){

                    tracking.updateTransportCount();
                    //stats.totalDriverCount
                    //mapBoxObj.updateLayerControls();

                    stats.onGoingDeliveries = tracking.driverCountsByStatus[3];
                    stats.pickingDeliveries = tracking.driverCountsByStatus[4];


                    stats.busyRatio = ( (tracking.driverCountsByStatus[3] + tracking.driverCountsByStatus[4]) / (tracking.driverCountsByStatus[4] + tracking.driverCountsByStatus[3] + tracking.driverCountsByStatus[2])) * 100;
                    stats.busyRatio = Math.floor(stats.busyRatio);

                    //mapBoxObj.getMapObj().spin(false);

                    /*mapBoxObj.getMapObj().on('dataload',function(){

                     })*/
                });

                // when all these calls are finished, reset every layer

                //tracking.resetAllLayers();
            }, OFFDUTY_DRIVER_UPDATE_POS);

            $q.all(promiseArr).then(function(values){

                tracking.updateTransportCount();
                stats.onGoingDeliveries = tracking.driverCountsByStatus[3];
                stats.pickingDeliveries = tracking.driverCountsByStatus[4];

                stats.busyRatio = ( (tracking.driverCountsByStatus[4] + tracking.driverCountsByStatus[3]) / (tracking.driverCountsByStatus[4] + tracking.driverCountsByStatus[3] + tracking.driverCountsByStatus[2])) * 100;
                stats.busyRatio = Math.floor(stats.busyRatio);
                //mapBoxObj.updateLayerControls();

                //mapBoxObj.getMapObj().spin(false);

                /*mapBoxObj.getMapObj().on('dataload',function(){

                 })*/
            });

            /*var stopAvailable = $interval(function() {
                tracking.getCouriers(IDLE,Cities.getSelectedCity().id);
            }, ONDUTY_DRIVER_UPDATE_POS);

            var stopBusy = $interval(function() {
                tracking.getCouriers(BUSY,Cities.getSelectedCity().id);
            }, ACTIVE_DRIVER_UPDATE_POS);*/


    }]);