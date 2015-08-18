/**
 * Created by serdaradali on 8/12/15.
 */

angular.module('stuart_dispatch')
    .factory('events',[function(){

        var updateJobTicker = function(status, color, transportName, id) {

            var statusWord = "";

            if(status == 1){
                statusWord = "New";
            }
            else if(status == 2){
                statusWord = "Accepted";
            }
            else if(status == 3){
                statusWord = "Cancelled";
            }
            else if(status == 4){
                statusWord = "Expired";
            }

            var html = '<div><strong class="incoming strongpad" style="background:' + color  + '"' + '>★ ' + statusWord +
                '  job request</strong>' + ' #' + id + ' for ' + transportName + '.';

            $('.ticker')
                .prepend(html)

            window.setTimeout(function(){
                $('.ticker div').addClass('expanded')
            },50);
        }



        var updateDeliveryTicker = function(status, color, driver_id, id) {

            var statusWord = "";

            if(status == 1){
                statusWord = "picking";
            }
            else if(status == 2){
                statusWord = "delivering";
            }
            else if(status == 3){
                statusWord = "delivered";
            }

            var html = '<div>' + 'Driver #' + driver_id + ' is <strong class="incoming strongpad" style="background:' + color  + '"' + '>★ ' + statusWord +
                '</strong>' + ' delivery #' + id + '.</div>';

            $('.ticker')
                .prepend(html)

            window.setTimeout(function(){
                $('.ticker div').addClass('expanded')
            },50);
        }


        return {
            updateJobTicker: updateJobTicker,
            updateDeliveryTicker: updateDeliveryTicker
        }
    }])

