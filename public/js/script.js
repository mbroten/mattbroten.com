/* Author: Matt Broten

*/

$(function(){
  var $logoImage = $('img#logo-image');
  $logoImage.load(function(){
     $logoImage.fadeIn(1000);
  });
  if ($logoImage.prop('complete')){
    $logoImage.fadeIn(1000);
  }
});
