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
    beforeVisible: 150,
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

    getElements();

    if(nbElements){
        updateSrc();
        window.addEventListener('scroll', initScroll);
    }

};


/**
 * Get elements
 * - Get all elements from selector
 */
const getElements = () => {
    elements = document.querySelectorAll(options.selector);
    nbElements = elements.length;
};


/**
 * Update
 * - Update source of images
 */
const update = () => {
    getElements();
    updateSrc();
};


/**
 * Reset
 * - Create options merging defaults with user defined options
 */
const reset = () => {
    window.removeEventListener('scroll', initScroll);
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

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        const bottomPos = scrollTop + window.innerHeight;

		const position = el.getBoundingClientRect();

		if(!position || !position.height){
			return;
        }

		const bodyRect = document.body.getBoundingClientRect();
		const positionTop = position.top - bodyRect.top;

		if (bottomPos > positionTop - options.beforeVisible || !options.beforeVisible) {
            if(src){

                // Create an img object
                let img = document.createElement('img');
                img.src = src;

                // When img is loaded => add it to the DOM
                img.addEventListener('load', function(){

                    for (let n = el.attributes.length - 1; n >= 0; n--){
                        let attribute = el.attributes[n].nodeName.split('-');
                        if(attribute.length && attribute[0] === 'data' && attribute[1] === "img"){
                            el.removeAttribute(el.attributes[n].nodeName);
                        }
                      }

                    el.removeAttribute('js-lazyload');
                    el.setAttribute("js-lazyload-ready","");

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

	for(let i = 0; i < Object.keys(options.breakpoints).length; i++){

		var breakpoint = Object.keys(options.breakpoints)[i];
        var breakpointValue = Object.values(options.breakpoints)[i];

		if (window.matchMedia("(min-width:" + breakpointValue + "px)").matches) {

            if(isRetina() && el.getAttribute('data-img-'+breakpoint+'-'+window.devicePixelRatio+'x')){
                return el.getAttribute('data-img-'+breakpoint);
            }

            if(el.getAttribute('data-img-'+breakpoint)){
                return el.getAttribute('data-img-'+breakpoint);
            }

        }

    }

    if((el.getAttribute('data-img-2x') && isRetina())){
        return el.getAttribute('data-img-2x');
    }

    if(el.getAttribute('data-img')){
        return el.getAttribute('data-img');
    }

    return null;
};


/**
 * Test Retina
 */
const isRetina = () => {
    return window.devicePixelRatio && window.devicePixelRatio >= 2;
};


/**
 * Export functions
 */
export default {
    init,
    reset,
	update
};