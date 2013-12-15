//var navigationService = angular.module('navigationServices', []);
var app = angular.module('angularApp');

app.factory('Navigation', function($rootScope){
    var widgetCounter = 0;
    var currentSelected = 0;
    $('body').on('keydown', function( event ){
            if(event.which === 37){
                //alert('left pressed');
                //alert(currentSelected);
                if(currentSelected === 0){
                    currentSelected = widgetCounter-1;
                } else {
                    currentSelected= (currentSelected - 1) % widgetCounter;
                }
                $rootScope.$apply();
            }
            if(event.which === 39){
                //alert('right pressed');
                //alert(currentSelected);
                currentSelected = (currentSelected + 1) % widgetCounter;
                $rootScope.$apply();
            }
        });
    return {
        initNext: function (){
            return widgetCounter++;
        },
        selectNext: function (){
            return currentSelected++;
        },
        getCurrentSelected: function (){
            return currentSelected;
        }
    }
});