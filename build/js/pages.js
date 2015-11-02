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

        return $(window).outerWidth()+15 < 768;
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
                allLoaded = true;
                cb();
            };
        }
    }

    $(window).on('DOMContentLoaded load resize scroll', function(e){
      // console.info($(window).scrollTop());
        if($(window).scrollTop() >= 918 && pagesFixed == true){
            pagesFixed = false;
            $('#pages').addClass('relative');
        } else if($(window).scrollTop() < 918 && pagesFixed == false) {
            pagesFixed = true;
            $('#pages').removeClass('relative');
        }
    });

    for (var i = articlesArr.length - 1; i >= 0; i--) {
        articlesArr[i].jq = $('#'+articlesArr[i].id);
        articlesArr[i].isLoaded = false;
    };
    

    loadAll(function(){
        $('.scrollToArticle').on('click', function(e){
            e.preventDefault();
            var self = this,
                newPos;
                        
            var adjustment = isMobile() ? 0 : 968 - $(window).scrollTop()
            
            if($(self).attr('href') == "#director-letter") {
              if (isMobile()){
                newPos = 810;
              } else {
                newPos = 930;
              }
            } else  {
              newPos = $($(self).attr('href')).offset().top + adjustment - 155;
            }
            $('html, body').animate({
                scrollTop: newPos
            }, 1200);
        });
        
        $('a').each(function(){
            if(!$(this).hasClass('scrollToArticle')){
                $(this).attr('target', '_blank');
            }
        });
    });

    $('body').delegate('.backToTop', 'click', function(){
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

    $('body').delegate('.titleBackToTop', 'click', function(){
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

});

Element.prototype.backgroundClipPolyfill = function () {
  var a = arguments[0],
      d = document,
      b = d.body,
      el = this;

  function hasBackgroundClip() {
    return b.style.webkitBackgroundClip != undefined;
  };
  
  function addAttributes(el, attributes) {
    for (var key in attributes) {
      el.setAttribute(key, attributes[key]);
    }
  }
  
  function createSvgElement(tagname) {
    return d.createElementNS('http://www.w3.org/2000/svg', tagname);
  }
  
  function createSVG() {
    var a = arguments[0],
        svg = createSvgElement('svg'),
        grad = createSvgElement('linearGradient'),
        text = createSvgElement('text');
    
    addAttributes(grad, {
      'id' : a.id,
      'width' : a.width,
      'height' : a.height
    });

    for (var i=0; i < a.stops.length; i++){
        var attrs = a.stops[i];
        var stop = document.createElementNS('http://www.w3.org/2000/svg','stop');
        for (var attr in attrs){
            if (attrs.hasOwnProperty(attr)) stop.setAttribute(attr,attrs[attr]);
        }
    grad.appendChild(stop);
    }
    
    addAttributes(text, {
      'x' : 0,
      'y' : 80,
      'class' : a['class'],
      'style' : 'fill:url(#' + a.id + ');'
    });
    
    // Set text
    text.textContent = a.text;
      
    svg.appendChild(grad);
    svg.appendChild(text);
    
    return svg;
  };
  
  /*
   * Replace the element if background-clip
   * is not available.
   */
  if (!hasBackgroundClip()) {
      var svg = createSVG({
        'id' : a.patternID,
        'class' : a['class'],
        'width' : this.offsetWidth,
        'height' : this.offsetHeight,
        'text' : el.textContent,
        'stops' : a.stops
      });
      el.parentNode.replaceChild(svg, el);
  }
};

var bigTitle = document.querySelector('.bigTitle'); 
var smallTitle = document.querySelector('.smallTitle'); 

bigTitle.backgroundClipPolyfill({
    'patternID' : 'gradient',
    'class' : 'headline',
    'stops' : [
        {offset:'100%', 'stop-color':'#1d539c'},
        {offset:'0%','stop-color':'#2c8bc4'}
    ]
});

smallTitle.backgroundClipPolyfill({
    'patternID' : 'gradient2',
    'class' : 'headline',
    'stops' : [
        {offset:'100%', 'stop-color':'#1d539c'},
        {offset:'0%','stop-color':'#2c8bc4'}
    ]
});