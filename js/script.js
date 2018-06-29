(function($) {

	"use strict";


    /*------------------------------------------
        = FUNCTIONS
    -------------------------------------------*/
    // Check ie and version
    function isIE () {
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1], 10) : false;
    }


    // Toggle mobile navigation
    function toggleMobileNavigation() {
        var navbar = $(".navigation-holder");
        var openBtn = $(".navbar-header .open-btn");
        var closeBtn = $(".navigation-holder .close-navbar");
        var navLinks = $("#navbar > ul > li > a[href^='#']");

        openBtn.on("click", function() {
            if (!navbar.hasClass("slideInn")) {
                navbar.addClass("slideInn");
            }
            return false;
        })

        closeBtn.on("click", function() {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            return false;            
        })

        navLinks.on("click", function() {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            return false;            
        })
    }

    toggleMobileNavigation();


    //ACTIVE CURRENT MENU WHILE SCROLLING
    // function for active menuitem
    function activeMenuItem($links) {
        var top = $(window).scrollTop(),
            windowHeight = $(window).height(),
            documentHeight = $(document).height(),
            cur_pos = top + 2,
            sections = $("section"),
            nav = $links,
            nav_height = nav.outerHeight(),
            home = nav.find(" > ul > li:first"),
            contact = nav.find(" > ul > li:last");


        sections.each(function() {
            var top = $(this).offset().top - nav_height - 40,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find("> ul > li > a").parent().removeClass("current");
                nav.find("a[href='#" + $(this).attr('id') + "']").parent().addClass("current");
            } else if (cur_pos === 2) {
                nav.find("> ul > li > a").parent().removeClass("current");
                home.addClass("current");
            } else if($(window).scrollTop() + windowHeight > documentHeight - 400) {
                nav.find("> ul > li > a").parent().removeClass("current");
                contact.addClass("current");
           }
        });
    }


    // smooth-scrolling
    function smoothScrolling($links, $topGap) {
        var links = $links;
        var topGap = $topGap;

        links.on("click", function() {
            if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $("[name=" + this.hash.slice(1) +"]");
                if (target.length) {
                    $("html, body").animate({
                    scrollTop: target.offset().top - topGap
                }, 1000, "easeInOutExpo");
                    return false;
                }
            }
            return false;
        });
    }


    // Parallax background
    function bgParallax() {
        if ($(".parallax").length) {
            $(".parallax").each(function() {
                var height = $(this).position().top;
                var resize     = height - $(window).scrollTop();
                var parallaxSpeed = $(this).data("speed");
                var doParallax = -(resize / parallaxSpeed);
                var positionValue   = doParallax + "px";
                var img = $(this).data("bg-image");

                $(this).css({
                    backgroundImage: "url(" + img + ")",
                    backgroundPosition: "50%" + positionValue,
                    backgroundSize: "cover"
                });

                if ( window.innerWidth < 768) {
                    $(this).css({
                        backgroundPosition: "center center"
                    });
                }
            });
        }
    }


    // Hero slider background setting
    function sliderBgSetting() {
        if ($(".hero-slider .slide").length) {
            $(".hero-slider .slide").each(function() {
                var $this = $(this);
                var img = $this.find(".slider-bg").attr("src");

                $this.css({
                    backgroundImage: "url("+ img +")",
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                })
            });
        }
    }


    //Setting hero slider
    function heroSlider() {
        if ($(".hero-slider").length) {
            $(".hero-slider").slick({
                autoplay: true,
                autoplaySpeed: 5000,
                pauseOnHover: false,
                arrows: true,
                prevArrow: '<button type="button" class="slick-prev">Previous</button>',
                nextArrow: '<button type="button" class="slick-next">Next</button>',
                dots: true,
                fade: true,
                cssEase: 'linear'
            });
        }
    }

    // On screen animation function
    function onViewAnimation($section, $targetElem, $animationClass) {
        var section = $section,
            targetElem = $targetElem,
            animationClass = $animationClass;

        if (section.length) {
            section.appear();
            $(document.body).on('appear', 'section', function() {
                var current_item = $(this).find(targetElem);
                if (!current_item.hasClass($animationClass)) {
                    current_item.addClass($animationClass);
                }
            });
        } 
    }


    /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    function preloader() {
        if($('.preloader').length) {
            $('.preloader').delay(100).fadeOut(500, function() {

                //active wow
                wow.init();

                //Active heor slider
                heroSlider();

                 // product landing hero watch animation
                if ($(".hosting-landing-pg").length) {
                    $(".hero-pic").addClass("hero-pic-animation");
                }

            });
        }
    }


    /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
    var wow = new WOW({
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       true,       // default
        live:         true        // default
    });


    /*------------------------------------------
        = ACTIVE POPUP IMAGE
    -------------------------------------------*/  
    if ($(".fancybox").length) {
        $(".fancybox").fancybox({
            openEffect  : "elastic",
            closeEffect : "elastic",
            wrapCSS     : "project-fancybox-title-style"
        });
    }


    /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/  
    if ($(".video-play").length) {
        $(".video-play").on("click", function(){
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title'         : this.title,
                helpers     : {  
                    title : { type : 'inside' },
                    media : {}
                },

                beforeShow : function(){
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });    
    }


    /*------------------------------------------
        = ACTIVE GALLERY POPUP IMAGE
    -------------------------------------------*/  
    if ($(".popup-gallery").length) {
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',

            gallery: {
              enabled: true
            },

            zoom: {
                enabled: true,

                duration: 300,
                easing: 'ease-in-out',
                opener: function(openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });    
    }


    /*------------------------------------------
        = FUNCTION FOR SORTING GALLERY
    -------------------------------------------*/
    function sortingGallery() {
        if ($(".sortable-gallery .gallery-filters").length) {
            var $container = $('.gallery-container');
            $container.isotope({
                filter:'*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });

            $(".gallery-filters li a").on("click", function() {
                $('.gallery-filters li .current').removeClass('current');
                $(this).addClass('current');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter:selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });
        }
    }

    sortingGallery(); 


    /*------------------------------------------
        =  MASONRY GRID
    -------------------------------------------*/
    function masonryGridSetting() {
        if ($('.masonry-grid').length) {
            var $grid =  $('.masonry-grid').masonry({
                itemSelector: '.box',
                columnWidth: '.box',
                percentPosition: true
            });

            $grid.imagesLoaded().progress( function() {
                $grid.masonry('layout');
            });
        }
    }

    masonryGridSetting();  


    /*------------------------------------------
        = PROGRESS BAR
    -------------------------------------------*/
    function progressBar() {

        if ($(".progress-bar").length) {
            var progressBar = $(".progress-bar");
            progressBar.each(function() {
                var $this = $(this);
                var percent = $this.data('percent');
                $this.append('<span>' + percent + '%' + '</span>').css('width', percent + '%');
            })
        }
    }

    progressBar();


    /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/

    // Function for clone an element for sticky menu
    function cloneNavForSticyMenu($ele, $newElmClass) {
        $ele.addClass('original').clone().insertAfter($ele).addClass($newElmClass).removeClass('original');
    }

    // clone home style 1 navigation for sticky menu
    if ($('.header-style-1 .navigation').length) {
        cloneNavForSticyMenu($('.header-style-1 .navigation'), "sticky");
    }

    // clone home style 1 navigation for sticky menu
    if ($('.header-style-4 .navigation').length) {
        cloneNavForSticyMenu($('.header-style-4 .navigation'), "sticky");
    }

    function stickIt($stickyClass, $toggleClass) {

        if ($(window).scrollTop() >= 300) {
            var orgElement = $(".original");
            var coordsOrgElement = orgElement.offset();
            var leftOrgElement = coordsOrgElement.left;  
            var widthOrgElement = orgElement.css("width");

            $stickyClass.addClass($toggleClass);

            $stickyClass.css({
                "width": widthOrgElement
            }).show();

            $(".original").css({
                "visibility": "hidden"
            });

        } else {

            $(".original").css({
                "visibility": "visible"
            });

            $stickyClass.removeClass($toggleClass);
        }
    }

    // FUNCTION FOR AGENCY STICKY MENU
    function stickyMenu() {
        if ($(".agency-header").length || $(".app-landing-header").length) {

            var agencyHeader = $(".agency-header"),
                appHeader = $(".app-landing-header"),
                navigation = $(".agency-header .navigation"),
                appNavigation = $(".app-landing-header .navigation"),
                scroll = $(window).scrollTop(),
                top = 400;

            if (scroll > top) {
                navigation.addClass("agency-sticky-menu-on");
                navigation.addClass("agency-sticky-menu");
                appNavigation.addClass("agency-sticky-menu-on");
                appNavigation.addClass("agency-sticky-menu");
            } else if (scroll > 300) {
                navigation.addClass("agency-sticky-menu");
                appNavigation.addClass("agency-sticky-menu");
            } else {
                navigation.removeClass("agency-sticky-menu-on");
                navigation.removeClass("agency-sticky-menu");
                appNavigation.removeClass("agency-sticky-menu-on");
                appNavigation.removeClass("agency-sticky-menu");
            }
        }
    }


    /*---------------------------------------------------
        = TOGGLE SEARCH BOX, SIDE PANEL BAR, MINI CART
    -------------------------------------------------*/
    // toggle header search
    function toggleSearchBoxForHeader() {
        if ($(".header-search-area").length) {
            var serachFormBox = $(".header-search-area .header-search-form");
            var openSeachBtn = $(".header-search-area .open-btn");
            
            $(document.body).append(serachFormBox);
            serachFormBox.hide();

            openSeachBtn.on("click", function(e) {
                e.preventDefault();
                serachFormBox.slideDown();
            });

            serachFormBox.on("click", function() {
                serachFormBox.slideUp();
                return false;
            }).find(".form").on("click", function(e) {
                 e.stopPropagation();
            })
        }
    }

    // toggle side panel function
    function toggleSidePanel() {
        if ($(".side-info-panel").length) {
            var sideMenu = $(".side-info-panel .side-info-inner");
            var sideMenuOpenBtn = $(".side-info-panel .side-info-open-btn");
            var sideMenuCloseBtn = $(".side-info-panel .side-info-close-btn");

            $(document.body).append(sideMenu);

            sideMenuOpenBtn.on("click", function(e) {
                sideMenu.toggleClass("toggle-side-info");
                return false;
            })

            sideMenuCloseBtn.on("click", function(e) {
                sideMenu.toggleClass("toggle-side-info");
                return false;
            })
        }
    }

    // Mini cart toggle
    if ($(".search-mini-cart").length) {
        var cartOpenBtn = $(".mini-cart-btn a"),
            cartBox = $(".mini-cart"),
            body =  $(document.body);

        cartBox.hide();

        cartOpenBtn.on("click", function() {
            cartBox.fadeIn();
            return false;
        });

        body.on("click", function(e) {
            cartBox.fadeOut();
        }).find(cartBox).on("click", function(e) {
             e.stopPropagation();
        });
    }


    /*------------------------------------------
        = FAN FACT COUNT
    -------------------------------------------*/
    if ($(".start-count").length) {
        $('.counter').appear();
        $(document.body).on('appear', '.counter', function(e) {
            var $this = $(this),
            countTo = $this.attr('data-count');

            $({ countNum: $this.text()}).animate({
                countNum: countTo
            }, {
                duration: 3000,
                easing:'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    } 


    /*------------------------------------------
        = HOSTING TESTIMONIALS SLIDER
    -------------------------------------------*/
    if($(".hosting-testimonials-slider").length) {
        $(".hosting-testimonials-slider").owlCarousel({
            //autoplay:true,
            items: 1,
            mouseDrag: false,
            smartSpeed:300,
            loop:true,
            nav: true,
            navText: ['<i class="fa fa-long-arrow-left"></i> Prev', 'Next <i class="fa fa-long-arrow-right"></i>']
        });
    }


    /*------------------------------------------
        = HOSTING PARTNERS SLIDER
    -------------------------------------------*/
    if($(".hosting-partners-slider").length) {
        $(".hosting-partners-slider").owlCarousel({
            autoplay:true,
            items: 4,
            smartSpeed:300,
            loop:true,
            dots: false,
            responsive: {
                0 : {
                    items: 1
                },

                400 : {
                    items: 2
                },

                600 : {
                    items: 3
                },

                992 : {
                    items: 4
                }
            }
        });
    }


    /*------------------------------------------
        = AGENCY WHO WE ARE SLIDER
    -------------------------------------------*/
    if($(".agency-who-we-are-slider").length) {
        $(".agency-who-we-are-slider").owlCarousel({
            autoplay:true,
            items: 1,
            mouseDrag: false,
            smartSpeed: 1000,
            loop:true,
            dots: false,
            nav: true,
            navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>']
        });
    }  


    /*------------------------------------------
        = AGECY TEAM SLIDER
    -------------------------------------------*/
    if($(".agency-team-slider").length) {
        $(".agency-team-slider").owlCarousel({
            //autoplay:true,
            items: 3,
            smartSpeed: 900,
            loop:true,
            dots: false,
            margin: 30,
            stagePadding: 20,
            nav: true,
            navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'],
            responsive: {
                0 : {
                    items: 1
                },

                600 : {
                    items: 2
                },

                1200 : {
                    items: 3
                }
            }
        });
    }


    /*------------------------------------------
        = AGECY TESTIMONIALS SLIDER
    -------------------------------------------*/
    if($(".agency-testimonials-slider").length) {
        $(".agency-testimonials-slider").owlCarousel({
            autoplay:true,
            items: 1,
            mouseDrag: false,
            smartSpeed: 900,
            loop:true,
        });
    }


    /*------------------------------------------
        = GOOGLE EMBEDDED MAP
    -------------------------------------------*/
    //Disable mouse scroll wheel zoom on embedded Google Maps
    if ($('.google-embedded-map').length) {
        $('.google-embedded-map').on("click", function(e) {
            $(this).find('iframe').css('pointer-events', 'all');
        }).mouseleave(function(e) {
            $(this).find('iframe').css('pointer-events', 'none');
        });
    }


    /*------------------------------------------
        = CV HOME ACTIVE CURRENT SECTION
    -------------------------------------------*/
    if($(".cv-landing-pg").length) {
        var navbar = $(".navigation-holder");
        var navLinks = $("#navbar .navigation-holder-inner > ul > li > a[href^='#']");
        var section = $(".page-wrapper > section");

        navLinks.on("click", function() {
            var $this = $(this);
            var herf = $this.attr("href").substring(1);

            $this.parent("li").addClass("current").siblings().removeClass("current");

            section.each(function() {
                var currentSection = $(this);
                if (herf === currentSection.attr("id")) {
                    if (!currentSection.hasClass("current-section")) {
                        currentSection.addClass("current-section sectionSlideIn");
                    }

                    $(this).siblings().removeClass("current-section sectionSlideIn");
                }
            });

            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }

            return false;
        });
    }


    /*------------------------------------------
        = PRODUCT LANDING TESTIMONIALS SLIDER
    -------------------------------------------*/
    if($(".product-landing-testimonials-slider").length) {
        $(".product-landing-testimonials-slider").owlCarousel({
            //autoplay:true,
            items: 1,
            mouseDrag: false,
            smartSpeed: 1000,
            loop:true,
            dots: false,
            nav: true,
            navText: ['<i class="fa fa-long-arrow-left"></i> PREV', 'NEXT <i class="fa fa-long-arrow-right"></i>']
        });
    }


    /*------------------------------------------
        = PRODUCT LANDING FAQ SLIDER
    -------------------------------------------*/
    if($(".product-landing-faq-slider").length) {
        $(".product-landing-faq-slider").owlCarousel({
            //autoplay:true,
            items: 1,
            mouseDrag: false,
            smartSpeed: 1000,
            loop:true,
            dots: false,
            nav: true,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
        });
    }


    /*------------------------------------------
        = app screenshot slider
    -------------------------------------------*/
    if ($(".app-screenshot-slider").length) {
        $(".app-screenshot-slider").owlCarousel({
            loop:true,
            margin:50,
            items: 1,
            smartSpeed: 700,
            autoplay: false,
            dots: false,
            nav:true,
            navText: [ '<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>' ],
        });
    }


    /*------------------------------------------
        = GOOGLE MAP
    -------------------------------------------*/  
    function map() {

        var locations = [
            ['Hotel royal international khulna ', 22.8103888, 89.5619609,1]
        ];

        var map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng( 22.8103888, 89.5619609),
            zoom: 12,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP

        });

        var infowindow = new google.maps.InfoWindow();

        var marker, i;

        for (i = 0; i < locations.length; i++) {  
                marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map,
                icon:'images/map-marker.png'
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    }; 


    /*------------------------------------------
        = CONTACT FORM SUBMISSION
    -------------------------------------------*/  
    if ($("#agency-contact-form").length) {
        $("#agency-contact-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },

                email: "required",

                phone: {
                    required: true,
                    number: true
                },

                contact_subject: "required",

                contact_note: "required",
            },

            messages: {
                name: "Please, enter your name",
                email: "Please, enter your email",
                phone: "Please, enter your phone number",
                contact_subject: "Please, enter your contact subject",
                contact_note: "Please, write your message"
            },

            
        });
    }

    // CV page contact form validation
    if ($("#resume-contact-form").length) {
        $("#resume-contact-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },

                email: "required",

                note: "required",
            },

            messages: {
                name: "Please, enter your name",
                email: "Please, enter your email",
                note: "Please, write your message"
            },

            submitHandler: function (form) {
                $("#loader").css("display", "inline-block");
                $.ajax({
                    type: "POST",
                    url: "cv-mail.php",
                    data: $(form).serialize(),
                    success: function () {
                        $( "#loader").hide();
                        $( "#success").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#success").slideUp( "slow" );
                        }, 3000);
                        form.reset();
                    },
                    error: function() {
                        $( "#loader").hide();
                        $( "#error").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#error").slideUp( "slow" );
                        }, 3000);
                    }
                });
                
                return false; // required to block normal submit since you used ajax
            }
        });
    }

    // Product landing page contact form validation
    if ($("#product-landing-contact-form").length) {
        $("#product-landing-contact-form").validate({
            rules: {
                first_name: {
                    required: true,
                    minlength: 2
                },

                last_name: {
                    required: true,
                    minlength: 2
                },

                email: "required",
            },

            messages: {
                first_name: "Please, enter your first name",
                last_name: "Please, enter your last name",
                email: "Please, enter your email",
            },

            submitHandler: function (form) {
                $("#loader").css("display", "inline-block");
                $.ajax({
                    type: "POST",
                    url: "product-landing-mail.php",
                    data: $(form).serialize(),
                    success: function () {
                        $( "#loader").hide();
                        $( "#success").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#success").slideUp( "slow" );
                        }, 3000);
                        form.reset();
                    },
                    error: function() {
                        $( "#loader").hide();
                        $( "#error").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#error").slideUp( "slow" );
                        }, 3000);
                    }
                });
                
                return false; // required to block normal submit since you used ajax
            }
        });
    }    

    // App landing page contact form validation
    if ($("#app-landing-contact-form").length) {
        $("#app-landing-contact-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },

                email: "required",

                note: "required",
            },

            messages: {
                name: "Please, enter your name",
                email: "Please, enter your email",
                note: "Please, write your message"
            },

            submitHandler: function (form) {
                $("#loader").css("display", "inline-block");
                $.ajax({
                    type: "POST",
                    url: "cv-mail.php",
                    data: $(form).serialize(),
                    success: function () {
                        $( "#loader").hide();
                        $( "#success").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#success").slideUp( "slow" );
                        }, 3000);
                        form.reset();
                    },
                    error: function() {
                        $( "#loader").hide();
                        $( "#error").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#error").slideUp( "slow" );
                        }, 3000);
                    }
                });
                
                return false; // required to block normal submit since you used ajax
            }
        });
    }


    /*==========================================================================
        WHEN DOCUMENT LOADING 
    ==========================================================================*/
        $(window).on('load', function() {

            preloader();

            sliderBgSetting();
			
            toggleMobileNavigation();

            toggleSearchBoxForHeader();

            if ($(".page-wrapper").length) {
                smoothScrolling($("#navbar > ul > li > a[href^='#']"), 80);
            }

            masonryGridSetting();

            toggleSidePanel();

            // Map for app landing page
            if ($(".app-landing-contact-map").length) {
                map();
            }

        });



    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).on("scroll", function() {

        bgParallax();

        activeMenuItem($(".navigation-holder"));

		if ($(".header-style-1").length) {
            stickIt($(".sticky"), "sticky-on"); 
        }

        if ($(".header-style-4").length) {
            stickIt($(".sticky"), "sticky-on"); 
        }

        // Sticky menu for agency home
        stickyMenu();

        // appStickyMenu();

        masonryGridSetting();

    });

    
    /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
    $(window).on("resize", function() {

    });



})(window.jQuery);
