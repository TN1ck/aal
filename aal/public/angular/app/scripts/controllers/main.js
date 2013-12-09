'use strict';

var appControllers = angular.module('appControllers', []);


appControllers.controller('MainCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('scripts/calendar.json').success(function(data) {
            $scope.calendars = data;
            $scope.kacke = 'haha';
    });
    $scope.kacke1 = 'hihi';

    $scope.mockup = {name: 'Cillian Murphy', 
                     picture: 'http://hollywoodhatesme.files.wordpress.com/2011/08/cillian-murphy.jpg',
                     telephone: '023234020',
                     todos: [{type: 'red', text: 'make repository', created: '2013.05.03'},
                             {type: 'green', text: 'finish this', created: '2013.05.03'},
                             {type: 'green', text: "DON'T BE LATE", created: '2013.05.03'},
                             {type: 'red', text: 'yeeeeeeah', created: '2013.05.03'},
                             {type: 'red', text: 'Something something...', created: '2013.05.03'},
                             {type: 'orange', text: 'Something something...', created: '2013.05.03'},
                             {type: 'orange', text: 'business meeting', created: '2013.05.03'},
                             {type: 'red', text: 'mep mep', created: '2013.05.03'},
                             ],
                     news: [{header: 'Zehn, die Minister werden sollten',
                             text: 'Falls sich Union und SPD auf eine Koalition einigen, werden die Parteien unter sich ausmachen, wer im Kabinett sitzt. Seiteneinsteiger haben kaum Chancen. Muss das sein? SPIEGEL ONLINE zeigt, wer gut in die Ministerriege passen würde, wenn es allein nach Kompetenz ginge.',
                             category: 'tech',
                             publisher: 'Spiegel'},
                             {header: 'Meteorit verrät frühe Entwicklung des Mars',
                             text: 'In der Sahara haben Beduinen einen Meteoriten vom Mars gefunden. Er stammt aus der Kindheit des Roten Planeten und zeigt, wie dieser sich in jungen Jahren entwickelt hat.',
                             category: 'tech',
                             publisher: 'Spiegel'},
                             {header: 'Russland lässt Kapitän des Greenpeace-Schiffs frei',
                             text: 'Es wird immer leerer im Gefängnis in St. Petersburg: Erneut hat ein Gericht mehrere Besatzungsmitglieder der "Arctic Sunrise" freigelassen. Darunter auch den US-amerikanischen Kapitän des Schiffs.',
                             category: 'tech',
                             publisher: 'Spiegel'},
                             {header: 'Zehn, die Minister werden sollten',
                             text: 'Falls sich Union und SPD auf eine Koalition einigen, werden die Parteien unter sich ausmachen, wer im Kabinett sitzt. Seiteneinsteiger haben kaum Chancen. Muss das sein? SPIEGEL ONLINE zeigt, wer gut in die Ministerriege passen würde, wenn es allein nach Kompetenz ginge.',
                             category: 'tech',
                             publisher: 'Spiegel'},
                            ],
                     
                    
                    };

    }]);