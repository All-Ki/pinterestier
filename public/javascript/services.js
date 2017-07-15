app
	.factory( 'ImagesFactory', function ( $http, $q ) {
		return {
			uploadNew: function ( newImage, cb ) {
				$http.post( '/userImages', newImage )
					.then( ( d ) => { cb( d ) }, ( err ) => { console.log( err ) ; cb(err)} );
			},

			delete: function ( id ) {
				$http.delete( '/userImages/' + id );
			},

			getIndexImages: function () {
				var deferred = $q.defer();
				$http.get( '/indexImages' )
					.then( ( d, status ) => {
							deferred.resolve( d );
						}

					);
				return deferred.promise;
			},

			getUserImages: function ( id ) {
				var deferred = $q.defer();

				$http.get( '/userImages/' + id )
					.then( ( d, status ) => {
						deferred.resolve( d );
					} )
				return deferred.promise;
			}
		}

	} )

	.factory( 'UserSvc', function ( $http, $q ) {
			return {
				user: false,
				getUser: function () {

					var deferred = $q.defer();
					if ( this.user ) { deferred.resolve( this.user ) } else {
						$http.get( '/loggedin' )
							.then( ( d ) => {
								this.user = d.data;
								deferred.resolve( this.user );

							}, ( status ) => {
								deferred.reject( status )
							} )
					}
					return deferred.promise;

				}
			}
		}


	)
