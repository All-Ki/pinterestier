'use strict';

var path = require( 'path' );
var logger = require('morgan')
var express = require( 'express' );
var routes = require( './router.js' );
var mongoose = require( 'mongoose' );
var passport = require( 'passport' );
var session = require( 'express-session' );
var bp = require( 'body-parser' );
var app = express();
require( 'dotenv' )
	.load();
require( './app/config/passport' )( passport );


app.use('/public',express.static(path.join(__dirname,'/public')))
app.use('/bower_components',express.static(path.join(__dirname ,'/bower_components')));
app.locals.basedir = __dirname;
mongoose.connect( process.env.MONGO_URI );
mongoose.Promise = global.Promise;

app.use( bp.json() );
app.use( bp.urlencoded( { extended: true } ) );
app.use( express.static( path.join( __dirname, 'public' ) ) );
app.use(logger('dev'))



app.use( session( {
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
} ) );

app.use( passport.initialize() );
app.use( passport.session() );

var auth = ( req, res, next ) => {
	req.isAuthenticated() ?
		next() :
		res.sendStatus( 401 );
}



app.get( '/', routes.index )
app.get( '/indexImages', routes.indexImages )
app.get( '/userImages', auth ,routes.userImages )
app.delete("/userImages/:id",auth,routes.deleteImage)
app.post('/userImages',auth,routes.uploadImage)
app.get( '/userImages/:id', routes.userImages )



app.get( '/loggedin', ( req, res ) => {
	if ( req.isAuthenticated() ) {
		console.log(req.user);
		res.json( req.user )
	} else {

		res.sendStatus(401);

	}

} )


app.route( '/auth/twitter' )
	.get( passport.authenticate( 'twitter' ) );

app.route( '/auth/twitter/callback' )
	.get( passport.authenticate( 'twitter', {
		successRedirect: '/',
		failureRedirect: '/login'
	} ) );









var port = process.env.PORT || 8080;
app.listen( port, function () {
	console.log( 'Node.js listening on port ' + port + '...' );
} );
