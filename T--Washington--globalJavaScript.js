// Team Washington iGEM
// Javascript page for Team wiki
// Controls loading for the entire website.

(function() {
    'use strict';
    
    window.onload = function() {
        // local global variable
        var jsonData = "";

        // Set up hover dropdown functionality
        $('body').on('mouseenter mouseleave','.dropdown',function(e){
            var _d=$(e.target).closest('.dropdown');_d.addClass('show');
            setTimeout(function(){
                _d[_d.is(':hover')?'addClass':'removeClass']('show');
        },300);

        // Grab JSON data
        $.get("T--Washington--allData.json", function(data, status) {
            if(status != "success") {
                alert("Failed to load data");
            } else {
                jsonData = JSON.parse(data);
            }
        });

        $("body").text = "testtestest"

    });


    function loadNavbar() {
        
    }

    function getJSONData() {
        
    }



    };
})();