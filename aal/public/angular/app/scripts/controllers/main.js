'use strict';

angular.module('angularApp')
  .controller('MainCtrl', function ($scope) {
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
                             {type: 'red', text: 'Something something...', created: '2013.05.03'},
                             ]};

  });
