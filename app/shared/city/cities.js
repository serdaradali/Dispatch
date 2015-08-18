/**
 * Created by Sedar on 20/06/2015.
 */
angular.module("stuart_dispatch")
    .factory("Cities",[function() {

        var selectedCityId = 3, cityNames = ["Paris", "London", "Barcelona"];


        var getSelectedCity = function(name){
            if(!name){
                name = cityNames[selectedCityId-1];
            }
            var length = info.length,
                found = false,
                city = {};

            for(var i=0; i<length && !found;i++){
                if(info[i].name == name){
                    found = true;
                    city = info[i];
                }
            }
            return city;
        }

        var setSelectedCityId = function(cityId){
            selectedCityId = cityId;
        }

        var getSelectedCityId = function(){
            return selectedCityId;
        }


        var info = [{
            name: "Paris",
            center: {
                lat: 48.86285562,
                lng: 2.337692766,
                zoom: 13
            },
            id: 1,
            levels: ["Arrondiss.", "Quartiers"],
            features: []
        },
        {
            name: "Barcelona",
            center: {
                lat: 41.396634,
                lng: 2.158977,
                zoom: 12
            },
            id: 3,
            levels: ["Arrondiss.", "Quartiers"],
            features: []
        }];


        var defaultCity = function() {
            return info[1];
        }

        return {
            defaultCity: defaultCity,
            getSelectedCity: getSelectedCity,
            setSelectedCityId: setSelectedCityId,
            getSelectedCityId: getSelectedCityId,
            cities: info
        }
    }])