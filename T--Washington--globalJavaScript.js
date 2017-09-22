// Team Washington iGEM
// Javascript page for Team wiki
// Controls loading for the entire website.

(function() {
    'use strict';
    
    window.onload = function() {
        // Set up hover dropdown functionality
        $('body').on('mouseenter mouseleave','.dropdown',function(e){
            var _d=$(e.target).closest('.dropdown');_d.addClass('show');
            setTimeout(function(){
                _d[_d.is(':hover')?'addClass':'removeClass']('show');
        },300);
    });


    function loadNavbar() {
        
    }





    };
})();