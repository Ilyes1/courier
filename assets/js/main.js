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
            
                $("#mobile-menu-close, .mobile-menu-icon, .quote-navlink").on("click", function () {
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

    $('.auto-field').click(function() {
        $(this).find('ul').slideDown(100)
    })

    $('.autocomplete').on('click', 'li', function() {
        var address = $(this).html()
        $(this).parents('.form-field').find('input').val(address)
        $(this).parents('.form-field').find('.dropdown-btn').html(address)
    })

    $('.auto-field input').on('input', function() {
        var searchText = $(this).val().toLowerCase();
        
        $(this).parents('.auto-field').find('li').each(function() {
          var itemText = $(this).text().toLowerCase();
          
          if (itemText.indexOf(searchText) === -1) {
            $(this).hide();
          } else {
            $(this).show();
          }
        });
      });

    $(document).on('click', function(event) {
        var target = $(event.target);
        var element = $('.auto-field input, .auto-field .dropdown-btn'); // Replace with your element's ID
        
        if (!target.closest(element).length && !target.is(element)) {
            // This code will execute when clicking outside the element
            $('.autocomplete').slideUp(100) // Replace with the function you want to execute
        }
    });



    const today = new Date().toISOString().split('T')[0];
    $('#date').attr('min', today)


    function initialize() {
        var address = document.getElementById('address')
        var collection = document.getElementById('address-1')
        var delivery = document.getElementById('address-2')
        var collection_postcode = document.getElementById('c-postcode')
        var delivery_postcode = document.getElementById('d-postcode')
        var companyAddress = document.getElementById('companyAddress')
        new google.maps.places.Autocomplete(address, {
            // types: ['geocode'], // Only retrieve geographic coordinates
            componentRestrictions: { country: 'gb' } // Restrict results to the United Kingdom (GB)
          });
        new google.maps.places.Autocomplete(collection, {
            componentRestrictions: { country: 'gb' },
          });
        new google.maps.places.Autocomplete(delivery, {
            // types: ['geocode'], // Only retrieve geographic coordinates
            componentRestrictions: { country: 'gb' } // Restrict results to the United Kingdom (GB)
          });
        new google.maps.places.Autocomplete(companyAddress, {
            // types: ['geocode'], // Only retrieve geographic coordinates
            componentRestrictions: { country: 'gb' } // Restrict results to the United Kingdom (GB)
          });
        new google.maps.places.Autocomplete(collection_postcode, {
            // types: ['geocode'], // Only retrieve geographic coordinates
            componentRestrictions: { country: 'gb' } // Restrict results to the United Kingdom (GB)
          });
        new google.maps.places.Autocomplete(delivery_postcode, {
            // types: ['geocode'], // Only retrieve geographic coordinates
            componentRestrictions: { country: 'gb' } // Restrict results to the United Kingdom (GB)
          });


        //   auto1.addListener('place_changed', function () {
        //     var selectedPlace = auto1.getPlace();
          
        //     // Extract and display the door number from the address components
        //     var doorNumber = getDoorNumberFromAddressComponents(selectedPlace.address_components);
        //     displayDoorNumber(doorNumber);
        //   });
    }

      
    google.maps.event.addDomListener(window, 'load', initialize);

    var driving_license = 'EU'

    

    // $('.application-form').submit(function(e) {
    //     e.preventDefault()

    //     // alert($('#ukLicense').is(':checked'))

    //     const data = {
    //         name: $('#name').val(),
    //         surname: $('#surname').val(),
    //         address: $('#address').val(),
    //         postcode: $('#postcode').val(),
    //         license: $('#ukLicense').is(':checked') ? 'UK' : 'EU',
    //         vehicle: $('#vehicle span').text(),
    //         phone: $('#phone').val(),
    //         email: $('#email').val()
    //     };

    //     emailjs.send('service_mcguz7k', 'template_ci7zx4l', data)
	// 	.then(function(response) {
    //         window.location.pathname = '/application-success.html'
	// 	}, function(error) {
	// 		console.log('FAILED...', error);
	// 	});
          
    //     // Add one line to the sheet
    //     // fetch("https://sheet.best/api/sheets/359d117b-bf00-4e7b-bfad-346d05010bdb", {
    //     //     method: "POST",
    //     //     mode: "cors",
    //     //     headers: {
    //     //         "Content-Type": "application/json",
    //     //     },
    //     //     body: JSON.stringify(data),
    //     // })
    //     // .then((r) => r.json())
    //     // .then((data) => {
    //     //     // The response comes here
    //     //     console.log(data);
    //     //     window.location.pathname = '/application-success.html'
    //     // })
    //     // .catch((error) => {
    //     //     // Errors are reported there
    //     //     console.log(error);
    //     // });

    // })


    $('#type').change(function() {
        if ($('#type').val() == 'Standard') {

            $('.auto-label h6 span').text('Standard delivery')
            $('.auto-label p').text('Economical option with collection and delivery within 2-5 hours.')

            $('.time-field').hide()

        } else if ($('#type').val() == 'Timed') {

            $('.auto-label h6 span').text('Timed delivery')
            $('.auto-label p').text('Timed Delivery allows you to choose a specific delivery time slot for a slightly higher fee. Your item will be delivered within the chosen time frame.')

            $('.time-field').show()

        } else if ($('#type').val() == 'Priority') {

            $('.auto-label h6 span').text('Priority delivery')
            $('.auto-label p').text('Fastest service, item collected within 60 minutes, delivered ASAP. While it comes at a higher rate compared to the other two options, it\'s beneficial if you need to send something urgently.')

            $('.time-field').hide()

        }
        $('.auto-label').addClass('active')
    })

    $('.auto-label-close').click(function() {
        $('.auto-label').removeClass('active')
    })
    
    $('.form-field').not(('.type-field')).click(function() {
        $('.auto-label').removeClass('active')
    })

    // function isTimeMoreThan30MinutesAhead(time1, time2) {
    //     // Parse the input times into Date objects
    //     const date1 = new Date(`2023-08-29T${time1}:00`);
    //     const date2 = new Date(`2023-08-29T${time2}:00`);
      
    //     // Add 30 minutes (30 * 60 seconds) to date1
    //     date1.setSeconds(date1.getSeconds() + 30 * 60);
      
    //     // Compare the two times
    //     if (date1 < date2) {
    //         ///
    //     } else {
    //         $('.terms-error').text('Please select a delivery time that is at least 30 minutes later than the collection time.').addClass('active')
	// 		setTimeout(() => {
	// 			$('.terms-error').removeClass('active')
	// 		}, 3000);
    //     }
    //   }

    // $('#d-time').change(function() {
    //     // console.log($(this).val() > $('#c-time').val() + 1000 * 60 * 30)
    //     var cTime = $('#c-time').val()
    //     var dTime = $('#d-time').val()
    //     isTimeMoreThan30MinutesAhead(cTime, dTime)
    // })
      
     

})(jQuery);
