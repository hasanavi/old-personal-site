/**
 * UTIL - frequently used utility functions
 * framework independence preferable
 */

(function(document) {
    window.UTIL = window.UTIL || {};

    /**
     * Fix for iPhone viewport scale bug
     * http://www.blog.highub.com/mobile-2/a-fix-for-iphone-viewport-scale-bug/
     */

    UTIL.viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]');    
    UTIL.ua = navigator.userAgent;
    UTIL.page;

    UTIL.scaleFix = function() {
        if (UTIL.viewportmeta && /iPhone|iPad|iPod/.test(UTIL.ua) && !/Opera Mini/.test(UTIL.ua)) {
            UTIL.viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
            document.addEventListener('gesturestart', UTIL.gestureStart, false);
        }
    };

    UTIL.gestureStart = function() {
        UTIL.viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
    };

    UTIL.hideUrl = function(isAlways){
    	var ua = UTIL.ua,
    	iphone = ~ua.indexOf('iPhone') || ~ua.indexOf('iPod'),
    	ipad = ~ua.indexOf('iPad'),
    	ios = iphone || ipad,
    	// Detect if this is running as a fullscreen app from the homescreen
    	fullscreen = window.navigator.standalone,
    	android = ~ua.indexOf('Android'),
    	chrome = ~ua.indexOf('Chrome'),
    	lastWidth = 0;
    	UTIL.page = document.getElementById('container');
    	
    	window.addEventListener("load", function(e) {
    		setTimeout(hideUrl, 100);
    	}, false);
    	//window.addEventListener("orientationchange", hideUrl ); //android old version doesn't support it 
    	window.onresize = function() {hideUrl();};
    	
    	if(isAlways){
	    	window.onscroll = function(){if(window.pageYOffset <= 5) window.scrollTo(0, 1);}
    	}
    	
    	function hideUrl(){    		
    		//var orient = (window.innerWidth == 320) ? "profile" : "landscape";
    		if(!fullscreen){
    			var viewPort = UTIL.getViewport(),
    			pageWidth = viewPort[0];			
    			if (lastWidth == pageWidth) return;
    			lastWidth = pageWidth;
    			if(android)
    				UTIL.page.style.height = chrome ? (window.innerHeight) + 'px' : (window.innerHeight + 56) + 'px';
    			window.scrollTo(0, 1);
    		}
    	}
    };
    
    UTIL.getViewport = function() {
    	var viewPortWidth;
    	var viewPortHeight;

    	// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    	if (typeof window.innerWidth != 'undefined') {
    		viewPortWidth = window.innerWidth,
    		viewPortHeight = window.innerHeight;
    	}

    	// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    	else if (typeof document.documentElement != 'undefined'
    		&& typeof document.documentElement.clientWidth !=
    			'undefined' && document.documentElement.clientWidth != 0) {
    		viewPortWidth = document.documentElement.clientWidth,
    		viewPortHeight = document.documentElement.clientHeight;
    	}

    	// older versions of IE
    	else {
    		viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
    		viewPortHeight = document.getElementsByTagName('body')[0].clientHeight;
    	}
    	return [viewPortWidth, viewPortHeight];
    };

    
    /**
     * Autogrow
     * http://googlecode.blogspot.com/2009/07/gmail-for-mobile-html5-series.html
     */

    UTIL.autogrow = function(element, lh) {
        function handler(e) {
            var newHeight = this.scrollHeight;
            var currentHeight = this.clientHeight;
            if (newHeight > currentHeight) {
                this.style.height = newHeight + 3 * textLineHeight + 'px';
            }
        }

        var setLineHeight = (lh) ? lh : 12;
        var textLineHeight = element.currentStyle ? element.currentStyle.lineHeight : getComputedStyle(element, null).lineHeight;

        textLineHeight = (textLineHeight.indexOf('px') == -1) ? setLineHeight : parseInt(textLineHeight, 10);

        element.style.overflow = 'hidden';
        element.addEventListener ? element.addEventListener('input', handler, false) : element.attachEvent('onpropertychange', handler);
    };

    /**
     * Prevent default scrolling on document window
     */
     
    UTIL.preventScrolling = function() {
        document.addEventListener('touchmove', function(e) {
            if (e.target.type === 'range') { return; }
            e.preventDefault();
        }, false);
    };

    /**
     * Prevent iOS from zooming onfocus
     * https://github.com/h5bp/mobile-boilerplate/pull/108
     * Adapted from original jQuery code here: http://nerd.vasilis.nl/prevent-ios-from-zooming-onfocus/
     */

    UTIL.preventZoom = function() {
        var formFields = document.querySelectorAll('input, select, textarea');
        var contentString = 'width=device-width,initial-scale=1,maximum-scale=';
        var i = 0;

        for (i = 0; i < formFields.length; i++) {
            formFields[i].onfocus = function() {
                UTIL.viewportmeta.content = contentString + '1';
            };
            formFields[i].onblur = function() {
                UTIL.viewportmeta.content = contentString + '10';
            };
        }
    };

    /**
     * iOS Startup Image helper
     */

    UTIL.startupImage = function() {
        var portrait;
        var landscape;
        var pixelRatio;
        var head;
        var link1;
        var link2;

        pixelRatio = window.devicePixelRatio;
        head = document.getElementsByTagName('head')[0];

        if (navigator.platform === 'iPad') {
            portrait = pixelRatio === 2 ? 'webapp-util/startup/startup-tablet-portrait-retina.png' : 'webapp-util/startup/startup-tablet-portrait.png';
            landscape = pixelRatio === 2 ? 'webapp-util/startup/startup-tablet-landscape-retina.png' : 'webapp-util/startup/startup-tablet-landscape.png';

            link1 = document.createElement('link');
            link1.setAttribute('rel', 'apple-touch-startup-image');
            link1.setAttribute('media', 'screen and (orientation: portrait)');
            link1.setAttribute('href', portrait);
            head.appendChild(link1);

            link2 = document.createElement('link');
            link2.setAttribute('rel', 'apple-touch-startup-image');
            link2.setAttribute('media', 'screen and (orientation: landscape)');
            link2.setAttribute('href', landscape);
            head.appendChild(link2);
        } else {
            portrait = pixelRatio === 2 ? "webapp-util/startup/startup-retina.png" : "webapp-util/startup/startup.png";
            portrait = screen.height === 568 ? "webapp-util/startup/startup-retina-4in.png" : portrait;
            link1 = document.createElement('link');
            link1.setAttribute('rel', 'apple-touch-startup-image');
            link1.setAttribute('href', portrait);
            head.appendChild(link1);
        }

        //hack to fix letterboxed full screen web apps on 4" iPhone / iPod
        if ((navigator.platform === 'iPhone' || 'iPod') && (screen.height === 568)) {
            if (UTIL.viewportmeta) {
                UTIL.viewportmeta.content = UTIL.viewportmeta.content
                    .replace(/\bwidth\s*=\s*320\b/, 'width=320.1')
                    .replace(/\bwidth\s*=\s*device-width\b/, '');
            }
        }
    };
    
    UTIL.nl2br = function (str, is_xhtml) {
    	var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
    	return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
    };
    
    UTIL.perToPixel = function (parentelem, percentage){	
    	return (parentelem * percentage / 100);
    };
    
    UTIL.getBrowserPrefix = function(){ //very handy for setting browser prefixed CSS property through JS
		var styles = window.getComputedStyle(document.documentElement, ''),
	    pre = (Array.prototype.slice
	      .call(styles)
	      .join('') 
	      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
	    )[1];
		return '-'+pre+'-';
	};
    
    function checkOrientation(inp){ //0 - portrait / 1 - landscape
    	var isPortrait = null;
		var viewPort = UTIL.getViewport(),
			w = viewPort[0],
			h = viewPort[1];
		isPortrait =  w < h ? true : false;
    	return inp == 0 ? isPortrait : !isPortrait;
    }
    
    UTIL.isPortrait = function(){
    	return checkOrientation(0);
    };
    
    UTIL.isLandscape = function(){
    	return checkOrientation(1);
    };
    
    UTIL.isTouchDevice = function(){
    	return 'ontouchstart' in document.documentElement;
    };
        
    UTIL.isTablet = function(){
    	var vp = UTIL.getViewport(),
    		_w = Math.max(vp[0], vp[1]),_h = Math.min(vp[0], vp[1]),
    		tabW = 600,tabH = 440; //it's 441px height for nexus 7 chrome browser in landscape mode.. 
    	return ((_w >= tabW && _h >= tabH) && UTIL.isTouchDevice());
    };

    UTIL.monitorIosFullscreen = function(){
        if(!(~UTIL.ua.indexOf('iPhone') || ~UTIL.ua.indexOf('iPod'))) return;
        
        var previousSize = UTIL.getViewport();
        $(window).on("pageshow resize",(function(e){
            var newSize = UTIL.getViewport();            
            var previousOrientation = (previousSize[1] > previousSize[0]) ? 'portrait' : 'landscape';
            var newOrientation = (newSize[1] > newSize[0]) ? 'portrait' : 'landscape';

            if(newOrientation == 'landscape'){
                if(newSize[1] >= 300){
                    $("body").addClass("iosfullscreen");
                }else{
                    $("body").removeClass("iosfullscreen");
                }
				$(document).trigger("iosfullscreen");
            }
            previousSize = newSize;            
            window.scrollTo(0,1);
            return arguments.callee;
        }()));
    };
    
    UTIL.anm = function(elem,data,time,easing,callback){ //time, easing and callback are optional
    	var tabletAnimTime = 600,phoneAnimTime = 300;
    	if(typeof time === 'undefined') time = UTIL.isTablet() ? tabletAnimTime : phoneAnimTime; //override the time
    	$(elem).animate(data,time,easing,callback);
    };
    
    UTIL.circularArrayIndex = function(arrLength,pos){
    	return pos < 0 ? arrLength-1 : pos >= arrLength ? 0 : pos;
    };
    
    function initIsArray(){
    	Array.isArray = function (vArg) {
    		return Object.prototype.toString.call(vArg) === "[object Array]";
    	};    	
    }
    
    UTIL.preloadImage = function(imgArr){    	
    	if(!Array.isArray) initIsArray();
    	if(!Array.isArray(imgArr)) return null;
    	
    	var rootDir = window.staticDir + 'img/';
		rootDir += (UTIL.isTablet()) ? '' : 'smartphone/';
    	
    	imgObj = new Image();
    	for(var i=0; i<imgArr.length; i++)
            imgObj.src = rootDir + imgArr[i];    	
    };

    UTIL.getCleanHash = function(){
        return document.location.hash.replace('#!','');
    }

    UTIL.setHash = function(pageName){
        document.location.hash = '#!' + pageName;
    }

    UTIL.requestAnimFrame = (function(){
       return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||
                function( callback ){
                    window.setTimeout(callback, 1000 / 60);
                };
    })();    

})(document);