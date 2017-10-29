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

        $('body').scrollspy({ target: '#spyBar' });
        $('.collapse').collapse();

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

    };

    // Loads necessary data
    // Enables popovers
    // Loads navigation bar
    // Loads footbar
    // Loads namebar if there is one
    // Loads page data if there is any required data to be loaded.
    function loadData(data, pageIdentifier, subPageIdentifier) {
        $(function () {
            $('[data-toggle="popover"]').popover()
        });

        loadNavbar(data.allcode, pageIdentifier);
        loadFootbar();
        loadNamebar();
        if(!!$$$("sidebarInsert")) {
            loadSectionsandSidebar();
        }
        addScrollBehavior();
        loadPageData(data.allcode, subPageIdentifier);
    }

    function addScrollBehavior() {
        // ScrollJump behavior sourced from stackoverflow, don't touch this unless you know
        // what you're doing
        $('a[href*="#"]')
          // Remove links that don't actually link to anything
          .not('.collapse')
          .not('.collapsed')
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
    }

    function loadSectionsandSidebar() {

        // Create outer nav with
            // id "spyBar"
            // class navbar, navbar-light, bg-light, sidebar, style="width:100%"
        var outerNav = $("<nav></nav>")
            .addClass("navbar")
            .addClass("navbar-light")
            .addClass("bg-light")
            .addClass("sidebar")
            .attr({
                "style":"width: 100%",
                "id":"spyBar"
            });

        // Creater inner nav with
            // class nav, nav-pills, flex-column, container-fluid
            // style: padding: none; align-content: center
        var innerNav = $("<nav></nav>")
            .addClass("nav")
            .addClass("nav-pills")
            .addClass("flex-column")
            .addClass("container-fluid")
            .attr({
                "style":"padding: none; align-content: center"
            });

        // Create each section:
            // a tag
                // class nav-link
                // href "#" + $$("jumpSection")[i].id
                // style="width:100%; margin-bottom: 30px"
                // .append(BUTTON)
                    // where button tag is
                        // type: button
                        // class: fadeOnLoad, hvr-sweep-to-right abelFont
                        // style: width: 100%
                        // .append($$("jumpSection")[i].id)

            // append each section to innerNav

        var sections = $$("jumpSection");

        for(var i = 0; i < sections.length; i++) {
            var sectionId = sections[i].id;

            var sectionLink = $("<a></a>")
                .addClass("nav-link")
                .attr({
                    "href":"#"+sectionId,
                    "style":"width: 100%; margin-bottom: 30px"
                })
                .append($("<button></button>")
                    .addClass("fadeOnLoad")
                    .addClass("hvr-sweep-to-right")
                    .addClass("abelFont")
                    .attr({
                        "type":"button",
                        "style":"width: 100%"
                    })
                    .append(sectionId));

            innerNav.append(sectionLink);
        }

        outerNav.append(innerNav);
        $("#sidebarInsert").append(outerNav);


        // Give content div functionality for spy sidebar
        $("#contentInsert")
            .addClass("container-fluid")
            .attr({
                "id":"mainContent",
                "data-spy":"scroll",
                "data-target":"#spyBar",
                "data-offset":"0",
                "style":"align-content: center"
            });
    }

    // Loads name of page
    function loadNamebar() {
        var namebarDiv = $$$("nameBar");
        if(namebarDiv != null) {
            var name = namebarDiv.innerText;
            var display = $("<h3></h3>")
                .addClass("display-3")
                .attr({
                    "style":"font-size: 9vh; padding-top: 30px"
                });

            display.append(name);

            var div = $("<div></div>")
                .addClass("jumbotron-fluid")
                .addClass("bg-light")
                .attr({
                    "style":"padding: 10px; margin-top: 62px"
                })
                .append($("<div></div>")
                    .addClass("container-fluid")
                    .addClass("centered")
                    .attr({
                        "style":"padding: none"
                    })
                    .append(display)
                );

            namebarDiv.innerText = "";
            $("#nameBar").append(div);
        }
    }

    // Loads footbar. Don't touch. Let me know if you want to change the footbar
    function loadFootbar() {
        // Creates respective links, source images, alt texts, and heights for each image.
        var links = ["https://www.facebook.com/UWiGEMTeam/", "https://www.instagram.com/washington_igem/", "http://2017.igem.org/Team:Washington", "https://github.com/uwigem/uwigem2017", "mailto:uwigem@uw.edu"];
        var iconSrc = ["http://2017.igem.org/wiki/images/1/1e/T--Washington--FacebookIcon.png", "http://2017.igem.org/wiki/images/5/50/T--Washington--instagramIcon.png", "http://2017.igem.org/wiki/images/4/4c/T--Washington--Logo.png",
            "http://2017.igem.org/wiki/images/e/ec/T--Washington--GithubIcon.png", "http://2017.igem.org/wiki/images/7/7e/T--Washington--EmailIcon.png"];
        var altTexts = ["Washington iGEM Facebook", "Washington iGEM Instagram", "Washington iGEM", "Washington iGEM Github", "Email Washington iGEM"];
        var heights = [50, 50, 65, 50, 50];

        // Creates column div for all the links to go into
        var column = $("<div></div>")
            .addClass("col")
            .attr({
                "style":"text-align: center"
            });

        // For each link in the list of icons, create the link and add it to the column.
        for(var i = 0; i < links.length; i++){
            var insertIcon = $("<a></a>")
                .attr({
                    "href":links[i]
                })
                .append(
                    $("<img></img>")
                        .attr({
                            "src":iconSrc[i],
                            "alt":altTexts[i],
                            "style":"height: " + heights[i] + "px; width: auto; padding: 1px"
                        })
                );
            column.append(insertIcon);
        }

        // Put it in divs and ladder it up
        var row = $("<div></div>")
            .addClass("row")
            .attr({
                "style":"text-align: center"
            });

        var containerFluid = $("<div></div>")
            .addClass("container-fluid");

        var jumbotron = $("<div></div>")
            .addClass("jumbotron-fluid")
            .addClass("bg-dark")
            .addClass("jumbotron-light")
            .addClass("bottomBar")
            .attr({
                "style":"min-width: 335px"
            });

        row.append(column);
        containerFluid.append(row);
        jumbotron.append(containerFluid);
        $("#foot").append(jumbotron);
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
                    .attr({
                        "href": addData.link,
                        "style":"color: black"
                    })
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
                "style":"margin-top:22px"
            });

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

    // Loads page data, takes in allcode (JSON.parse()ed data), and the subPageIdentifier string
    // Runs a certain function depending on what page it is
    function loadPageData(allcode, subPageIdentifier) {
        var loadCertainPages = {
            "Main" : function() { loadMainPage(allcode); },
            "Members" : function() { loadMembersPage(allcode); }
        };
        loadCertainPages[subPageIdentifier]();
    }

    // Loads the members page
    // Takes in allcode (JSON.parse()ed data)
    function loadMembersPage(allcode) {
        // First, give all the category selectors functionality
        giveCategorySelectorsFunctionality();

        // Take in membersList div to put data into later
        var memberListDiv = $("#memberList");
        var adviserListDiv = $("#adviserList");

        // For every team member listed in allcode...
        for (var i = 0; i < allcode.members.length; i++) {
            // Grab their data
            var person = allcode.members[i];
            var name = person.name;
            var description = person.description;
            var role = person.role;
            var linkedin = person.linkedin;
            var position = person.position;
            var size = person.size;
            var picture = person.picture;
            var subtitle = person.subtitle;

            // Set up their data into a hover box
            var nameAndParagraph = "<h3>"+name+"</h3>";
            if(subtitle != undefined) {
                nameAndParagraph = nameAndParagraph + "<h4>"+subtitle+"</h4>";
            } else {
                nameAndParagraph = nameAndParagraph + "<h4>Member</h4>";
            }
            nameAndParagraph = nameAndParagraph + "<br /><p>"+description+"</p>";
            var linkedInIcon = "";
            if(linkedin != undefined) {
                linkedInIcon = "<a href='"+linkedin+"'><img src='http://2017.igem.org/wiki/images/7/79/T--Washington--LinkedinIcon.png' alt='LinkedIn' style='height: 50px; width: auto; padding: 1px'/></a>";
            }

            // Add linkedin icon if there is one
            nameAndParagraph = nameAndParagraph + linkedInIcon;

            // Set up all the hover data
            var pictureAndData = $("<div></div>")
                .addClass("rounded-circle")
                .addClass("picture")
                .attr({
                    "data-trigger":"hover click",
                    "data-container":"body",
                    "data-toggle":"popover",
                    "data-placement":"left", // PLACEMENT of hover box. Specifically chosen left rather than top or bottom
                    "data-html":"true",
                    "data-content":nameAndParagraph,
                    "style":"background:url('"+picture+"'); background-position: "+position+"; background-size: "+size
                });

            // Set up border of each person
            var border = $("<div></div>")
                .addClass(role)
                .addClass("memberFinder")
                .addClass("rounded-circle")
                .attr({
                    "style":"margin: auto"
                });
            border.append(pictureAndData);

            // Put each person into a section
            var col = $("<div></div>")
                .addClass("col")
                .attr({
                    "style":"margin: 3px"
                });

            // Put it all into memberList div
            col.append(border);
            if(role == "adviser") {
                adviserListDiv.append(col);
            } else {
                memberListDiv.append(col);
            }
        }
    }

    // Give category selectors functionality
    function giveCategorySelectorsFunctionality() {
        // Store containers to append to
        var appendContainer = $("#buttons");
        var container = $("<div></div>");

        // Set up all buttons
        var allRoles = ["adviser", "wetlab", "wetlab-drylab", "wetlab-lead", "drylab", "drylab-lead", "business",
                        "business-drylab", "business-wetlab", "business-lead", "business-lead-wetlab",
                        "business-lead-drylab", "wetlab-lead-drylab-lead"];
        var dotAll = makeNewButton("dot-all", "categoryActive", "All", allRoles);
        container.append(dotAll);
        container.append("&nbsp;");

        // Set up wetlab button
        var wetlabRoles = ["wetlab", "wetlab-drylab", "wetlab-lead", "wetlab-lead-drylab-lead", 
                        "business-wetlab", "business-lead-wetlab"];
        var dotWetlab = makeNewButton("dot-wetlab", "grayed", "Wetlab", wetlabRoles);
        container.append(dotWetlab);
        container.append("&nbsp;");

        // Set up drylab button
        var drylabRoles = ["drylab", "wetlab-drylab", "drylab-lead", "business-drylab", "business-lead-wetlab", 
                        "business-lead-drylab", "wetlab-lead-drylab-lead"];
        var dotDrylab = makeNewButton("dot-drylab", "grayed", "Drylab", drylabRoles);
        container.append(dotDrylab);
        container.append("&nbsp;");

        // Set up business button
        var businessRoles = ["business", "business-drylab", "business-lead-wetlab", "business-wetlab", "business-lead", "business-lead-drylab"];
        var dotBusiness = makeNewButton("dot-business", "grayed", "Outreach", businessRoles);
        container.append(dotBusiness);
        container.append("&nbsp;");

        // // Set up advisers button
        // var advisersRoles = ["adviser"];
        // var dotAdvisers = makeNewButton("dot-advisers", "grayed", "Advisers", advisersRoles);
        // container.append(dotAdvisers);
        // container.append("&nbsp;");

        // Set up leadership button
        var leadershipRoles = ["wetlab-lead", "drylab-lead", "business-lead", "business-lead-wetlab",
                            "business-lead-drylab","wetlab-lead-drylab-lead"];
        var dotLeads = makeNewButton("dot-leadership", "grayed", "Leads", leadershipRoles);
        container.append(dotLeads);
        container.append("&nbsp;");

        appendContainer.append(container);
    }

    // Makes an individual button and returns it
    // dotClass is the class name of the button ("dot-all", "dot-wetlab", etc)
    // grayOrCategoryActive is either "grayed" or "categoryactive"
    // insideText is the text inside the button
    // roles is an array of all the ones that should be shown
    function makeNewButton(dotClass, grayOrCategoryActive, insideText, roles) {
        return $("<div></div>")
            .addClass("categoryselectors")
            .addClass("rounded-circle")
            .addClass(dotClass)
            .addClass(grayOrCategoryActive)
            .append(insideText)
            .hover(function() {
                if(!$(this).hasClass("categoryActive")) {
                    $(this).removeClass("grayed");
                }
            }, function() {
                if(!$(this).hasClass("categoryActive")) {
                    $(this).addClass("grayed");
                }
            })
            .click(function() {
                if(!$(this).hasClass("categoryActive")) {
                    showOnly(roles);
                    $(this).addClass("categoryActive");
                    $(this).removeClass("grayed");
                }
            });
    }

    // Param roles = array of strings corresponding to the classes that get grayed
    function showOnly(roles) {
        clearAllButtons();
        var portraits = $$("memberFinder");
        for(var i = 0; i < portraits.length; i++) {
            var show = false;
            for(var j = 0; j < roles.length; j++) {
                // IMPORTANT: BOOLEAN ZEN CANNOT BE USED HERE
                // If you set show = portraits[i]. .... then you may set it to false if one is met
                if(portraits[i].classList.contains(roles[j])) {
                    show = true;
                }
            }
            if(show) {
                portraits[i].classList.remove("grayed");
            } else {
                portraits[i].classList.add("grayed");
            }
        }
    }

    // Clears all the buttons and makes them all grayed.
    function clearAllButtons() {
        var buttons = $$("categoryselectors");
        for(var i = 0; i < buttons.length; i++) {
            if(buttons[i].classList.contains("categoryActive")) {
                buttons[i].classList.remove("categoryActive");
            }
            if(!buttons[i].classList.contains("grayed")) {
                buttons[i].classList.add("grayed");
            }
        }
    }

    // Loads main page
    function loadMainPage(allcode) {
        $$$("backgroundImage").style.background = "url('" + allcode.pageData.main.backgroundImage + "') center no-repeat ";
        $$$("backgroundImage").style.backgroundSize = "cover";
    }

})();