// Team Washington iGEM
// Javascript page for Team wiki
// Controls loading for the entire website.

// Function wrapper
(function() {
    // Use strict style (doesn't affect functionality)
    'use strict';

    // Set up shortcuts for getting elements of web page
    var $$$ = function(id) { return document.getElementById(id); };
    var $$ = function(id) { return document.getElementsByClassName(id); };


    // Window onload function. This code is executed when the HTML page first loads
    window.onload = function() {
        // Loads data from html page to check what page it is on
        // Used for setting which navbar item to be "active"
        // Additionally used for loading data to a page.
        var pageIdentifier = $$("pageIdentifier")[0].id;
        var subPageIdentifier = $$("subPageIdentifier")[0].id;

        // Grab JSON data-- json file is hardcoded in.
        // Additionally, start the loading procedure in loadData();
        //http://2017.igem.org/Template:Washington/AllData?action=raw&ctype=text/json
        $.get("https://raw.githubusercontent.com/mockingod/uwigem2017wiki/master/T--Washington--allData.json", function(data, status) {
            if(status != "success") {
                alert("Failed to load data");
            } else {
                loadData(JSON.parse(data), pageIdentifier, subPageIdentifier);
            }
        });

        // ScrollJump behavior sourced from stackoverflow, don't touch this unless you know
        // what you're doing
        $('a[href*="#"]')
          // Remove links that don't actually link to anything
          .not('[href="#"]')
          .not('[href="#0"]')
          .click(function(event) {
            // On-page links
            if (
              location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
              && 
              location.hostname == this.hostname
            ) {
              // Figure out element to scroll to
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
              // Does a scroll target exist?
              if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                  scrollTop: target.offset().top
                }, 1000, function() {
                  // Callback after animation
                  // Must change focus!
                  var $target = $(target);
                  $target.focus();
                  if ($target.is(":focus")) { // Checking if the target was focused
                    return false;
                  } else {
                    $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                    $target.focus(); // Set focus again
                  };
                });
              }
            }
          });

    };

    // Loads necessary data
    function loadData(data, pageIdentifier, subPageIdentifier) {
        loadNavbar(data.allcode, pageIdentifier);
        loadPageData(data.allcode, subPageIdentifier);
    }

    // loadNavbar is a function that loads the entire navbar. It is visually
    // unoptimized for user editing convenience. To load the navbar on each
    // HTML page, all that is necessary is to have a div with the id
    // "customNavbar" and the correct corresponding pageIdentifier to set an
    // active page in the navbar
    // eg. the Drylab -- Hardware page, should have the following empty divs:
    //      <div class="pageIdentifier" id="Drylab"></div>
    //      <div class="subPageIdentifier" id="Hardware"></div>
    //      <div id="customNavbar"></div>
    // For reference, see bootstrap 4.0 documentation on Navbars
    function loadNavbar(allcode, pageIdentifier) {
        // Json data used for navbar data
        var data = allcode.navbar;

        // Create the unordered list tag for the multiple navbar items
        // Give it the appropriate classes and set up css
        // You can use .css or .attr, look up jquery HTML/CSS for this
        var unorderedList = $("<ul></ul>")
            .addClass("navbar-nav")
            .addClass("ml-auto")

        // Sets up each individual dropdown and adds it to the unordered list
        // that we just created. We shouldn't need to touch this code much.
        for(var i = 0; i < data.length; i++) {
            var parentName = data[i].parent;
            var dropdownMenu = $("<div></div>")
                .addClass("dropdown-menu")
                .addClass("dropdown-menu-right")
                .attr({
                    "aria-labelledby":"navbarDropdownMenuLink",
                    "style":"text-align: right"
                });
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
                        "href":"", 
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

        // Creates top-level navbar tags
        var totalNavbar = $("<nav></nav>")
            .addClass("navbar")
            .addClass("fixed-top")
            .addClass("navbar-expand-lg")
            .addClass("navbar-dark")
            .addClass("mainNav")
            .addClass("abelFont")
            .attr({
                "style":"margin-top:22px; max-height: 62px"
            });;

        // Draws logo
        var logoData = allcode.miscImages.logo;
        var logoInsert = $("<a></a>")
            .addClass("navbar-brand")
            .attr("href", data[0].link)
            .append($("<img></img>")
                .attr({
                    "src":logoData.link,
                    "alt":logoData.alt,
                    "style":logoData.style
                })
            );

        // Draws 3-lined toggle button (for use when window is under a certain width)
        var togglerButton = $("<button></button>")
            .addClass("navbar-toggler")
            .attr({
                "type":"button",
                "data-toggle":"collapse",
                "data-target":"#navbarNavDropdown",
                "aria-controls":"navbarNavDropdown",
                "aria-expanded":"false",
                "aria-label":"Toggle navigation"
            })
            .append($("<span></span>")
                .addClass("navbar-toggler-icon")
            );

        var divContainer = $("<div></div>")
            .addClass("collapse")
            .addClass("navbar-collapse")
            .attr({
                "style":"text-align: right",
                "id":"navbarNavDropdown"
            })

        // Append everything to each other in a ladder and put into customNavbar div
        divContainer.append(unorderedList);
        totalNavbar.append(logoInsert);
        totalNavbar.append(togglerButton);
        totalNavbar.append(divContainer);
        $("#customNavbar").append(totalNavbar);
    }

    // 
    function loadPageData(allcode, subPageIdentifier) {
        var loadCertainPages = {
            "Main" : function() { loadMainPage(allcode); }
        };

        loadCertainPages[subPageIdentifier]();

        // var a = {
        //     "test" : function() { alert("testsadf"); },
        //     "test2" : function() { alert("test2fgdshfdsgda"); }
        // }
        // a["test"]();
    }

    function loadMainPage(allcode) {
        $$$("backgroundImage").style.background = "url('" + allcode.pageData.main.backgroundImage + "') center no-repeat ";
        $$$("backgroundImage").style.backgroundSize = "cover";
        //$$$("linkToDescription").href = allcode.pageData.main.linkToDescription;
    }

})();