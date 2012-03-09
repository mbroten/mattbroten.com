/* Author: Matt Broten

*/
$(function(){
  var $loadingIndicator = $('img#loading-indicator');
  var $target = $('article#main-target');
  var getContent = function(url){
    $target.fadeOut('fast', function(){
      $loadingIndicator.fadeIn('fast', function(){
        $.get(url, function(data){
          $target.html(data);
          $loadingIndicator.fadeOut('fast', function(){
            $target.fadeIn('fast');
          });
        });
      });
    });
  };
  
  var VALID_ACTIONS = ['/resume', '/papers'];
  var AppRouter = Backbone.Router.extend({
    routes: {
      "*actions": "defaultRoute"
    },
    defaultRoute: function(action){
      if (_.include(VALID_ACTIONS, action)){
        getContent(action + '.html');
        return;
      }
      getContent('/home.html');
    }
  });
  var app_router = new AppRouter;
  Backbone.history.start();

  var $logoImage = $('img#logo-image');
  var $logoText = $('hgroup#logo-text')
  $logoImage.load(function(){
    $logoImage.fadeIn(1000, function(){
      $logoText.removeClass('initial');
      $logoText.addClass('final'); 
    });
  });
  if ($logoImage.prop('complete')){
    $logoImage.fadeIn(1000, function(){
      $logoText.removeClass('initial');
      $logoText.addClass('final');  
    });
  }
});
