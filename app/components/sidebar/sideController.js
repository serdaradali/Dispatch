/**
 * Created by serdaradali on 7/23/15.
 */

angular.module('stuart_dispatch')
    .controller('sideController',['$scope', 'stats', function($scope, stats){

        $scope.onGoingDeliveries = stats.onGoingDeliveries;
        $scope.pickingDeliveries = stats.pickingDeliveries;
        $scope.busyRatio = stats.busyRatio;
        $scope.averagePickingTime = stats.averagePickingTime;


        $scope.$watch(function(){
            return stats.onGoingDeliveries;
        },function(newVal, oldVal){
            if(newVal && newVal != oldVal){
                $scope.onGoingDeliveries = newVal;
            }
        });

        $scope.$watch(function(){
            return stats.pickingDeliveries;
        },function(newVal, oldVal){
            if(newVal && newVal != oldVal){
                $scope.pickingDeliveries = newVal;
            }
        });

        $scope.$watch(function(){
            return stats.busyRatio;
        },function(newVal, oldVal){
            if(newVal && newVal != oldVal){
                $scope.busyRatio = newVal;
            }
        });

        $scope.$watch(function(){
            return stats.averagePickingTime;
        },function(newVal, oldVal){
            if(newVal && newVal != oldVal){
                $scope.averagePickingTime = newVal;
            }
        });


    }])