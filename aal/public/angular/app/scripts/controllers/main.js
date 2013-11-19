'use strict';

angular.module('angularApp')
  .controller('MainCtrl', function ($scope) {
    $scope.mockup = {name: 'Cillian Murphy', 
                     picture: 'http://hollywoodhatesme.files.wordpress.com/2011/08/cillian-murphy.jpg',
                     telephone: '023234020',
                     todos: [{type: 'red', text: 'Something something...'},
                             {type: 'green', text: 'Something something...'},
                             {type: 'green', text: 'Something something...'},
                             {type: 'red', text: 'Something something...'},
                             {type: 'red', text: 'Something something...'},
                             {type: 'orange', text: 'Something something...'},
                             {type: 'orange', text: 'Something something...'},
                             {type: 'red', text: 'Something something...'},
                             {type: 'red', text: 'Something something...'},
                             ]};

  });
