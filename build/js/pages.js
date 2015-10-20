jQuery(document).ready(function($) {

    var loader = function(elem, cb){
        // console.log('loading', window.location.href.replace(/\/$/, ""));
        elem.jq.find('.articleTarget').fadeOut('slow', function() {
            elem.jq.find('.articleTarget').load( window.location.href.split('#')[0].replace(/\/$/, "") + elem.link + " .articleContents", function(e){
                elem.isLoaded = true;
                // console.log('loaded!', elem);
                elem.jq.find('.articleTarget').fadeIn('slow');
                if(typeof cb == 'function'){
                    cb();
                }
            });
        });
    };

    var handler = onVisibilityChange(),
        pagesFixed = true,
        allLoaded = false;

    function isElementInViewport (el) {
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom-200 <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    }

    function onVisibilityChange (el, callback) {
        for (var i = articlesArr.length - 1; i >= 0; i--) {
            articlesArr[i].jq = $('#'+articlesArr[i].id);
            articlesArr[i].isLoaded = false;
        };
        return function () {
            for (var c = articlesArr.length - 1; c >= 0; c--) {
                if(isElementInViewport(articlesArr[c].jq) && !articlesArr[c].isLoaded){
                    loader(articlesArr[c]);
                }
            };
        }
    }

    function loadAll(cb){
        var artLoaded = 0;
        for (var c = articlesArr.length - 1; c >= 0; c--) {
            loader(articlesArr[c], counter);
        };
        function counter(){
            artLoaded = artLoaded + 1;
            console.log('counting ', artLoaded, articlesArr.length - 1);
            if (artLoaded == articlesArr.length - 1) {
                console.log("all loaded!");
                allLoaded = true;
                cb();
            };
        }
    }

    $(window).on('DOMContentLoaded load resize scroll', function(e){
        // console.log($(window).scrollTop());
        if($(window).scrollTop() >= 968 && pagesFixed == true){
            pagesFixed = false;
            $('#pages').addClass('relative');
        } else if($(window).scrollTop() < 968 && pagesFixed == false) {
            pagesFixed = true;
            $('#pages').removeClass('relative');
        }
        handler();
    });

    articlesArr[0].isLoaded = true;
    articlesArr[0].jq.load( window.location.href.split('#')[0].replace(/\/$/, "") + articlesArr[0].link + " .articleContents" );
    
    $('.scrollToArticle').on('click', function(e){
        e.preventDefault();

        var self = this;
        if(allLoaded == true){
            $('html, body').animate({
                scrollTop: $($(self).attr('href')).offset().top + 968
            }, 2000);
        } else {
            loadAll(function(){
                console.log('scrolling')
                $('html, body').animate({
                    scrollTop: $($(self).attr('href')).offset().top + 968
                }, 2000);
            });
        }
    });
    
}); 