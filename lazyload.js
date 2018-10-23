/**
 * *******************************************************
 * Global variables
 * *******************************************************
 */

let elements;
let nbElements;


/**
 * *******************************************************
 * Config default
 * *******************************************************
 */

let options = {
    beforeVisible: 500,
    selector: '[js-lazyload]'
};


/**
 * Initializing AOS
 * - Create options merging defaults with user defined options
 */
const init = function init(settings) {

    options = Object.assign(options, settings);

    // Get all elements
    elements = document.querySelectorAll(options.selector);
    nbElements = elements.length;

    if(nbElements){

        let resizeTimer;

        updateSrc();

        window.addEventListener('scroll', function(e) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {

                updateSrc();

            }, 150);

        });
    }

}

/**
 * Replace images's source
 * - Get elements with [js-lazyload] attribute
 * - Update the src with data from attributes
 */
const updateSrc = function updateSrc(){

    // When every image is loaded unbind the event
    if(i === nbElements){
        window.unbind('scroll')
        return;
    }

    let i = 0;

    elements.forEach(function(el){

        let src = null;

        // Take the right source depending on retina screen
        if(el.getAttribute('data-img')){
            src = el.getAttribute('data-img');
        }
        if(el.getAttribute('data-img-retina') && isRetina() || el.getAttribute('data-img-retina') && isHighDensity()){
            src = el.getAttribute('data-img-retina');
        }

        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        let bottomPos = scrollTop + window.innerHeight;

        if(bottomPos > el.offsetTop - options.beforeVisible || !options.beforeVisible){
            if(src){

                // Create an img object
                let img = document.createElement('img');
                img.src = src;

                // When img is loaded => add it to the DOM
                img.addEventListener('load', function(){
                    el.removeAttribute('data-img');
                    el.removeAttribute('data-img-retina');
                    if(el.tagName === "IMG"){
                        el.setAttribute('src', src);
                    }
                    else{
                        el.style.backgroundImage = 'url("'+ src +'")';
                        el.style.backgroundRepeat = 'no-repeat';
                    }
                    i++;
                });
            }
        }
    });
}


/**
 * Test Retina
 * - Some functions to know if a retina screen is used
 */
const isHighDensity = function isHighDensity(){
    return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));
}

const isRetina = function isRetina(){
    return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)').matches)) || (window.devicePixelRatio && window.devicePixelRatio >= 2)) && /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
}


export default {
    init
};