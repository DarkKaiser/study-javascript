'use strict';

/**
 * @ngdoc overview
 * @name example01App
 * @description
 * # example01App
 *
 * Main module of the application.
 */
angular
  .module('example01App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/example01', {
        templateUrl: 'views/example01.html',
        controller: 'ExampleCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
