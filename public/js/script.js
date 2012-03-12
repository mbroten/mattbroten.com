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
  
  var $navLinks = $('nav a');
  var getNavLinkId = function(action){
    return action.split('/')[1] + '-link';
  };
  var selectNavLink = function(navLinkId){
    $navLinks.removeClass('selected');
    $('nav a#'+navLinkId).addClass('selected');
  };

  var VALID_ACTIONS = [
    '/resume', 
    '/papers',
    '/papers/cscl1101',
    '/papers/psychology3051', 
    '/papers/philosophy4615',
    '/papers/math5447'
  ];
  var AppRouter = Backbone.Router.extend({
    routes: {
      "*actions": "defaultRoute"
    },
    defaultRoute: function(action){
      var navLinkId = 'home-link';
      var url = '/home.html';
      if (_.include(VALID_ACTIONS, action)){
        navLinkId = getNavLinkId(action);
        url = action + '.html';
      }
      selectNavLink(navLinkId);
      getContent(url);
    }
  });
  var app_router = new AppRouter;
  Backbone.history.start();

  var $logoImage = $('img#logo-image');
  var fadeInHeaderImage = function(){
    $logoImage.fadeIn(1000);
  };
  $logoImage.load(fadeInHeaderImage);
  if ($logoImage.prop('complete')){
    fadeInHeaderImage();
  }

  var DESCRIPTIONS = [
    'Full Stack Web Developer', 
    'Open Source Enthusiast',
    'Early Adopter', 
    'Avid Reader', 
    'Live Music Addict', 
    'Tyro Surfer/Skater', 
    'Free Spirit'
  ];
  var DESCRIPTIONS_LENGTH = DESCRIPTIONS.length;
  var $bio = $('h4#bio');
  var setDescription = function(i){
    if (i === DESCRIPTIONS_LENGTH){
      i = 0;
    }
    $bio.fadeOut(1500, function(){
      $bio.text(DESCRIPTIONS[i]);
      $bio.fadeIn(1500, function(){
        setTimeout(function(){
          setDescription(i + 1);
        }, 2000);
      })
    });
  };
  setTimeout(function(){
    setDescription(1);
  }, 2000);
});
