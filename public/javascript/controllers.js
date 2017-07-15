function mainController( $scope, $route, ImagesFactory ) {

	ImagesFactory.getIndexImages()
		.then( ( d ) => {
			$scope.images = d.data;
			//  console.log($scope.images);
		} );

}

function headerController( $scope, UserSvc ) {

	UserSvc.getUser()
		.then( ( user ) => {
		$scope.user = user.twitter
				//console.log( $scope.user );
			},
			( error ) => {
				console.log( error )
			}
		);

}


function userController( $scope, $route, ImagesFactory, UserSvc ) {
	var id;

	if ( !$route.current.params.id ) {
		console.log('ownerMode')

		UserSvc.getUser()
			.then( ( u ) => {
					id = u._id;
					ImagesFactory.getUserImages( id )
						.then( ( d ) => { $scope.images = d.data; } )
				},
				( error ) => {} );

		$scope.newImage = {}

		$scope.saveImage = function () {
			$scope.newImage.title = $scope.newImage.title || '';
			if($scope.newImage.url){

				ImagesFactory.uploadNew($scope.newImage,(data)=>{
					console.log('uploaded');
					$route.reload();
				}
				);
			}
			else{
				alert('url required');
			}

			}

		$scope.delete = function ( id ) {
			if(id){
      ImagesFactory.delete(id);
		}
      $route.reload();
		}

		$scope.updatePreview = function(){
			angular.element(document.querySelector('#previewImg')).attr('src',$scope.newImage.url);
		}

	}


  else
  {
		$scope.userName = $route.current.params.userName;
		id = $route.current.params.id;
		ImagesFactory.getUserImages( id )
			.then( ( d ) => {
				$scope.images = d.data;
			} )
	}
}





function isImageUrl()
{}
