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
            $target.fadeIn('fast', function(){
              $loadingIndicator.hide();
            });
          });
        });
      });
    });
  };
  
  var VALID_ACTIONS = ['/resume', '/papers', '/papers/philosophy4615'];
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
  var animateLogoText = function(callback){
    $logoText.fadeOut('slow', function(){
      $logoText.removeClass('initial');
      $logoText.addClass('final');
      $logoText.fadeIn('fast', callback);     
    });
  };
  $logoImage.load(function(){
    animateLogoText(function(){
      $logoImage.fadeIn(1000)
    });
  });
  if ($logoImage.prop('complete')){
    animateLogoText(function(){
      $logoImage.fadeIn(1000)
    });
  }
});
