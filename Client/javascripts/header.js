$(document).ready(function(){
    $('header .mobile .menu-button').on('click', function(){
        $('header .mobile ul').animate({left: "0%"}, 500);
        $('header .mobile ul .menu-button-close').show();
    });
    $('header .mobile .menu-button-close').on('click', function(){
        $('header .mobile ul').animate({left: "-100%"}, 500);
        $('header .mobile ul .menu-button-close').hide();
    });
});
