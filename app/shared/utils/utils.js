/**
 * Created by Sedar on 18/06/2015.
 */
angular.module("stuart_dispatch")
    .factory("utils",[function() {

        var reverseCoords = function(pair) {
            return [pair.lat, pair.lng]
        }

        return {
            reverseCoords:reverseCoords
        }
    }])