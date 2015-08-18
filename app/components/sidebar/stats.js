/**
 * Created by serdaradali on 7/23/15.
 */

angular.module('stuart_dispatch')
    .factory('stats',[function(){
        var onGoingDeliveries = 0,
            pickingDeliveries = 0,
            busyRatio = 0,
            averagePickingTime = 5;

        return {
            onGoingDeliveries: onGoingDeliveries,
            pickingDeliveries: pickingDeliveries,
            busyRatio: busyRatio,
            averagePickingTime: averagePickingTime
        }
    }])