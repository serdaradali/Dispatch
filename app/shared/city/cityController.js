/**
 * Created by Sedar on 20/06/2015.
 */

angular.module('stuart_dispatch')
    .controller('cityController',['$scope','tracking','$interval','Cities','mapBoxObj',
        function($scope,tracking,$interval,Cities,mapBoxObj){

            $scope.selectedCity = Cities.getSelectedCityId();
            $scope.cities = Cities.cities;

            var cityControl = L.Control.extend({

                options: {
                    position: 'topleft'
                    //control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
                },

                onAdd: function (map) {
                    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

                    container.style.backgroundColor = 'white';
                    //container.style.width = '30px';
                    //container.style.height = '30px';

                    /*container.innerHTML += '<div class="dropdown">' +
                    '<button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Paris'+
                    '<span class="caret"></span></button>'+
                    '<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">' +
                    '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Barcelona</a></li>' +
                    '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">London</a></li>' +
                    '<li role="presentation" class="divider"></li>' +
                    '<li role="presentation"><a role="menuitem" tabindex="-1" href="#">Choose a city</a></li>' +
                    '</ul>' +
                    '</div>';*/

                    //container.innerHTML += ;

                    container.onclick = function(e){
                        console.log('buttonClicked');

                    }
                    return container;
                }

            });

            $scope.changeCity = function(city){
                Cities.setSelectedCityId(+city);
                tracking.resetAllLayers();
                /*tracking.getCouriers(1,city);
                tracking.getCouriers(2,city);
                tracking.getCouriers(3,city);*/
                mapBoxObj.changeMapCenter(Cities.getSelectedCity().center);
            }

            mapBoxObj.getMapObj().addControl(new cityControl());




    }]);