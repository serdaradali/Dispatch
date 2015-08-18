/**
 * Created by Sedar on 18/06/2015.
 */
L.mapbox.accessToken = 'pk.eyJ1IjoicGV0ZXJxbGl1IiwiYSI6ImpvZmV0UEEifQ._D4bRmVcGfJvo1wjuOpA1g';


var receivedQuantity = 0;
var responseNumerator = 0;
//interval at which animation progresses, in milliseconds per frame
var pollingInterval = 250;
var soundOn = false;
var pickupPoints=
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#666",
                "marker-size": "small",
                "marker-symbol": "circle",
                "address": "12 Rue Danielle Casanova \n" +
                "75002 Paris",
                "time_submitted": 1428941074549
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    2.332541,
                    48.867781
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#666",
                "marker-size": "small",
                "marker-symbol": "circle",
                "address": "93 Avenue George V \n 75008 Paris",
                "time_submitted": 1428941076676
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    2.301100,
                    48.867853
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#666",
                "marker-size": "small",
                "marker-symbol": "circle",
                "address": "64-66 Rue Rambuteau \n 75001 Paris",
                "time_submitted": 1428941078865
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    2.350614,
                    48.861886
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#666",
                "marker-size": "small",
                "marker-symbol": "circle",
                "address": "18-20 Rue des Écoles \n 75005 Paris",
                "time_submitted": 1428941079891
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    2.348585,
                    48.848725
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#666",
                "marker-size": "small",
                "marker-symbol": "circle",
                "address": "27 Rue Lavandières Ste \n 75001 Paris",
                "time_submitted": 1428941080424
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    2.346675,
                    48.860072
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#666",
                "marker-size": "small",
                "marker-symbol": "circle",
                "address": "259 Rue Saint-Martin \n 75003 Paris",
                "time_submitted": 1428941081584
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    2.354008,
                    48.866681
                ]
            }
        }
    ]
};

function updateTicker(content) {
    $('.ticker')
        .prepend(content)

    window.setTimeout(function(){
        $('.ticker div').addClass('expanded')
    },50);
}

var colors=[
    ['Blue','456E75','Stuart #1'],
    ['Green','8F9957','Stuart #2'],
    ['Orange','B87C51','Stuart #3'],
    ['Red','B04548',,'Stuart #4'],
    ['Purple','5C2E58','Stuart #5']
];

$.get('assets/data/addresses.json', function(error, response, data){
    var addresses = data.responseJSON;


    //generate new pickups at regular interval
    var duration = 1200;
    var newPackage = setInterval(function(){
        var randomIndex = parseInt(Math.random()*addresses.length);

        //var queryURL = 'https://api.tiles.mapbox.com/v4/geocode/mapbox.places/' + addresses[randomIndex][1]+'.json?access_token=' + L.mapbox.accessToken;
        //$.get(queryURL, function(data){



        //if(data.features[0] && data.features[0].hasOwnProperty('center')) {
        pickupPoints.features.push(
            {
                "type": "Feature",
                "properties": {
                    "marker-color": "#666",
                    "marker-size": "small",
                    "marker-symbol": "circle",
                    "address": addresses[randomIndex][0],
                    "time_submitted": Date.now()
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [+addresses[randomIndex][2],+addresses[randomIndex][1]]//data.features[0]['center']
                }
            }
        )

        updateTicker('<div><strong class="incoming strongpad">★ New order</strong>  <strong>' + addresses[randomIndex][0] + '</strong> added to queue.')
        updatePickups();
        //}
        //})


        // bind popups to markers, to display addresses
        var lastAddress = pickupPoints.features[pickupPoints.features.length-1]['properties']['address'];
        /*
         pickups.on('layeradd', function(e) {
         var marker = e.layer,
         feature = marker.feature;
         if (feature.properties.address == lastAddress){
         marker.bindPopup(feature.properties.address,{
         closeButton: false
         }).openPopup()
         }
         });
         */
    }, duration);

    function setOrderVelocity(ms){
        clearInterval(newPackage);
        duration == ms;
        newPackage
    }


    var bluepath, greenpath, orangepath, redpath, purplepath;
    pickupPoints.features.forEach(function(n){
        n.properties.time_submitted = Date.now()
    })
    var hq =
    {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        2.304660,
                        48.845869
                    ]
                }
            },
            {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        2.392722,
                        48.836775
                    ]
                }
            },
            {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        2.370663,
                        48.896397
                    ]
                }
            }
        ]
    }


    var pickups = L.mapbox.featureLayer().addTo(map);


    //update pickup markers and count
    function updatePickups(){
        pickups.setGeoJSON(pickupPoints);
        $('.queue').text(pickupPoints.features.length)
    }

    //draw hq
    hq.features.forEach(function(n){
        L.marker(
            reverseCoords(n.geometry.coordinates),
            {icon: L.divIcon({
                className: 'hq',
                iconSize: [20, 20],
                html: '<img class="hq" src="https://www.mapbox.com/bites/00115/dropoff.png">'
            })}
        ).addTo(map);

    })



    //setOrderVelocity(1000000);
    //generate new pickups on user click
    map.on('click', function(e) {
        var coord =  e.latlng.lng+','+e.latlng.lat;
        var geocodeURL='https://api.tiles.mapbox.com/v4/geocode/mapbox.places/'+coord+'.json?access_token=pk.eyJ1IjoicGV0ZXJxbGl1IiwiYSI6ImpvZmV0UEEifQ._D4bRmVcGfJvo1wjuOpA1g'

        $.get(geocodeURL, function(data, err){
            var address = (data.features[0].address+' '+data.features[0].text);
            pickupPoints.features.push(
                {
                    "type": "Feature",
                    "properties": {
                        "marker-color": "#666",
                        "marker-size": "small",
                        "marker-symbol": "circle",
                        "time_submitted":Date.now(),
                        "address": address
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [e.latlng.lng, e.latlng.lat]
                    }
                });
            updatePickups()
            updateTicker('<div><strong class="incoming strongpad" style="background:white">★ YOUR ORDER</strong>  <strong>'+address+'</strong> added to queue');
            if (soundOn)  document.getElementById('fireball').play()
        })
    });

    //convert decimal minutes into minutes:seconds
    function timeConverter(decimal){
        var min = Math.floor(Math.abs(decimal))
        var sec = Math.floor((Math.abs(decimal) * 60) % 60);
        return min + ":" + (sec < 10 ? "0" : "") + sec;
    }



    //create couriers
    colors.forEach(function(n){
        createCourier(n)
    })




})