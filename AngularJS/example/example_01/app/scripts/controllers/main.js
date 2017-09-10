'use strict';

/**
 * @ngdoc function
 * @name example01App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the example01App
 */
angular.module('example01App')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
