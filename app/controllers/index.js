$('#imagesDisplay').masonry({

//opt
itemSelector : '.image',
columnWidth : 200
});


$(document).ready(
  ()=>{
    console.log('hey');
  $.get('/getIndex',function(result) {
    var newhtml = "";
  console.log(result)
  for(var i = 0 ; i<result.length ; i++){

  newhtml+="<image src='"+result[i].url+"' class='imageCtn' onerror='imgError(this);'/>"



  }
  $('#imagesDisplay').html(newhtml);


  })
}
)

  function imgError(image) {
    image.onerror = "";
    image.src = "/images/noimage.gif";
    return true;
}
