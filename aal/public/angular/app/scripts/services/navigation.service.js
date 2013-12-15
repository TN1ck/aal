//var navigationService = angular.module('navigationServices', []);
var app = angular.module('angularApp');

app.factory('Navigation', function($rootScope){
    var contentDiv = document.getElementById("content");

    var widgetList = document.getElementsByTagName("widget");
    //var widgetCounter = widgetList.length;
    var currentSelected = 0;
    $('body').on('keydown', function( event ){
            if(event.which === 37){
                console.log('currentSelected: ' + currentSelected);
                if(currentSelected === 0){
                    currentSelected = widgetList.length -1;
                } else {
                    currentSelected= (currentSelected - 1) % widgetList.length;
                }
                $rootScope.$apply();
            }
            if(event.which === 39){
                //alert('right pressed');
                //alert(currentSelected);
                currentSelected = (currentSelected + 1) % widgetList.length;
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
        }
    }
});