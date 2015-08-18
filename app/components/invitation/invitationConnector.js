/**
 * Created by Sedar on 12/06/2015.
 */


angular.module('stuart_dispatch')
    .factory('invitationConnector',['$http','invitation','$interval', 'Cities','Urls','$q','leafletMapObj',
        'StatusColors','InvitationStatusTypes','tracking','delivery','deliveryConnector','events',
        function($http, invitation, $interval, Cities, Urls, $q, leafletMapObj, StatusColors, InvitationStatusTypes,
                 tracking, delivery, deliveryConnector, events){

            var invitationList = {};

            var invitationPaths = {};

            var transportTypes = ["walk","bike","motorbike","car","van"];

            var invitationLayer = [];

            invitationLayer[1] = L.layerGroup();
            invitationLayer[2] = L.layerGroup();
            invitationLayer[3] = L.layerGroup();

            var promiseArr = [];

            var ON_GOING_DELIVERY_FREQ = 5000;

            // no courier assigned to these requests
            var getDemands = function(requestStatus, selectedCityId){
                var demandReq = {
                    url: Urls.invitations,
                    method: "GET",
                    params: {
                        statusId: requestStatus, // 0 or 1
                        cityId: selectedCityId // 3 for Paris
                    }
                };
                var promise = $http(demandReq).then(function (response) {
                    var jobsData = response.data;
                    var activeDemandsCount = Object.keys(jobsData).length;
                    var status = response.config.params.statusId;

                    invitationLayer[status] = L.layerGroup();

                    for(var i=0;i<activeDemandsCount;i++) {
                        var pos = jobsData[i].job.originPlace.address;
                        var job_id = jobsData[i].job.id;
                        var time_created = jobsData[i].createdAt;
                        var client_name = jobsData[i].job.client.firstname + ' ' + jobsData[i].job.client.lastnameInitial;
                        var transportName = jobsData[i].driver.currentDriverWorkMode.transportType.code;
                        var transport = transportTypes.indexOf(transportName);


                        if (!invitationList[job_id]) { // new invitation for the system.
                            if(status == 1) { // create marker only if it is pending invitation
                                invitationList[job_id] = invitation.createInvitation(job_id, pos.latitude, pos.longitude, time_created, transport, status, client_name);
                                invitationList[job_id].marker.addTo(leafletMapObj.map);
                                // create the notification
                                events.updateJobTicker(status, StatusColors[status-1], transportName, job_id);
                            }
                            else if(status == 2){ // system is opened when there is an already accepted job in the system
                                invitationList[job_id] = invitation.createInvitation(job_id, pos.latitude, pos.longitude, time_created, transport, status, client_name);
                                invitationList[job_id].marker.addTo(leafletMapObj.map);
                                // create a delivery
                                deliveryConnector.getDelivery(selectedCityId,job_id);
                            }
                            //invitationLayer[status].addLayer(invitationList[job_id].marker);
                        }
                        else if(status != invitationList[job_id].status) // this job invitation's status changed, do something
                        { // invitation exists but it's status changed

                            if (status == 3) {// status canceled, remove the marker and it's path.
                                invitationList[job_id].status = status;
                                events.updateJobTicker(status, StatusColors[status-1], transportName, job_id);
                                leafletMapObj.map.removeLayer(invitationList[job_id].marker);
                                // remove path
                                //invitationPaths[job_id];
                            }
                            else if(status == 4){ // invitation is expired
                                invitationList[job_id].status = status;
                                events.updateJobTicker(status, StatusColors[status-1], transportName, job_id);
                                leafletMapObj.map.removeLayer(invitationList[job_id].marker);
                            }
                            else if(status == 2) // status is accepted, call the delivery
                            {
                                /*var driver_name = jobsData[i].driver.firstname + ' ' + jobsData[i].driver.lastnameInitial;
                                invitationList[job_id] = invitation.createInvitation(job_id, pos.latitude, pos.longitude, time_created, transport, status, client_name);
                                invitationList[job_id].marker.addTo(leafletMapObj.map);*/

                                invitationList[job_id].status = status;
                                deliveryConnector.getDelivery(selectedCityId,job_id);

                            }
                        }
                    }
                }).catch(function (data) {
                    console.log("Error: request returned status " + data.status);
                })
                return promise;
            }

            var trackInvitations = function(){
                promiseArr.push(getDemands(1, Cities.getSelectedCity().id));
                promiseArr.push(getDemands(2, Cities.getSelectedCity().id));
                promiseArr.push(getDemands(3, Cities.getSelectedCity().id));
                promiseArr.push(getDemands(4, Cities.getSelectedCity().id));
                //promiseArr.push(getDemands(2, Cities.getSelectedCity().id));
                //promiseArr.push(getDemands(3, Cities.getSelectedCity().id));


                var stopOff = $interval(function() {

                    promiseArr = [];

                    promiseArr.push(getDemands(1, Cities.getSelectedCity().id));
                    promiseArr.push(getDemands(2, Cities.getSelectedCity().id));
                    promiseArr.push(getDemands(3, Cities.getSelectedCity().id));
                    promiseArr.push(getDemands(4, Cities.getSelectedCity().id));

                    // when all invitations are called
                    $q.all(promiseArr).then(function(values){

                    });

                    // when all these calls are finished, reset every layer

                    //invitationConnector.resetAllLayers();
                }, ON_GOING_DELIVERY_FREQ);

                $q.all(promiseArr).then(function(values){

                });
            }



            return {
                getDemands: getDemands,
                trackInvitations: trackInvitations,
                invitationLayer: invitationLayer
            }

    }]);