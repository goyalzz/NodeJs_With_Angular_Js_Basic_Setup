angular.module('app', ['ui.router', 'templates', 'ngMaterial', 'home', 'detail','angular-loading-bar']).config(function( $urlRouterProvider, $locationProvider, $httpProvider ){
	$locationProvider.html5Mode( true );
    $urlRouterProvider.otherwise( 'home' );
} ).run( function() {} );