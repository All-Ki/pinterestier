var app = angular.module( 'pinterestier', [ 'dcbImgFallback','wu.masonry', 'ngRoute' ] )
	.config( [ '$routeProvider',
		function ( $routeProvider ) {
			$routeProvider.
			when( '/', {
					templateUrl: 'partials/index.html',
					controller: mainController
				} )
				.
			when( '/user/:id/:userName', {
					templateUrl: 'partials/user.html',
					controller: userController
				} )
				.
			when( '/user', {
					templateUrl: 'partials/profile.html',
					controller: userController,
				} )
				.otherwise( '/' );
		}
	] )
	.controller( 'mainController', mainController )
	.controller( 'userController', userController )
	.controller( 'headerController', headerController )
