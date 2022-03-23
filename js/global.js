/*-------------------------------------------------------------------------------------------------------------------------------*/
/*This is main JS file that contains custom style rules used in this template*/
/*-------------------------------------------------------------------------------------------------------------------------------*/
/* Template Name: omni*/
/* Version: 1.0 Initial Release*/
/* Build Date: 25-02-2015*/
/* Author: Unbranded*/
/* Website: 
/* Copyright: (C) 2015 */
/*-------------------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------*/
/* TABLE OF CONTENTS: */
/*--------------------------------------------------------*/
/* 01 - VARIABLES */
/* 02 - page calculations */
/* 03 - function on document ready */
/* 04 - function on page load */
/* 05 - function on page resize */
/* 06 - function on page scroll */
/* 07 - swiper sliders */
/* 08 - buttons, clicks, hovers */
/*-------------------------------------------------------------------------------------------------------------------------------*/

$(function() {

	"use strict";

	/*================*/
	/* 01 - VARIABLES */
	/*================*/
	var swipers = [], winW, winH, _isresponsive, xsPoint = 767, smPoint = 991, mdPoint = 1199, enableScroll = 0;
	var isSafari = /constructor/i.test(window.HTMLElement);
	var circles = [];
	// var ios = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || $(window).width()<940

	if(isSafari) $('body').addClass('safari');


	/*========================*/
	/* 02 - page calculations */
	/*========================*/
	function pageCalculations(){
		winW = $(window).width();
		winH = $(window).height();
		if($('.mob-icon').is(':visible')) {
			_isresponsive = true;
		}
		else {
			_isresponsive = false;
		}
	}


	/*=================================*/
	/* 03 - function on document ready */
	/*=================================*/
	pageCalculations();

	//center all images inside containers
	$('.center-image').each(function(){
		var bgSrc = $(this).attr('src');
		$(this).parent().css({'background-image':'url('+bgSrc+')'});
		$(this).hide();
	});


	/*============================*/
	/* 04 - function on page load */
	/*============================*/
	if(!_isresponsive){
		if($('.wow').length>=1){
			var wow = new WOW(
		        {
		            boxClass:     'wow',      // animated element css class (default is wow)
		            animateClass: 'animated', // animation css class (default is animated)
		            offset:       100,          // distance to the element when triggering the animation (default is 0)
		            mobile:       true,       // trigger animations on mobile devices (default is true)
		            live:         true,       // act on asynchronously loaded content (default is true)
		            callback:     function(box) {
		              // the callback is fired every time an animation is started
		              // the argument that is passed in is the DOM node being animated
		            }
		        }
		    );
		}
    }
    if(_isresponsive){
		$('nav ul li a').removeClass('active');
	}
	var $container;

	$(window).load(function(){
		$(window).scrollTop(0);
		$('body,html').animate({'scrollTop':'0px'},1);


		if($('header').hasClass('meny-bottom')){
			$('header').css({'top':$('.bottom-meny-conteiner').height()-$('header').outerHeight()});
		}

		if($('.sorting-container').length > 0){
			$container = $('.sorting-container').isotope({
		        itemSelector: '.sorting-item',
	            stamp: '.stamp',
		        masonry: {
		            columnWidth: '.grid-sizer'
		        }
		    });
		}	
		
		$('#loader-wrapper').delay(300).fadeOut(300, function(){enableScroll = 1; scrollCall();});
		initSwiper();
		
		$('body').addClass('loaded');
		if(!_isresponsive){
			if($('.wow').length>=1){
				wow.init();
			}
		}
		if($('#content-wrapper').hasClass('border')){
			$('body').addClass('with_border');
		}

		if($('body').hasClass('default')){
			$('.animate-circle').each(function(){
				if($(this).find('.center')){
					$(this).addClass('activated');
				}
				element = $(this).attr('id');
					if($(this).parent().find('.animated-block.scroll-animation.rotated')){
						$(this).parent().find('.animated-block.scroll-animation.rotated').find('span').addClass('activated');
					}
				   	animateProgressBar(500);
	        	$(this).removeClass('animate-circle');
	        	elements_new = element;

			});
			$('.animated-block.scroll-animation').find('span').addClass('activated');
			$('.active-element').addClass('activated');
			$('.animated-button').each(function() {
				$(this).addClass('activated').addClass('nodelay');
			});
		}
		// for pages with animation
		if(!$('body').hasClass('default')){
			if(($('.figure').length>=1)){
				// duration in frames - 30 frames per second 
				$('.figure').each(function(){
					new Vivus(this, {duration: 90, easing: Vivus.ease});	
				});
			}
		} else {
			return false;
		}
		////////////////////////////////////////////////////////////////////////////////////////////////////////
	});


	/*==============================*/
	/* 05 - function on page resize */
	/*==============================*/
	function resizeCall(){
		pageCalculations();
		$('.swiper-container.initialized[data-slides-per-view="responsive"]').each(function(){
			var thisSwiper = swipers['swiper-'+$(this).attr('id')], $t = $(this), slidesPerViewVar = updateSlidesPerView($t);
			thisSwiper.params.slidesPerView = slidesPerViewVar;
			thisSwiper.reInit();
			var paginationSpan = $t.find('.pagination span');
			paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar)).show();
		});	}

	$(window).resize(function(){
		resizeCall();
	});
	window.addEventListener("orientationchange", function() {
		resizeCall();
	}, false);

	/*==============================*/
	/* 06 - function on page scroll */
	/*==============================*/
	var _buffer = null;
	$(window).scroll(function(){
        scrollCall();
	});

	var point_true = 0;
	var stop_circle = 0;
	var circle_this = 0;
	var element = 0;
	var elements_new = 1;
	var center_quantity = $('.icon-wrapper .center').length;
	var center_iterator = 0;
	var obj_animate;
	function scrollCall(){
		var winScroll = $(window).scrollTop();
		if($('body').not('body.default')){
			$('.animate-circle').each(function(){
				if($(window).scrollTop()>=parseInt($(this).offset().top)-$(window).innerHeight()){
					element = $(this).attr('id');
					if($(this).hasClass('big-circle')){
						if($(this).parent().find('.animated-block.scroll-animation.rotated')){
							$(this).parent().find('.animated-block.scroll-animation.rotated').find('span').addClass('activated');
						}
					   	animateProgressBar(3000);
					} else {
						animateProgressBar(2000);
						$(this).addClass('activated');
					}
	            	$(this).removeClass('animate-circle');
	            	elements_new = element;
				}
			});
		}
        
        if(stop_scroll==1){   
            $(window).scrollTop(stop_body);
        }
		
		if(winScroll>=(75)) $('header').addClass('move');
		else $('header').removeClass('move');

		if($('.progress-points').length>0){

			if(_isresponsive){
				if($(window).scrollTop()>($('.progress-points').offset().top)- (winH-($('.progress-points').height()*0.5))){
					point_true = 1;
				}
			}else{
				if($(window).scrollTop()>($('.progress-points').offset().top) - (winH-$('.progress-points').height() + 100)){
					point_true = 1;
				}
			}

			if(point_true==1){
				if(progress_point_stop==0){
					progress_point();
					progress_point_stop =1;
				}
			}
		}

		if($('.skills').length>0){
			if($(window).scrollTop()>($('.skills').offset().top)-($('.skills').height()*2)){
				if(initskillsnum==0){
					initskills();
					initskillsnum =1;
				}
			}
		}

		if($('header').hasClass('meny-bottom')){
			$('header').css({'top':($('.bottom-meny-conteiner').height()-$('header').outerHeight())-$(window).scrollTop()});
			
			if(($('.bottom-meny-conteiner').height() - $('header').outerHeight() - $(window).scrollTop()) <= 0 ){
				$('header').css({'top': '0px'}).addClass('header-top');
			}
			if(($('.bottom-meny-conteiner').height() - $('header').outerHeight() - $(window).scrollTop()) > 0 ){
				$('header').removeClass('header-top');
			}
		}

		// animations on page scroll
		if(!_isresponsive){
			$('.animated-button').each(function() {
				if($(document).scrollTop()>($(this).offset().top - window.innerHeight + 50)){
					var $t = $(this);	
					$t.addClass('activated');
					$(this).addClass('activated');
					setTimeout(function(){
						$t.addClass('nodelay');
					}, 1500);
				}
			});

			$('.animated-block.scroll-animation').each(function() {
				obj_animate = $(this);
				if($('.animated-block.scroll-animation').hasClass('animate-lower')){
					if($(document).scrollTop()>(obj_animate.offset().top - window.innerHeight + 300)){
						animateSquare();
					}
				}
				else if($('.animated-block.scroll-animation').hasClass('animate-higher')){
					if($(document).scrollTop()>(obj_animate.offset().top - window.innerHeight + 100)){
						animateSquare();
					}
				}
			});
			
			$('.active-element').each(function() {
				if($(document).scrollTop()>($(this).offset().top - window.innerHeight + 100)){
					$(this).addClass('activated');
				}
			});
		}
	}
    // animate circles on page scroll
    var speed = 0;
	function animateProgressBar(speed){
		var circle = new ProgressBar.Circle('#'+element, {
	        color: "#ffdf01",
	        strokeWidth: 1,
	        trailColor: null,
	        fill: "#fff"
	    });
		if(!_isresponsive){
		    circle.animate(1, {
		        duration: speed,
		    });
		} 
	}
	function animateSquare(){
		obj_animate.addClass('activated');
		obj_animate.find('span').addClass('activated');
	}
	var circleIterator = 0;
		$('.circle-decoration').each(function(){
					
		$(this).attr('id', $(this).attr('id')+circleIterator)	
	circleIterator++;

	});
	/*=====================*/
	/* 07 - swiper sliders */
	/*=====================*/
	function initSwiper(){
		var initIterator = 0;
		$('.swiper-container').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index + ' initialized').attr('id', index);
			$t.find('.pagination').addClass('pagination-'+index);

			var autoPlayVar = parseInt($t.attr('data-autoplay'), 10);
			var centerVar = parseInt($t.attr('data-centered'), 10);
			var simVar = ($t.closest('.circle-description-slide-box').length || $t.closest('.screens-custom-slider-box').length)?false:true;

			var slidesPerViewVar = $t.attr('data-slides-per-view');
			if(slidesPerViewVar == 'responsive'){
				slidesPerViewVar = updateSlidesPerView($t);
			}
			else if(slidesPerViewVar != 'auto'){
				slidesPerViewVar = parseInt(slidesPerViewVar, 10);
			}
			var loopVar = parseInt($t.attr('data-loop'), 10);
			var speedVar = parseInt($t.attr('data-speed'), 10);

			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				speed: speedVar,
				pagination: '.pagination-'+index,
				loop: loopVar,
				paginationClickable: true,
				autoplay: autoPlayVar,
				slidesPerView: slidesPerViewVar,
				keyboardControl: true,
				calculateHeight: true, 
				simulateTouch: simVar,
				centeredSlides: centerVar,
				roundLengths: true,
				onInit: function(swiper){
				},

				onSlideChangeStart: function(swiper){
					var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
                    if($t.parent().parent().find('.meny-icon a').length){
                    	$t.parent().parent().find('.meny-icon a').removeClass('active');
                    	$t.parent().parent().find('.meny-icon a').eq(activeIndex).addClass('active');
                    }
                    if($t.parent().prev().find('.service').length){
                    	$t.parent().prev().find('.service').removeClass('active');
                    	$t.parent().prev().find('.service').eq(activeIndex).addClass('active');
                    }
                    if($t.parent().find('.popup-close').length){
                        $('.popup-slider-small .thumb-slide .clip').removeClass('active');
                        $('.popup-slider-small .thumb-slide .clip').eq(activeIndex).addClass('active');
                    }
                    if(!_isresponsive){
                    	if($t.parent().find('.team-swiper').length){
	                        $t.find('.swiper-slide .animated-block.scroll-animation').hide();
	                    }
                    }
                    
                    $('.block-type-9 .swiper-slide').each(function() {
						if($(this).hasClass('swiper-slide-active')){
							$(this).find('.active-element.slide-right-animation').removeClass('slide-right-animation').addClass('animated');
						}
					});
				},
				onSlideClick: function(swiper){
                    var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
					if($t.closest('.screens-custom-slider-box').length){
						swiper.swipeTo(swiper.clickedSlideIndex);
					}
                    if($t.hasClass('popup-slider-small')){
                        swipers['swiper-'+$t.parent().parent().find('.popup-slider-big').attr('id')].swipeTo(swiper.clickedSlideIndex);
                    }

                    if(open_popup_index == 1){
							if($(window).height() < $(document).height()){
								stop_body = $(window).scrollTop();
						    	stop_scroll = 1;
						        $('body').addClass('noscroll');
						        $('html').addClass('noscroll');
								$('.popup').addClass('active');
							}else{
						    	$('.popup').addClass('active-style-2');
							}
			    	}
                    
				},
                onSlideChangeEnd: function(swiper){
                    var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
                    popup_slider_index = activeIndex;

                    if($t.parent().find('.team-swiper').length){
                        $t.find('.swiper-slide-active .animated-block.scroll-animation').show();
                    }
                    setTimeout(function(){
	                    $('.block-type-9 .swiper-slide').each(function() {
							if($(this).hasClass('swiper-slide-active')){
								$(this).find('.active-element.slide-right-animation').addClass('slide-right-animation').addClass('animated');
							}
						});
					}, 500);

                }
			});
			swipers['swiper-'+index].reInit();
			if($t.attr('data-slides-per-view')=='responsive'){
				var paginationSpan = $t.find('.pagination span');
				paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar)).show();
			}
			if($t.closest('.screens-custom-slider-box').length) swipers['swiper-'+index].swipeTo(1, 0);

			initIterator++;
		});
	}

	var open_popup_index = 0;
	$(document).on('mouseover', '.open-popup', function(){
		open_popup_index = 1;
	});

	$(document).on('mouseout', '.open-popup', function(){
		open_popup_index = 0;
	});

	function updateSlidesPerView(swiperContainer){
		if(winW>mdPoint) return parseInt(swiperContainer.attr('data-lg-slides'), 10);
		else if(winW>smPoint) return parseInt(swiperContainer.attr('data-md-slides'), 10);
		else if(winW>xsPoint) return parseInt(swiperContainer.attr('data-sm-slides'), 10);
		else return parseInt(swiperContainer.attr('data-xs-slides'), 10);
	}
	//swiper arrows
	$('.swiper-arrow.left').on('click', function(){
		if($(this).hasClass('outer')){
			swipers['swiper-'+$(this).parent().find('.swiper-container').attr('id')].swipePrev();
		} 
		else if($(this).hasClass('in-heading')){
			swipers['swiper-'+$('.swiper-our-works').attr('id')].swipePrev();
		} 
		else {
			swipers['swiper-'+$(this).parent().attr('id')].swipePrev();
		}
	});
	$('.swiper-arrow.right').on('click', function(){
		if($(this).hasClass('outer')){
			swipers['swiper-'+$(this).parent().find('.swiper-container').attr('id')].swipeNext();
		}
		else if($(this).hasClass('in-heading')){
			swipers['swiper-'+$('.swiper-our-works').attr('id')].swipeNext();
		}
		else {
			swipers['swiper-'+$(this).parent().attr('id')].swipeNext();
		}
	});
	//swiper tabs
	$('.meny-icon a').on('click', function(event){
		if($(this).hasClass('active')) return false;
		var activeIndex = $(this).parent().parent().parent().find('a').index(this);
		swipers['swiper-'+$(this).parent().parent().parent().find('.swiper-container').attr('id')].swipeTo(activeIndex);
		$(this).parent().parent().parent().parent().find('.active').removeClass('active');
		$(this).addClass('active');
		return false;
	});

	$('.service').on('click', function(event){
		if($(this).hasClass('active')) return false;
		var activeIndex1 = $(this).parent().find('.service').index(this);
		swipers['swiper-'+$(this).parent().parent().find('.swiper-container').attr('id')].swipeTo(activeIndex1);
		$(this).parent().find('.service').removeClass('active');
		$(this).addClass('active');
		return false;
	});
	$('.service').on('mouseover', function(event){
		clearTimeout(swiperTimeout);
		if($(this).hasClass('active')) return false;
		var activeIndex1 = $(this).parent().find('.service').index(this);
		swipers['swiper-'+$(this).parent().parent().find('.swiper-container').attr('id')].swipeTo(activeIndex1);
		$(this).parent().find('.service').removeClass('active');
		$(this).addClass('active');
		return false;
	});
	$('.service').on('mouseout', function(event){
		var $t = $(this);
		$(this).parent().find('.service').removeClass('active');
		swiperTimeout = setTimeout(function(){swipers['swiper-'+$t.parent().parent().find('.swiper-container').attr('id')].swipeTo(0);}, 100);
		return false;
	});

	var swiperTimeout;
	/*==============================*/
	/* 08 - buttons, clicks, hovers */
	/*==============================*/

	// menu click in responsive
	if(_isresponsive){
	    $('.mob-icon').on('click', function(){
	    	stop_scroll = 1;
	        stop_body = $(window).scrollTop();
	        if($(this).hasClass('act')){
	            $('.mob-icon').removeClass('act');
	            $('nav').removeClass('act-mob');
	            $('header').removeClass('act');
	            $('header').find('.submenu').removeClass('open');
	            stop_scroll = 0;
	            $('header nav a').removeClass('act');
	            if($('header').hasClass('style-6')){$('header nav > ul > li').removeClass('active');
	            } else{

		        }
	            if ($('header nav > ul > li .submenu').is(':visible')){
					$('header nav > ul > li').removeClass('active');
	            	$('header nav > ul > li .submenu').slideUp(300);
	            } else {
	            	return false;
	            }
		
	        } else {
	            $('.mob-icon').addClass('act');
	            $('nav').addClass('act-mob');
	            $('header').addClass('act');
	            $('header nav a').addClass('act');
	            stop_scroll = 1;
	            stop_body = $(window).scrollTop();
	        }   
	    });
	    var num_this;
	    $('nav ul li a').on('click', function(){
	        if($(this).next('.submenu').hasClass('open')){
	        	num_this = $(this);
	        	$(this).next('.submenu').slideUp(500, function(){
	        		num_this.next('.submenu').removeClass('open');
		            num_this.removeClass('active');
		            num_this.parent().removeClass('active');
	        	});
	            
	        }else{
	            $('.hover-menu').next('.submenu').removeClass('open');
	            $(this).next('.submenu').eq(0).addClass('open');
	            $(this).next('.submenu').hide();
	            $(this).next('.submenu').slideDown(500);
	        	$(this).addClass('active');
	        }
	    });


	} 
    $('.menu-icon').on('click', function(){
        if($(this).hasClass('act')){
        	$(this).removeClass('act');
			stop_scroll = 0;
			$('header').removeClass('act');
        } else {
            $(this).addClass('act');
            $('header').addClass('act');
            if($('header').hasClass('style-6')){
            	return false;
            } else{
            	stop_scroll = 1;
            	stop_body = $(window).scrollTop();
            }
        }   
    });

    //responsive drop-down in gallery
	$('.responsive-filtration-title').on('click', function(){
		var height = $(this).next().find('a').length *  $(this).next().find('a').first().height();
		$(this).parent().find('.responsive-filtration-toggle').toggleClass('active');
		$(this).toggleClass('active');
		if ($(this).parent().find('.responsive-filtration-toggle').hasClass('active')) {
	        $(this).parent().find('.responsive-filtration-toggle').css({'height' : height});
	    }else{
            $(this).parent().find('.responsive-filtration-toggle').css({'height' : 0});
		}
	});
	//sorting with filters
	$('.sorting-menu a').on('click', function(){

        if($(this).hasClass('active')) return false;
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        var filterValue = $(this).attr('data-filter');
          $(this).parent().parent().next().isotope({ filter: filterValue });
          return false;
    });

    /*==================================================*/
	/* progress-points */
	/*==================================================*/
    var progress_point_num = 0;
    var progress_point_stop = 0;
    function progress_point(){
        $('.progress-points .number').each(function(){
             progress_point_num = $(this).attr('data-number');
             $(this).animateNumber({ number:  progress_point_num }, 2500);    
        });
    };

    /*==================================================*/
	/* skills */
	/*==================================================*/
    var num_per = 0;
    var initskillsnum = 0;
    function initskills(){
        $('.num-per').each(function(){
             num_per = $(this).attr('data-num-per');
             $(this).animateNumber({ number:  num_per },2500);    
             $(this).parent().parent().css({'width': num_per+'%'});
        });
    };
    
    /*==================================================*/
	/* popup */
	/*==================================================*/
    var stop_scroll = 0;
    var stop_body;
    var popup_slider_index = 0; 

    $('.open-popup').on('click', function(event){
    	event.preventDefault();
    	if($(window).height() < $(document).height()){
    		stop_body = $(window).scrollTop();
        	stop_scroll = 1;
	        $('body').addClass('noscroll');
	        $('html').addClass('noscroll');
			$('.popup').addClass('active');
    	}else{
        	$('.popup').addClass('active-style-2');
    	}
    });

    $('.popup-close').on('click', function(){
    	$('.popup').removeClass('active');
    	$('.popup').removeClass('active-style-2');
    	$('body').removeClass('noscroll');
        $('html').removeClass('noscroll');
        stop_scroll = 0;
        initSwiper();
    });

    $('.play-button').on('click', function(event){
    	event.preventDefault();
        $(this).parent().find('iframe').attr('src', $(this).attr('data-link'));
        $(this).parent().find('iframe').show();
        $(this).parent().find('.video-close').show();
    }); 

    $('.video-close').on('click', function(event){
    	event.preventDefault();
        $(this).prev().attr('src','');
        $(this).prev().hide();
        $(this).parent().find('.video-close').hide();
    }); 
    
    /*==================================================*/
	/* filters */
	/*==================================================*/
    $('.filters-thumbs .filter-wrap span').on('click', function(){
        $(this).parent().parent().prev().val($(this).text());
        $(this).parent().parent().parent().parent().parent().parent().next().find('.swiper-container').html($(this).attr('data-msg'));
        initSwiper();
        return false;
    });
    if($('.block-type-2 .thumb-slide .button').length > 0){
    	if(_isresponsive){
			var $this = $('.block-type-2 .thumb-slide .button');
		    $this.removeClass('open-popup');
		    $this.parent().addClass('open-popup');
		}
    }
    

    //input_textarea_clare//////////////////////////////////////////////////////////////////////////////////
	$('input, textarea').on('focus', function(){
		$(this).addClass('active');
	});
	
	$('input, textarea').on('blur', function(){
		$(this).removeClass('active');
	});

});