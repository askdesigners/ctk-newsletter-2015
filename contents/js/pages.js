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
            console.log('handle');
            for (var i = articlesArr.length - 1; i >= 0; i--) {
                // console.log('visibility of ' + articlesArr[i].id + ' : ' + isElementInViewport(articlesArr[i].jq));
                if(isElementInViewport(articlesArr[i].jq) && !articlesArr[i].isLoaded){
                    console.log('loading');
                    articlesArr[i].isLoaded = true;
                    articlesArr[i].jq.load( articlesArr[i].link + " .articleContents" );
                }
            };
        }
    }

    var handler = onVisibilityChange();

    $(window).on('DOMContentLoaded load resize scroll', function(e){
        // $.throttle( 50, handler() );
        handler();
        $.throttle(0, function(){
            console.log('scrolled');
        });
        // onVisibilityChange(el, callback);
        // onVisibilityChange();
    });
}); 