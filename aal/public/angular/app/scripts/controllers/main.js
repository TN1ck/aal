'use strict';

/* global angular */

var appControllers = angular.module('appControllers', []);


appControllers.controller('MainCtrl', ['$scope', '$http',
    function ($scope) {

        $scope.mockup = {
            name: 'Cillian Murphy',
            picture: 'http://hollywoodhatesme.files.wordpress.com/2011/08/cillian-murphy.jpg',
            telephone: '023234020',
            todos: [
                {type: 'red', text: 'make repository', created: '2013.05.03'},
                {type: 'green', text: 'finish this', created: '2013.05.03'},
                {type: 'green', text: "DON'T BE LATE", created: '2013.05.03'},
                {type: 'red', text: 'yeeeeeeah', created: '2013.05.03'},
                {type: 'red', text: 'Something something...', created: '2013.05.03'},
                {type: 'orange', text: 'Something something...', created: '2013.05.03'},
                {type: 'orange', text: 'business meeting', created: '2013.05.03'},
                {type: 'red', text: 'mep mep', created: '2013.05.03'},
              ],
            news: [
                {header: 'Zehn, die Minister werden sollten',
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
            social: [
                {
                  type: 'twitter', text: 'some stupid entry.', created: '2013.05.03', 
                  url: 'http://google.de', picture: 'http://hollywoodhatesme.files.wordpress.com/2011/08/cillian-murphy.jpg',
                  name: 'Cillian Murphy'
                },
                {
                  type: 'twitter', text: 'some stupid entry. aoeu aoeu oeu', created: '2013.05.03', 
                  url: 'http://google.de', picture: 'http://hollywoodhatesme.files.wordpress.com/2011/08/cillian-murphy.jpg',
                  name: 'Cillian Murphy'
                },
                {
                  type: 'twitter', text: 'some stupid entry. aoeuaoeu aoeuaoeu', created: '2013.05.03', 
                  url: 'http://google.de', picture: 'http://hollywoodhatesme.files.wordpress.com/2011/08/cillian-murphy.jpg',
                  name: 'Cillian Murphy'
                }
              ],
            calendar: [{start: '2013-12-17 12:00',
                     end: '2013-12-17 14:00',
                     text: 'Ersten Meilenstein präsentieren',
                     location: 'TEL 1119',
                     priority: 'urgent',
                     category: 'business'},
                    {start: '2013-12-17 14:00',
                     end: '', text: 'Mittagessen!',
                     location: 'Mensa',
                     priority: 'normal',
                     category:'private'},
                    {start: '2013-12-18 8:00',
                     end: '',
                     text: 'Frühstück mit Harry',
                     location: '',
                     priority: 'urgent',
                     category:'private'},
                    {start: '2013-12-19 19:00',
                     end: '2013-12-19 22:30',
                     text: 'Kino - Hobbit 2',
                     location: 'Cineplexx Potsdamer Platz',
                     priority: 'low',
                     category:'private'},
                ]
            };
      }]);

