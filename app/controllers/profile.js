$( '#imagesDisplay' )
	.masonry( {

		//opt
		itemSelector: '.imageCtn',
		columnWidth: 200
	} );

function addNew() {
	var newUrl = $( "#newImage" )
		.val();
	var title = $( '#newImageTitle' )
		.val() || ' ';
	if ( newUrl && isImageUrl( newUrl ) ) {
		$.ajax( {
			url: '/images/my',
			type: 'POST',
			dataType: 'json',
			data: JSON.stringify( {
				url: newUrl,
				title: title
			} ),
			contentType: "application/json"


		} )
	} else { alert( "please enter a valid image url" ) }


}
$(document).ready(()=>
$.get( '/images/my', ( res ) => {
  console.log(res);
	res = JSON.parse( res );
	var newhtml = "";
	for ( var i = 0; i < res.length; i++ ) {
		newhtml += '<div class ="imageCtn"><button onclick = "removeImage()">X</button>' +
			'<image src="' + res[ i ].url + '" /><p class = "title">' + res[ i ].title + '</p></div>'
	}
	$( '#imagesDisplay' )
		.html( newhtml );

} )
);

function isImageUrl( s ) {
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
	return regexp.test( s ) && ( /\.(gif|jpg|jpeg|tiff|png)$/i )
		.test( s );
}
