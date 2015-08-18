/**
 * Created by serdaradali on 8/17/15.
 */


// controls the filtering of markers based on the selected filters on layer control

angular.module('stuart_dispatch')
    .factory('filters',[function(){
        var transport = [],
            status = [];
        var displayedMarkersLayer = L.layerGroup();

        var applyFilter = function(arr, filter){
            for(var i=0;i < arr.length;i++){
                if(displayedMarkersLayer[i]){

                }
            }
        }

        return {
            transport: transport,
            status: status,
            applyFilter: applyFilter
        }
    }])