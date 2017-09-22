// Team Washington iGEM
// Javascript page for Team wiki
// Controls loading for the entire website.

(function() {
    'use strict';

    // Set up shortcuts for getting elements of web page
    var $$$ = function(id) { return document.getElementById(id); };
    var $$ = function(id) { return document.getElementsByClassName(id); };

    window.onload = function() {
        // Set up hover dropdown functionality
        $("body").on('mouseenter mouseleave','.dropdown',function(e){
            var _d=$(e.target).closest(".dropdown");_d.addClass("show");
            setTimeout(function(){
                _d[_d.is(":hover")?'addClass':'removeClass']("show");
            },300);
        });

        // Grab JSON data-- json file is hardcoded in.
        $.get("https://raw.githubusercontent.com/mockingod/uwigem2017wiki/master/T--Washington--allData.json", function(data, status) {
            if(status != "success") {
                alert("Failed to load data");
            } else {
                loadData(JSON.parse(data));
            }
        });

    };

    function loadData(data) {
        loadNavbar(data.allcode)
    }

    function loadNavbar(allcode) {
        // Loads data from html page to check what page it is on
        // Used later for setting which navbar item to be "active"
        var pageIdentifier = $$("pageIdentifier")[0].id;

        // Json data used for navbar data
        var data = allcode.navbar;

        // Create the unordered list tag for the multiple navbar items
        // Give it the appropriate classes and set up css
        // You can use .css or .attr, look up jquery HTML/CSS for this
        var unorderedList = $("<ul></ul>")
            .addClass("navbar-nav")
            .addClass("ml-auto")
            .css("padding-right", "60px");

        // Sets up each individual dropdown and adds it to the unordered list
        // that we just created. We shouldn't need to touch this code much.
        for(var i = 0; i < data.length; i++) {
            var parentName = data[i].parent;
            var dropdownMenu = $("<div></div>")
                .addClass("dropdown-menu")
                .attr("aria-labelledby", "navbarDropdownMenuLink");
            for(var j = 0; j < data[i].children.length; j++) {
                var addData = data[i].children[j];
                var dropdownAdd = $("<a></a>")
                    .addClass("dropdown-item")
                    .attr("href", addData.link)
                    .append(addData.name);
                dropdownMenu.append(dropdownAdd);
            }

            var navbarItem = $("<li></li>")
                .addClass("nav-item")
                .addClass("dropdown")
                .append($("<a></a>")
                    .addClass("nav-link")
                    .addClass("dropdown-toggle")
                    .attr({ 
                        "href":data[i].link, 
                        "id":"navbarDropdownMenuLink",
                        "data-toggle":"dropdown",
                        "aria-haspopup":"true",
                        "aria-expanded":"false"
                    })
                    .append(parentName)
                );

            if(pageIdentifier == parentName) {
                navbarItem.addClass("active");
            }

            navbarItem.append(dropdownMenu);
            unorderedList.append(navbarItem);
        }

        var totalNavbar = $("<nav></nav>")
            .addClass("navbar")
            .addClass("sticky-top")
            .addClass("navbar-expand-lg")
            .addClass("navbar-dark")
            .addClass("mainNav")
            .addClass("abelFont");

        alert(allcode.length);

        var logoInsert = $("<a></a>")
            .addClass("navbar-brand")
            .attr("href", data[0].link) // Will always be main.html
            .append($("<img></img>")
                .attr({
                    "src":allcode.images.logo.link,
                    "alt":allcode.images.logo.alt,
                    "style":allcode.images.logo.style
                })
            );

        var togglerButton = $("<button></button>")
            .addClass("navbar-toggler")
            .attr({
                "type":"button",
                "data-toggle":"collapse",
                "data-target":"#navbarNavDropdown",
                "aria-controls":"navbarNavDropdown",
                "aria-expanded":"false",
                "aria-label":"Tottle navigation"
            })
            .append($("<span></span>")
                .addClass("navbar-toggler-icon")
            );

        var divContainer = $("<div></div>")
            .addClass("collapse")
            .addClass("navbar-collapse")
            .attr({
                "id":"navbarNavDropdown"
            })

        divContainer.append(unorderedList);
        totalNavbar.append(logoInsert);
        totalNavbar.append(togglerButton);
        totalNavbar.append(divContainer);
        $("#customNavbar").append(totalNavbar);


        //alert(pageIdentifyer);

        // All tests confirmed to work.
        // var test = $("<div></div>")
        //     .css("color", "red")
        //     .addClass("test")
        //     .append($("<div></div>")
        //         .addClass("test2")
        //         .attr("aria-haspopup", "true")
        //         .attr("aria-exasdf", "false")
        //         .append("test")
        //     );

        // test.addClass("test14213")

        // $("#test").append(test);



        //$("<div id='test'> test </div>").appendTo("#test");




        //alert(data[0].parent);
    }

    function getJSONData() {
        
    }

})();