var ImagesHandler = require( './app/controllers/imagesController.js' );
var imagesHandler = new ImagesHandler();


exports.uploadImage = ( req, res ) => {
//console.log(req.body);
	if ( req.isAuthenticated() ) {
		imagesHandler.addImage( req.user._id, req.body.title, req.body.url,(err)=>{res.send(err)} )
	}
}




exports.deleteImage = ( req, res ) => {
	var id = req.params.id;
	if ( req.isAuthenticated() ) {

		imagesHandler.ImagesModel.findOne( { _id : id }, ( err,result ) => {
			if(result){
			if ( result.owner == req.user._id ) {
				imagesHandler.removeImage( id );
			}
		}
		else{
			res.sendStatus(404);
		}
		} )
	}

}




exports.userImages = ( req, res ) => {
	var id = req.params.id || req.user._id;
	if ( id ) {
		imagesHandler.userImages( id, ( d ) => { res.json( d ) } )
	} else { res.sendStatus( 404 ) }
}



exports.indexImages = ( req, res ) => {
	imagesHandler.getIndexImages( ( d ) => { res.json( d ) } );
}

exports.index = ( req, res ) => {
	res.sendFile( __dirname + '/public/index.html' )
}

exports.profile = ( req, res ) => {

}
