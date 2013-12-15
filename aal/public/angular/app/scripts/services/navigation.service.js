//var navigationService = angular.module('navigationServices', []);
var app = angular.module('angularApp');

app.factory('Navigation', function($rootScope){
    var contentDiv = document.getElementById("content");

    var widgetList = document.getElementsByTagName("widget");
    //var widgetCounter = widgetList.length;
    var currentSelected = -1;
    var fullscreenOn = 0;
    $('body').on('keydown', function( event ){
            if(event.which === 37){
                //console.log('currentSelected: ' + currentSelected);
                if(currentSelected <= 0){
                    currentSelected = widgetList.length -1;
                } else {
                    currentSelected = (currentSelected - 1) % widgetList.length;
                }
                $rootScope.$apply();
            }
            if(event.which === 39){
                //alert('right pressed');
                //alert(currentSelected);
                currentSelected = (currentSelected + 1) % widgetList.length;
                $rootScope.$apply();
            }
            if(event.which === 13 && fullscreenOn === 0){
                fullscreenOn = 1;
                //console.log('Enter pressed and fullscreenOn = ' + fullscreenOn);
                $rootScope.$apply();
            }
            if(event.which === 27 && fullscreenOn === 1){
                fullscreenOn = 0;
                //console.log('Escape pressed and fullscreenOn = ' + fullscreenOn);
                $rootScope.$apply();

            }
        });
    return {
        getCounter: function (questioner){
            //console.log(widgetList.length);
            for(var i = widgetList.length; i--;){
                if (widgetList[i] === questioner.context){
                    console.log(i);
                    return i;
                } else {
                    console.log(i);
                }
            }
        },
        selectNext: function (){
            return currentSelected++;
        },
        getCurrentSelected: function (){
            return currentSelected;
        },
        getFullscreenOn: function (){
            return fullscreenOn;
        }
    }
});