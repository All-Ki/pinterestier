var Users = require( '../models/users.js' );
var Images = require( '../models/image.js' );

function ImagesHandler() {
	this.ImagesModel = Images;

	this.getIndexImages = function ( cb ) {
		Images.find( ( err, result ) => {
				var ret = [];
				result = result;
				Promise.all(
						result.map( res =>
								Users.findById( res.owner )
									.then( ( user ) => {
										ret.push( {
											url: res.url,
											title: res.title,
											owner: res.owner,
											ownerName: user.twitter.displayName
										})
										console.log('hey');
									} )


						) )
					.then( () => {console.log(ret); return ( cb( ret ) ) } )


			})
		}


		this.userImages = function ( user, cb ) {
			Images.find( { owner: user }, ( err, result ) => {
				ret = [];

				for ( var i = 0; i < result.length; i++ ) {
					ret.push( { url: result[ i ].url, title: result[ i ].title, id: result[ i ]._id } );


				}
				return cb( ret );
			} )
		}


		this.addImage = function ( user, title, url, cb ) {
			Images.findOrCreate( {
					owner: user.toString(),
					'title': title,
					'url': url
				},
				( err, data ) => {

					if ( cb ) {
						return cb( err );
					}
				} )
		}




		this.removeImage = function ( id ) {
			Images.findOne( { _id: id }, ( err, result ) => {
				result.remove();
			} )

		}


	}

	module.exports = ImagesHandler;
