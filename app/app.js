'use strict';

// Declare app level module which depends on views, and components
angular.module('stuart_dispatch', [
]).value("Urls",{
        "drivers":"http://beta-api.stuart.fr/v1/drivers",
        "invitations": "http://beta-api.stuart.fr/v1/jobinvitations",
        "cancelled-client": "http://beta-api.stuart.fr/v1/deliveries/canceled/client/list",
        "cancelled-driver": "http://beta-api.stuart.fr/v1/deliveries/canceled/driver/list",
        "ongoing": "http://beta-api.stuart.fr/v1/deliveries/ongoing/list"
    })
    .value("InvitationStatusTypes",["Created", "Accepted", "Cancelled", "Expired"])
    .value("DeliveryStatusTypes",["Picking", "Delivering", "Delivered", "Cancelled"])
    .value("DeliveryStatusColors",["orange","red","green", "gray"])
    .value("TransportTypes",["Walk", "Bike", "Moto", "Car", "Van"])
    .value("DriverStatusTypes",["OffDuty","OnDuty", "Delivering","Picking"])
    .value("DriverPage","https://backoffice.stuart.fr/driver/info/")
    .value("DriverStatusColors",["gray", "green","red","orange"])
    .value("StatusColors",["green","orange","gray","gray"]);

