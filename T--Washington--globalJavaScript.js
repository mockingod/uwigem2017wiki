// Team Washington iGEM
// Javascript page for Team wiki
// Controls loading for the entire website.

(function() {
    'use strict';
    var $$$ = function(id) { return document.getElementById(id); };
    window.onload = function() {
        // Set up hover dropdown functionality
        $('body').on('mouseenter mouseleave','.dropdown',function(e){
            var _d=$(e.target).closest('.dropdown');_d.addClass('show');
            setTimeout(function(){
                _d[_d.is(':hover')?'addClass':'removeClass']('show');
            },300);
        });

        // Grab JSON data
        $.get("https://raw.githubusercontent.com/mockingod/uwigem2017wiki/master/T--Washington--allData.json", function(data, status) {
            if(status != "success") {
                alert("Failed to load data");
            } else {
                loadData(JSON.parse(data));
            }
        });

    };

    function loadData(data) {
        loadNavbar(data.allcode.navbar)
    }

    function loadNavbar(data) {


        
        $('<div></div>')
            .addClass("test")
            .append($('<div></div>')
                .addClass("test2")
                .append("test")

        ).appendTo("#test");



        //$("<div id='test'> test </div>").appendTo("#test");




        alert(data[0].parent);
    }

    function getJSONData() {
        
    }

})();