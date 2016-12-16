$(document).ready(function() {
	




// form style

(function($) {
    $(function() {
      $('input[type="radio"]').styler({
        selectSearch: true
      });
    });
    })(jQuery);


//menu-trigger icon effect

$('#nav-icon1').click(function(){
	$(this).toggleClass('open');
});




// scroll to anchor 

$(function() {
  $('.navbar-default .navbar-nav>li> a[href*="#"]:not([href="#"]), .menu-footer a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});


//swipe bootstrap slider
if ($(window).width() < 768) {
   $(".carousel").swiperight(function() {  
            $(this).carousel('prev');  
            });  
         $(".carousel").swipeleft(function() {  
            $(this).carousel('next');  
       });  
}




//mobie menu

// $('.trigger-menu').click(function(){
//   $("nav").animate({left: 0}, 800);
// });
// $('nav .esc').click(function(){
//   $("nav").animate({left: '-100%'}, 800);
// });
// $('nav ul a').click(function(){
//   $("nav").css('left', '-100%');
// });

$('.trigger-menu').click(function(){
  $("nav").animate({left: 0}, 800);
  $(this).addClass('active');
});
$('nav .esc').click(function(){
  $("nav").animate({left: '-100%'}, 800);
});
$('nav ul a').click(function(){
  $("nav").css('left', '-100%');
});





});//end DOM