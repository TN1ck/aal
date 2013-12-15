var navigationService = angular.module('navigationServices', []);

navigatonService.factory('Navigation', function(){
    var widgetcounter;
    widgetcounter = widgetcounter + 1;
    return widgetcounter;
});