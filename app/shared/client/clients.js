/**
 * Created by Sedar on 25/05/2015.
 */

angular.module('stuart_dispatch')
    .factory('clients',[function(){

        var Client = function (pos,name,id) {
            this.pos = pos;
            this.name = name;
            this.id = id;
            this.setPos = function(lat,lon){
                this.pos = L.lat
            }
        }

        var clientArr




    }]);