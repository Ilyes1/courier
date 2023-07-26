/*===================================================
    Template Scripts
====================================================*/
(function ($) {
    "use strict";

    // Preloader     
    $(window).on('load', function () {
        $('body').addClass('loaded');
    });

    $(document).ready(function () {

        // Responsive Classes
        function responsiveClasses() {
            var body = $('body');
            if ($(window).width() < 992) {
                body.removeClass('viewport-lg');
                body.addClass('viewport-sm');
            } else {
                body.removeClass('viewport-sm');
                body.addClass('viewport-lg');
            }
        }

        //responsiveClasses();
        $(window).on("resize", function () {
            responsiveClasses();
        }).resize();

        // Main Header
        if ($('body').hasClass('viewport-lg')) {
            var primaryHeader = $('.navigation-wrapper'),
                headerClone = primaryHeader.clone();
            $('header.header-wrapper').after('<div class="sticky-header"></div>');
            $('.sticky-header').html(headerClone);
            var headerSelector = $(".sticky-header");
            var triggerPoint = $('header.header-wrapper').height();
            var yOffset = 0;

            $(window).on('scroll', function () {
                yOffset = $(window).scrollTop();
                if (yOffset >= triggerPoint) {
                    headerSelector.addClass('sticky-fixed-top');
                } else {
                    headerSelector.removeClass('sticky-fixed-top');
                }
            });
        }

        // Mobile Menu
        function mobileMenu() {
            $("header.header-wrapper").after('<div class="mobile-navigation-menu"><button id="mobile-menu-close"><i class="la la-close"></i></button></div>');
            var menuWrapper = $("header .navigation-menu .main-menu").clone();
            $('.mobile-navigation-menu #mobile-menu-close').after(menuWrapper);
            
                $("#mobile-menu-close, .mobile-menu-icon").on("click", function () {
                    $(".mobile-menu-icon").toggleClass("menu-open");
                    $(".mobile-navigation-menu").toggleClass("open-mobile-menu");
                });

            $(".mobile-navigation-menu ul li:has(ul)").each(function () {
                $(this).append('<span class="dropdown-plus"></span>');
                $(this).addClass("dropdown_menu");
            });

            $(".mobile-navigation-menu .dropdown-plus").on("click", function () {
                $(this).prev("ul").slideToggle(300);
                $(this).toggleClass("dropdown-open");
                $(".mobile-navigation-menu ul li:has(ul)").toggleClass("dropdown-open");
            });

            $(".mobile-navigation-menu .dropdown_menu a").append("<span></span>");
        }

        mobileMenu();

        // Popup Search Box
        function popupSearchBox() {
            $("#popup-search-box").removeClass("toggled");
            $("body").removeClass("open-search-box");
            $(".dl-search-icon").on("click", function (e) {
                e.stopPropagation();
                $("body").toggleClass("open-search-box");
                $("#popup-search").focus();
            });

            $("#popup-search-box input").on("click", function (e) {
                e.stopPropagation();
            });

            $(document).on( "click", ".search-close, #searchbox-overlay", function (e) {
                    e.preventDefault();
                    $("body.open-search-box").removeClass("open-search-box");
                }
            );
        }

        popupSearchBox();

        // Popup Sidebox
        function sideBox() {
            $("body").removeClass("open-sidebox");
            $(document).on("click", ".sidebar-trigger", function (e) {
                e.preventDefault();
                $("body").toggleClass("open-sidebox");
            });
            $(document).on("click", ".sidebox-close, #sidebox-overlay", function (e) {
                e.preventDefault();
                $("body.open-sidebox").removeClass("open-sidebox");
            });
        }

        sideBox();

        // Slider animation function
        function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function () {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationDuration = $this.data('duration');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay,
                    'animation-duration': $animationDuration
                });
                $this.addClass($animationType).one(animationEndEvents, function () {
                    $this.removeClass($animationType);
                });
            });
        }

        // Main Slider
        var sliderOptions = {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 1000,
            autoplay: true,
            parallax: false,
            mousewheel: false,
            loop: true,
            effect: 'fade',
            pagination: {
                el: '.main-slider .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.main-slider .slider-button-next',
                prevEl: '.main-slider .slider-button-prev'
            }
        };

        sliderOptions.on = {
            slideChangeTransitionStart: function () {
                var swiper = this;
                var animatingElements = $(swiper.slides[swiper.activeIndex]).find('[data-animation]');
                doAnimations(animatingElements);
            },
            resize: function () {
                this.update();
            }
        };

        var mainSlider = new Swiper('.main-slider', sliderOptions);

        // Funfact Counter
        $('.counter-content').waypoint(
            function () {
                var odo = $(".counter-content .odometer");
                odo.each(function () {
                    var countNumber = $(this).attr("data-count");
                    $(this).html(countNumber);
                });
            }, {
                offset: "80%",
                triggerOnce: true
            }
        );

        // About counter
        $('.about-counter').waypoint(
            function () {
                var odo = $(".about-counter .odometer");
                odo.each(function () {
                    var countNumber = $(this).attr("data-count");
                    $(this).html(countNumber);
                });
            }, {
                offset: "80%",
                triggerOnce: true
            }
        );

        //Project Carousel  
        var swiperProject = new Swiper(".project-carousel", {
            slidesPerView: 3,
            spaceBetween: 30,
            slidesPerGroup: 1,
            loop: true,
            autoplay: true,
            speed: 400,
            pagination: {
                el: ".project-carousel-wraper .carousel-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: '.carousel-button-next',
                prevEl: '.carousel-button-prev'
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                    spaceBetween: 25
                },
                // when window width is >= 767px
                767: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 3
                }
            }
        });

        //Project Carousel 2
        var swiperProject2 = new Swiper(".project-carousel-2", {
            slidesPerView: 1,
            spaceBetween: 30,
            slidesPerGroup: 1,
            loop: true,
            autoplay: true,
            speed: 400,
            pagination: {
                el: ".project-carousel-wraper .carousel-pagination",
                clickable: true,
            },
            navigation: false,
        });

        //Testimonial Carousel  
        var swiperTestimonial = new Swiper(".testimonial-carousel", {
            slidesPerView: 1,
            spaceBetween: 30,
            slidesPerGroup: 1,
            loop: true,
            autoplay: false,
            speed: 400,
            pagination: {
                el: ".testimonial-carousel-wrapper .carousel-pagination",
                clickable: true,
            },
            navigation: false,
        });

        //Testimonial Carousel 2
        var swiperTestimonial2 = new Swiper(".testimonial-carousel-2", {
            slidesPerView: 3,
            spaceBetween: 20,
            slidesPerGroup: 1,
            loop: true,
            autoplay: false,
            speed: 400,
            pagination: false,
            navigation: {
                nextEl: '.carousel-button-next',
                prevEl: '.carousel-button-prev'
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 25
                },
                // when window width is >= 767px
                767: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 30
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 3,
                    slidesPerGroup: 1
                }
            }
        });

        //Sponsor Carousel  
        var swiperSponsor = new Swiper(".sponsor-carousel", {
            slidesPerView: "5",
            spaceBetween: 30,
            slidesPerGroup: 1,
            loop: true,
            autoplay: true,
            speed: 700,
            pagination: {
                el: ".sponsor-carousel .swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    spaceBetween: 10
                },
                // when window width is >= 767px
                767: {
                    slidesPerView: 3,
                    slidesPerGroup: 1,
                    spaceBetween: 0
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 5,
                    slidesPerGroup: 1
                }
            }
        });

        //Feed Carousel  
        var swiperFeed = new Swiper(".feed-carousel", {
            slidesPerView: 6,
            spaceBetween: 30,
            slidesPerGroup: 1,
            loop: true,
            autoplay: true,
            speed: 700,
            pagination: false,
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 3,
                    slidesPerGroup: 1,
                    spaceBetween: 10
                },
                // when window width is >= 767px
                767: {
                    slidesPerView: 4,
                    slidesPerGroup: 1,
                    spaceBetween: 10
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 6,
                    slidesPerGroup: 1
                }
            }
        });

        // Venobox Active
        new VenoBox({
            selector: '.dl-video-popup, .dl-img-popup',
            bgcolor: 'transparent',
            numeration: true,
            infinigall: true,
            spinner: 'plane',
        });

        //Pie Chart
        $('.piechart').waypoint(
            function () {
                $('.piechart').easyPieChart({
                    scaleColor: "transparent",
                    lineWidth: 3,
                    lineCap: 'round',
                    trackColor: "#ddd",
                    size: 150,
                    rotate: 0,
                    animate: 1000,
                    onStep: function (value) {
                        this.$el.find('span').text(Math.round(value));
                    },
                    onStop: function (value, to) {
                        this.$el.find('span').text(Math.round(to));
                    }
                });
            }, {
                offset: "80%",
                triggerOnce: true
            }
        );

        // Current Year
        var currentYear = new Date().getFullYear();
        $('#currentYear').append(currentYear);

        // Scrool To Top
        var scrollTop = $("#scroll-top");
        $(window).on('scroll', function () {
            var topPos = $(this).scrollTop();
            if (topPos > 100) {
                $('#scrollup').removeClass('hide');
                $('#scrollup').addClass('show');

            } else {
                $('#scrollup').removeClass('show');
                $('#scrollup').addClass('hide');
            }
        });

        $(scrollTop).on("click", function () {
            $('html, body').animate({
                scrollTop: 0
            }, 0);
            return false;
        });

        // Wow JS Active
        new WOW().init();

        // MailChimp
        if ($('.subscribe-form').length > 0) {
            /*  MAILCHIMP  */
            $('.subscribe-form').ajaxChimp({
                language: 'en',
                callback: mailchimpCallback,
                url: "https://gmail.us4.list-manage.com/subscribe/post?u=540c52965f5180ae846e5e5a8&amp;id=4dbe9a9245&amp;f_id=0027a5ebf0"
            });
        }

        function mailchimpCallback(resp) {
            if (resp.result === 'success') {
                $('#subscribe-result').addClass('subs-result');
                $('.subscription-success').text(resp.msg).fadeIn();
                $('.subscription-error').fadeOut();
                setTimeout(function () {
                    $('#subscribe-result').removeClass('subs-result');
                    $('.subscription-success').fadeOut();
                }, 5000);
            } else if (resp.result === 'error') {
                $('#subscribe-result').addClass('subs-result');
                $('.subscription-error').text(resp.msg).fadeIn();
            }
        }
        $.ajaxChimp.translations.en = {
            'submit': 'Submitting...',
            0: 'We have sent you a confirmation email',
            1: 'Please enter your email',
            2: 'An email address must contain a single @',
            3: 'The domain portion of the email address is invalid (the portion after the @: )',
            4: 'The username portion of the email address is invalid (the portion before the @: )',
            5: 'This email address looks fake or invalid. Please enter a real email address'
        };

    });

})(jQuery);
