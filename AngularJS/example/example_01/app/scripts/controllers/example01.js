'use strict';

angular.module('example01App')
  .controller('ExampleCtrl', function ($scope) {
    $scope.user = {};
    $scope.user.details = {
    	"username" : "Todd Motto",
    	"id" : "89101112"
    }

    $scope.myModel = 'Hello, Angular fanatic.';
  });
