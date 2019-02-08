/**
 * *******************************************************
 * Polyfill for IE
 * *******************************************************
 */
import 'babel-polyfill';


/**
 * *******************************************************
 * Global variables
 * *******************************************************
 */

let elements;
let nbElements;
let resizeTimer;
let i = 0;


/**
 * *******************************************************
 * Config default
 * *******************************************************
 */

let options = {
    beforeVisible: 0,
    selector: '[js-lazyload]',
    breakpoints: {
        sm: 720,
        lg: 1280
    }
};


/**
 * Initializing
 * - Create options merging defaults with user defined options
 */
const init = settings => {

    options = Object.assign(options, settings);

    // Get all elements
    elements = document.querySelectorAll(options.selector);
    nbElements = elements.length;

    if(nbElements){
        updateSrc();
        window.addEventListener('scroll', initScroll);
    }

};


/**
 * Refresh
 * - Create options merging defaults with user defined options
 */
const refresh = () => {
    init();
};


/**
 * Event on scroll
 */
const initScroll = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        updateSrc();
    }, 150);
};


/**
 * Replace images's source
 * - Get elements with [js-lazyload] attribute
 * - Update the src with data from attributes
 */
const updateSrc = () => {

    // When every image is loaded unbind the event
    if(i === nbElements){
        window.removeEventListener('scroll', initScroll);
        return;
    }

    for (let el of elements) {

        let src = null;

        src = getSrc(el);

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
                    el.removeAttribute('data-img-sm');
                    el.removeAttribute('data-img-lg');
                    el.removeAttribute('data-img-retina');
                    if(el.tagName === "IMG"){
                        el.setAttribute('src', src);
                    }
                    else{
                        el.style.backgroundImage = 'url("'+ src +'")';
                        el.style.backgroundRepeat = 'no-repeat';
                    }
                });

                i++;
            }
        }
    }

};


/**
 * Return src for image
 * - Take the right source depending on retina screen and breakpoint
 */
const getSrc = (el) => {

    if((el.getAttribute('data-img-retina') && isRetina()) || (el.getAttribute('data-img-retina') && isHighDensity())){
        return el.getAttribute('data-img-retina');
    }
    if(el.getAttribute('data-img-lg') && window.matchMedia("(min-width:" + options.breakpoints.lg + "px)").matches) {
        return el.getAttribute('data-img-lg');
    }
    if(el.getAttribute('data-img-sm') && window.matchMedia("(min-width:" + options.breakpoints.sm + "px)").matches) {
        return el.getAttribute('data-img-sm');
    }
    if(el.getAttribute('data-img')){
        return el.getAttribute('data-img');
    }
    
    return null;
};


/**
 * Test Retina
 * - Some functions to know if a retina screen is used
 */
const isHighDensity = () => {
    return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));
};

const isRetina = () => {
    return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)').matches)) || (window.devicePixelRatio && window.devicePixelRatio >= 2)) && /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
};


/**
 * Export functions
 */
export default {
    init,
    refresh
};