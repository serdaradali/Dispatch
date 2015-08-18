angular.module("stuart_dispatch")
    .factory("icons",[function() {




        var requestIcons = {
            Walk: {
                iconUrl: 'assets/img/Walk_Request.png',
                iconSize: [26, 32], // size of the icon
                shadowSize: [0, 0]
            },
            Bicycle: {
                iconUrl: 'assets/img/Bike_Request.png',
                iconSize: [26, 32], // size of the icon
                iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
                popupAnchor:  [0, -25], // point from which the popup should open relative to the iconAnchor
                shadowSize: [0, 0]
            },
            Moto: {
                iconUrl: 'assets/img/Moto_Request.png',
                iconSize: [26, 32], // size of the icon
                iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
                popupAnchor:  [0, -25], // point from which the popup should open relative to the iconAnchor
                shadowSize: [0, 0]
            },
            Car: {
                iconUrl: 'assets/img/Car_Request.png',
                iconSize: [26, 32], // size of the icon
                iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
                popupAnchor:  [0, -25], // point from which the popup should open relative to the iconAnchor
                shadowSize: [0, 0]
            },
            Van: {
                iconUrl: 'assets/img/Van_Request.png',
                iconSize: [26, 32], // size of the icon
                iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
                popupAnchor:  [0, -25], // point from which the popup should open relative to the iconAnchor
                shadowSize: [0, 0]
            }
        };

        var driverIcons = {
            Walk: [
                {
                    iconUrl: 'assets/img/drivers/Walk_Driver.png',
                    iconSize: [26, 32], // size of the icon
                    shadowSize: [0, 0]
                },
                {
                    iconUrl: 'assets/img/drivers/Walk_Driver.png',
                    iconSize: [26, 32], // size of the icon
                    shadowSize: [0, 0]
                },
                {
                    iconUrl: 'assets/img/drivers/Walk_Driver.png',
                    iconSize: [26, 32], // size of the icon
                    shadowSize: [0, 0]
                },
            ],
            Bicycle: {
                iconUrl: 'assets/img/drivers/Bike_Driver.png',
                iconSize: [26, 32], // size of the icon
                iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
                popupAnchor:  [0, -25], // point from which the popup should open relative to the iconAnchor
                shadowSize: [0, 0]
            },
            Moto: {
                iconUrl: 'assets/img/drivers/Moto_Driver.png',
                iconSize: [26, 32], // size of the icon
                iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
                popupAnchor:  [0, -25], // point from which the popup should open relative to the iconAnchor
                shadowSize: [0, 0]
            },
            Car: {
                iconUrl: 'assets/img/drivers/Car_Driver.png',
                iconSize: [26, 32], // size of the icon
                iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
                popupAnchor:  [0, -25], // point from which the popup should open relative to the iconAnchor
                shadowSize: [0, 0]
            },
            Van: {
                iconUrl: 'assets/img/drivers/Van.png',
                iconSize: [26, 32], // size of the icon
                iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
                popupAnchor:  [0, -25], // point from which the popup should open relative to the iconAnchor
                shadowSize: [0, 0]
            }
        };

        var deliveryIcons = {
            Walk: {
                iconUrl: 'assets/img/Walk_Driver.png',
                iconSize: [26, 32], // size of the icon
                shadowSize: [0, 0]
            },
            Bicycle: {
                iconUrl: 'assets/img/Bike_Driver.png',
                iconSize: [26, 32], // size of the icon
                iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
                popupAnchor:  [0, -25], // point from which the popup should open relative to the iconAnchor
                shadowSize: [0, 0]
            },
            Moto: {
                iconUrl: 'assets/img/Moto_Driver.png',
                iconSize: [26, 32], // size of the icon
                iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
                popupAnchor:  [0, -25], // point from which the popup should open relative to the iconAnchor
                shadowSize: [0, 0]
            },
            Car: {
                iconUrl: 'assets/img/Car_Driver.png',
                iconSize: [26, 32], // size of the icon
                iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
                popupAnchor:  [0, -25], // point from which the popup should open relative to the iconAnchor
                shadowSize: [0, 0]
            },
            Van: {
                iconUrl: 'assets/img/Van_Driver.png',
                iconSize: [26, 32], // size of the icon
                iconAnchor:   [25, 25], // point of the icon which will correspond to marker's location
                popupAnchor:  [0, -25], // point from which the popup should open relative to the iconAnchor
                shadowSize: [0, 0]
            }
        };

        return {
            drivers: driverIcons,
            requests: requestIcons,
            deliveryIcons: deliveryIcons
        }
    }])