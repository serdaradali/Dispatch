/**
 * Created by serdaradali on 7/23/15.
 */


/**
 * Created by Sedar on 18/06/2015.
 */

angular.module('stuart_dispatch')
    .controller('invitationController',['$scope','invitationConnector','$interval','Cities','$q','mapBoxObj',
        function($scope,invitationConnector,$interval,Cities,$q,mapBoxObj){

            var promiseArr = [];

            var ON_GOING_DELIVERY_FREQ = 10000;

            promiseArr.push(invitationConnector.getDemands(Cities.getSelectedCity().id));
            promiseArr.push(invitationConnector.getDemands(Cities.getSelectedCity().id));
            promiseArr.push(invitationConnector.getDemands(Cities.getSelectedCity().id));


            var stopOff = $interval(function() {

                promiseArr = [];
                promiseArr.push(invitationConnector.getDemands(Cities.getSelectedCity().id));
                promiseArr.push(invitationConnector.getDemands(Cities.getSelectedCity().id));
                promiseArr.push(invitationConnector.getDemands(Cities.getSelectedCity().id));

                $q.all(promiseArr).then(function(values){

                });

                // when all these calls are finished, reset every layer

                //invitationConnector.resetAllLayers();
            }, ON_GOING_DELIVERY_FREQ);

            $q.all(promiseArr).then(function(values){

            });


        }]);