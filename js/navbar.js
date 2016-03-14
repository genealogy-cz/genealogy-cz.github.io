/*jslint browser: true*/
/*global $, jQuery, History, alert, console*/

(function () {
    "use strict";
    
    // Close the collapsed menu (on small screens) on click
    $(document).on('click', '.navbar-collapse.in', function (e) {
        if ($(e.target).is('a') && $(e.target).attr('class') !== 'dropdown-toggle') {
            $(this).collapse('hide');
        }
    });

    //function updateAffixTop() {
    //    new_top = $('#home-page-header').height();
    //    $('nav').affix({
    //      offset: {
    //        top: new_top
    //      }
    //    });
    //    $('#signup').text(new_top + " !!!@@@");
    //}

    $(window).resize(function () {
    //     $('#signup').text($('#home-page-header').height());
    //    $('#signup').text(window.innerWidth);
    //    test(window.innerWidth)
    //    test($('.navbar').height());

    //    updateAffixTop();    
//        alert("!!!");
    });
    
    $(window).on('hashchange', function (e) {
        var origEvent = e.originalEvent;
    });
    
//    $(window).bind('hashchange', function () {
////        alert("222");
//        var newHash = window.location.hash.substr(1);
////        $mainContent.load(newHash + " #content > *");
////        alert(newHash + "  -  " + window.location.hash);
//    });

    function test(st) {
        $('#signup').text(st);
    }

    // Select navbar items 
    // http://stackoverflow.com/questions/9301507/bootstrap-css-active-navigation
    $(document).ready(function () {
        $('.navbar-collapse ul.nav > li').click(function (e) {
//            e.preventDefault();
            $('.navbar-collapse ul.nav > li').removeClass('active');
            $(this).addClass('active');
        });
    });


	$(document).ready(function () {
        
//        $('#home-page-header').ajaxify();
        
//        var siteUrl = 'http://' + (document.location.hostname || document.location.host);
////        alert(siteUrl);
//        $(document).delegate('a[href^="/"],a[href^="' + siteUrl + '"]', "click", function (e) {
//            e.preventDefault();
////            alert(this.pathname);
//            History.pushState({}, "", this.pathname);
//        });
//
//        History.Adapter.bind(window, 'statechange', function () {
//            var State = History.getState();
//            $.get(State.url, function (data) {
//                document.title = $(data).find("title").text();
//                $('#home-page-header').html($(data).find('#home-page-header'));
//    //            _gaq.push(['_trackPageview', State.url]);
//            });
//        });
        
        
        
//// Assign tabindex to all links (incl. menu items) so that ESC works on submenus
//        $(function(){
//            var tabindex = 1;
////            $('.navbar-nav ul.dropdown-menu').find('a').each(function() {
//            $('.navbar-nav li.dropdown').find('a').each(function() {
//                if (this.type != 'hidden') {
//                    $(this).attr('tabindex', tabindex);
//                    
//                    tabindex++;
//                }
//            });
//        });
       
        $('nav').affix({
            offset: {
                top: function () {
                    return $('#home-page-header').height();
                }
            }
        });

        $('nav').on('affixed-top.bs.affix', function () {
            $('#brand').hide();
            $('#home-item').hide();
            $('#search-item').hide();
        });

        $('nav').on('affix.bs.affix', function () {
            $('#brand').show();
            $('#home-item').show();
            $('#search-item').show();
        });

        $('#search-item').click(function () {
            $("#search-input").focus();
        });
        
        
//    function closeIfOpen() {
//        // Close collapsed main menu on small screen scroll
//        var opened = $('.navbar-collapse').hasClass('collapse in');
//        if ( opened === true && $('.navbar').height() <= $(window).height()) {
////            $('.navbar-collapse').collapse('hide');
//        }
//    }
//        
//    $('body').on('touchmove', function(e) {
//        closeIfOpen();
//    });
//        
//    $(document).scroll(function(e) {
//        closeIfOpen();
//    });
        
        $('a[href^="#"]').on('click', function (e) {
            e.preventDefault(); // !!!

            var target = this.hash,
                $target = $(target);

    //        test(Math.abs(window.scrollY - $(this.hash).offset().top)
    //             - ($target.offset().top - $('.navbar').height() - 10));

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - $('.navbar').height() - 10
            },
                Math.min(500, Math.abs(window.scrollY - $(this.hash).offset().top) / 3),
                'swing', function () {
                    window.location.hash = target;

//                    $('html, body').stop().animate({
//                        'scrollTop': $target.offset().top - $('.navbar').height() - 10
//                    }, 1, 'swing');
                });
        });
        
	});
    
}());