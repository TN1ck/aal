'use strict';

/* global angular, moment, d3 */

var app = angular.module('angularApp');

app.factory('SocialComparison', function($FB, $q) {

  var things = ['movies','video.watches','music','music.listens','books','books.reads','friends'];
  var otherThings = ['games','likes','links','interests'];
  things = things.concat(otherThings);
  // console.log(things);
  // console.log(otherThings);
  var grouping = ['movies','music','books','friends','other'];
  var colorMapping = {movies: 'red', music: 'yellow',
    books: 'green', friends: 'blue', other: 'orange'};

  var createNewMapping = function() {
    var mapping = {};
    for (var i=0; i<grouping.length; i++) {
      mapping[grouping[i]] = [];
    }
    return mapping;
  }

  var semanticallyGroupThings = function(array) {
    var mapping = createNewMapping();

    // console.log(mapping)
    for (var i=0; i<array.length; i++) {
      if ($.inArray(things[i], otherThings) != -1) {
        // console.log(things[i])
        mapping['other'] = mapping['other'].concat(array[i].data);
      } else if (things[i] == 'video.watches') {
        mapping['movies'] = mapping['movies'].concat(array[i].data.map(function(entry) {return entry.data.movie;}));
      } else if (things[i] == 'music.listens') {
        mapping['music'] = mapping['music'].concat(array[i].data.map(function(entry) {return entry.data.song;}));
      } else if (things[i] == 'books.reads') {
        mapping['books'] = mapping['books'].concat(array[i].data.map(function(entry) {return entry.data.book;}));
      } else {
        mapping[things[i]] = mapping[things[i]].concat(array[i].data);
      }
    }
    return mapping;
  };

  var constructStringsForApi = function(persons) {
    var array = new Array(persons.length);

    for (var i=0; i<persons.length; i++) {
      array[i] = [];
      for (var j=0; j<things.length; j++) {
        array[i].push('$FB.api("'+persons[i]+'/'+things[j]+'")');
      }
    }
    return array;
  };

  var evalStringsForOnePerson = function(indexOfPerson, array) {
    for (var i=0; i<array[indexOfPerson].length; i++) {
      array[indexOfPerson][i] = eval(array[indexOfPerson][i]);
    }
    return array[indexOfPerson];
  };

  var filterDifferences = function(dataSets) {
    // console.log(dataSets);
    var commonObjects = createNewMapping();
    // Iterate over all categories of information
    for (var currentCategory in dataSets[0]) {
      for (var i=0; i<dataSets[0][currentCategory].length; i++) {
        var currentObject = dataSets[0][currentCategory][i];
        if (typeof currentObject === 'undefined')
          continue;
        for (var j=0; j<dataSets[1][currentCategory].length; j++) {
          // debugger;
          if (typeof dataSets[1][currentCategory][j] === 'undefined')
            continue;
          if (currentObject.id == dataSets[1][currentCategory][j].id) {
            // console.log(currentObject);
            commonObjects[currentCategory].push(currentObject);
          }
        }
      }
    }
    return commonObjects;
  }

  var compareTwoPersons = function(person1, person2) {
    var persons = [person1, person2];
    var arrayOfStrings = constructStringsForApi(persons);
    // console.log(arrayOfStrings)
    var arrayOfFirstPerson = evalStringsForOnePerson(0, arrayOfStrings);
    // console.log(arrayOfFirstPerson)
    $q.all(arrayOfFirstPerson).then(function(data1) {
      var arrayOfSecondPerson = evalStringsForOnePerson(1, arrayOfStrings);
      $q.all(arrayOfSecondPerson).then(function(data2) {
        // console.log(data1);
        data1 = semanticallyGroupThings(data1);
        data2 = semanticallyGroupThings(data2);
        var commonObjects = filterDifferences([data1, data2]);
        console.log(commonObjects);
      });
    });
  };

  return {
    compareTwoPersons: compareTwoPersons,
    colorMapping: colorMapping
  };
});