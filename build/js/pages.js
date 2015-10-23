jQuery(document).ready(function($) {

    var loader = function(elem, cb){
        elem.jq.find('.articleTarget').fadeOut('slow', function() {
            elem.jq.find('.articleTarget').load( window.location.href.split('#')[0].replace(/\/$/, "") + elem.link + " .articleContents", function(e){
                elem.isLoaded = true;
                elem.jq.find('.articleTarget').fadeIn('slow');
                if(typeof cb == 'function'){
                    cb();
                }
            });
        });
    };

    var isMobile = function(){
        
    };

    var pagesFixed = true,
        allLoaded = false;

    function loadAll(cb){
        var artLoaded = 0;
        for (var c = articlesArr.length - 1; c >= 0; c--) {
            loader(articlesArr[c], counter);
        };
        function counter(){
            artLoaded = artLoaded + 1;
            if (artLoaded == articlesArr.length - 1) {
                console.timeEnd('loading');
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
    });

    for (var i = articlesArr.length - 1; i >= 0; i--) {
        articlesArr[i].jq = $('#'+articlesArr[i].id);
        articlesArr[i].isLoaded = false;
    };
    
    console.time('loading');

    loadAll(function(){
        $('.scrollToArticle').on('click', function(e){
            e.preventDefault();
            var self = this;

            $('html, body').animate({
                scrollTop: $($(self).attr('href')).offset().top + 968 - $(window).scrollTop()
            }, 2000);
        });
    });
}); 