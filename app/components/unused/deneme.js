/**
 * Created by Sedar on 13/07/2015.
 */
var dropoff = function(currentLocation){
    updateTicker('<div><strong class="strongpad" style="background:#'+color[1]+'"">✓ Pickup</strong> '+color[2]+  ' has arrived at <strong>'+currentLocation.properties.address+'</strong>. Now headed to dropoff point for unloading.');

    var nearestDropoff = turf.nearest(currentLocation, hq)
    var endpoints = currentLocation.geometry.coordinates+';'+nearestDropoff.geometry.coordinates;
    var directionsURL='https://api.tiles.mapbox.com/v4/directions/mapbox.walking/'+endpoints+'.json?access_token='+L.mapbox.accessToken;

    courierTarget.setLatLng(L.latLng(0,0))
    //query directions
    $.get(directionsURL, function(data, err){

        var coords= data.routes[0].geometry.coordinates;
        var processedCoords = coords.map(function(n){return reverseCoords(n)});
        var path = turf.linestring(coords);
        $('.'+color[0]+'path').remove();
        var courierRoute =
            L.polyline(processedCoords,
                {color: "#"+color[1], className:color[0]+'path'})
                .addTo(map);


        //animate route path
        window.setTimeout(function(){
            $('path').css('stroke-dashoffset',0)
        },400);

        var tripDuration=(data.routes[0].duration/(60*3.2)).toFixed(0); //duration in minutes
        var tripDistance=data.routes[0].distance; //distance in meters
        var increment=0;

        var bikingAnimation= setInterval(function(){

            //once the animation is complete, kill animation and fire this function recursively, starting at the current location
            if (increment>tripDuration*1000/pollingInterval) {
                courierPayload=0;

                $('.couriericon.'+color[0]).text(courierPayload);
                clearInterval(bikingAnimation);
                if (soundOn)  document.getElementById('coin').play()
                goToPickup(nearestDropoff)

            }

            //1 SECOND= 60 REAL SECONDS. if the animation is not complete, calculate waypoint for animation and transition there (CSS)
            increment++;
            var waypoint=
                turf.along(path, increment*tripDistance*pollingInterval/(tripDuration*1000*1000), 'kilometers').geometry.coordinates;
            courier.setLatLng(L.latLng(waypoint[1], waypoint[0]))
        }, pollingInterval);

    })
}

var goToPickupVer2 = function(pickupLoc) {

}

var goToPickup = function(currentLocation){

    Array.minIndex = function( array ){
        return array.indexOf(Math.min.apply( Math, array ));
    };

    //distance of each pickup, divided by time elapsed
    var adjustedScores = pickupPoints.features.map(function(n){
        return (
        Math.pow(turf.distance(currentLocation, n, 'miles'),2)/(Date.now()-parseFloat(n.properties['time_submitted'])))
    });



    //identify nearest pickup to the courier, and remove it from the overall list
    var nearestPickupIndex = Array.minIndex(adjustedScores);
    var nearestPickup = pickupPoints.features[nearestPickupIndex];

    pickupPoints.features.splice(nearestPickupIndex,1);
    updatePickups();


    //assemble URL to route from courier's current location to the pickup
    var endpoints = currentLocation.geometry.coordinates+';'+nearestPickup.geometry.coordinates;
    var directionsURL='https://api.tiles.mapbox.com/v4/directions/mapbox.walking/'+endpoints+'.json?access_token='+L.mapbox.accessToken;

    courierTarget.setLatLng(L.latLng(nearestPickup.geometry.coordinates[1], nearestPickup.geometry.coordinates[0]))

    //query directions
    $.get(directionsURL, function(data, err){

        var coords= data.routes[0].geometry.coordinates;
        var processedCoords = coords.map(function(n){return reverseCoords(n)});
        var path = turf.linestring(coords);
        $('.'+color[0]+'path').remove();
        var courierRoute =
            L.polyline(processedCoords,
                {color: "#"+color[1], className:color[0]+'path'})
                .addTo(map);


        //animate route path
        window.setTimeout(function(){
            $('path').css('stroke-dashoffset',0)
        },400);

        var tripDuration=(data.routes[0].duration/(60*3.2)).toFixed(0); //duration in minutes
        var tripDistance=data.routes[0].distance; //distance in meters
        var increment=0;

        if (currentLocation.properties.address) {
            updateTicker('<div><strong class="strongpad" style="background:#'+color[1]+'"">✓ Pickup</strong> '+color[2]+  ' has arrived at <strong>'+currentLocation.properties.address+'</strong>. Now headed to <strong>'+nearestPickup.properties.address+'</strong> ('+tripDuration+' min, '+(tripDistance/1609).toFixed(2)+' mi)')
        }

        var bikingAnimation= setInterval(function(){

            //once the animation is complete, kill animation and fire this function recursively, starting at the current location
            if (increment>tripDuration*1000/pollingInterval) {
                courierPayload++
                receivedQuantity++

                responseNumerator += (Date.now() - nearestPickup.properties['time_submitted'])

                $('.retrieved').text(receivedQuantity);
                $('.responsetime').text(timeConverter(responseNumerator/(receivedQuantity*1000)));
                $('.couriericon.'+color[0]).text(courierPayload);
                clearInterval(bikingAnimation);

                if (soundOn) document.getElementById('kick').play()

                //depending on payload, go to next pickup, or drop off
                if (courierPayload<5) goToPickup(nearestPickup)
                else {dropoff(nearestPickup)}

            }

            //1 SECOND= 60 REAL SECONDS. if the animation is not complete, calculate waypoint for animation and transition there (CSS)
            increment++;
            var waypoint=
                turf.along(path, increment*tripDistance*pollingInterval/(tripDuration*1000*1000), 'kilometers').geometry.coordinates;
            courier.setLatLng(L.latLng(waypoint[1], waypoint[0]))
        }, pollingInterval);
    })
}