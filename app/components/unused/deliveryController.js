/**
 * Created by Sedar on 18/06/2015.
 */

angular.module('stuart_dispatch')
    .controller('deliveryController',['$scope','deliveryConnector','$interval','Cities','$q','mapBoxObj',
        function($scope,deliveryConnector,$interval,Cities,$q,mapBoxObj){

            var promiseArr = [];

            var ON_GOING_DELIVERY_FREQ = 10000;

            promiseArr.push(deliveryConnector.getOnGoingDeliveries(Cities.getSelectedCity().id));
            promiseArr.push(deliveryConnector.getOnGoingDeliveries(Cities.getSelectedCity().id));
            promiseArr.push(deliveryConnector.getOnGoingDeliveries(Cities.getSelectedCity().id));


            var stopOff = $interval(function() {

                promiseArr = [];
                promiseArr.push(deliveryConnector.getOnGoingDeliveries(Cities.getSelectedCity().id));
                promiseArr.push(deliveryConnector.getOnGoingDeliveries(Cities.getSelectedCity().id));
                promiseArr.push(deliveryConnector.getOnGoingDeliveries(Cities.getSelectedCity().id));

                $q.all(promiseArr).then(function(values){

                });

                // when all these calls are finished, reset every layer

                //deliveryConnector.resetAllLayers();
            }, ON_GOING_DELIVERY_FREQ);

            $q.all(promiseArr).then(function(values){

            });


        }]);