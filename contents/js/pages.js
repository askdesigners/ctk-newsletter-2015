jQuery(document).ready(function($) {

    function isElementInViewport (el) {
        //special bonus for those using jQuery
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight-50) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    }

    function onVisibilityChange (el, callback) {
        for (var i = articlesArr.length - 1; i >= 0; i--) {
            articlesArr[i].jq = $('#'+articlesArr[i].id);
            articlesArr[i].isLoaded = false;
        };
        return function () {
            // console.log('visibility ' + isElementInViewport($('#redakci-techniku')));
            // console.log('handle');
            
            var loader = function(elem){
                console.log('loading', window.location.href.replace(/\/$/, ""));
                elem.jq.find('.articleTarget').fadeOut('slow', function() {
                    elem.jq.find('.articleTarget').load( window.location.href.replace(/\/$/, "") + elem.link + " .articleContents", function(e){
                        elem.isLoaded = true;
                        console.log('loaded!', elem);
                        elem.jq.find('.articleTarget').fadeIn('slow');
                    });
                });
            };

            for (var c = articlesArr.length - 1; c >= 0; c--) {
                if(isElementInViewport(articlesArr[c].jq) && !articlesArr[c].isLoaded){
                    loader(articlesArr[c]);
                }
            };
        }
    }

    var handler = onVisibilityChange(),
        pagesFixed = true;

    $(window).on('DOMContentLoaded load resize scroll', function(e){
        console.log($(window).scrollTop());
        handler();
        $.throttle(0, function(){
            console.log('scrolled');
        });
        if($(window).scrollTop() >= 942 && pagesFixed == true){
            pagesFixed = false;
            $('#pages').addClass('relative');
        } else if($(window).scrollTop() < 942 && pagesFixed == false) {
            pagesFixed = true;
            $('#pages').removeClass('relative');

        }
    });

    articlesArr[0].isLoaded = true;
    articlesArr[0].jq.load( articlesArr[0].link + " .articleContents" );
}); 