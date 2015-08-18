/**
 * Created by gti on 17/08/2015.
 */


/*.bindPopup(tooltipContent,{
 closeButton: true,
 minWidth: 160
 })
 .on('mouseover',function(e){
 if(.isTracking) {
 this.openPopup();
 }
 })
 .on('mouseout',function(e){
 if(!trackingStatus.isTracking) {
 this.closePopup();
 }
 })
 .on('click',function(e){

 e.layer.feature.properties.isTracking = !e.layer.feature.properties.isTracking;

 //e.layer.setIcon();
 /*if(!trackingStatus.isTracking || (trackingStatus.isTracking && trackingStatus.markerId != id)) {

 // first set the size of previously selected marker to normal (if it exists)
 if(trackingStatus.marker) {
 trackingStatus.marker.setIcon(trackingStatus.icon);
 }

 var iconBig = L.divIcon({
 className: 'driverIcon' + TransportTypes[transport_id-1] + DriverStatusTypes[status-1],
 iconSize: [51, 55],
 popupAnchor:[0,-20]
 });

 var iconSmall = L.divIcon({
 className: 'driverIcon' + TransportTypes[transport_id-1] + DriverStatusTypes[status-1]+'S',
 iconSize: [25, 27],
 popupAnchor:[0,-10]
 });

 // make this marker bigger
 this.setIcon(iconBig);


 this.openPopup();
 trackingStatus.markerId = id;
 trackingStatus.marker = this;
 trackingStatus.icon = iconSmall;
 trackingStatus.isTracking = true;
 leafletMapObj.updateMapCenter(lat,lng);
 }
 else
 {
 this.setIcon(L.divIcon({ // use L.divIcon instead of L.icon and uncomment className to use sprites
 className: 'driverIcon' + TransportTypes[transport_id-1] + DriverStatusTypes[status-1]+'S',
 iconSize: [25, 27],
 popupAnchor:[0,-10]
 //iconUrl: 'assets/img/drivers/' + TransportTypes[transport_id - 1] + DriverStatusTypes[status - 1] + '.png'
 }));
 trackingStatus.isTracking = false;
 }
 // set a global tracking bool variable to true if it's set to false, set to false if it's true (switch tracking on/off).
 // set the iconSize something bigger for highlighting
 // open popup and keep it open until it is manually closed
 });*/