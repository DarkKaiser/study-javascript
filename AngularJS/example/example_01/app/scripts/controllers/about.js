'use strict';

/**
 * @ngdoc function
 * @name example01App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the example01App
 */
angular.module('example01App')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
