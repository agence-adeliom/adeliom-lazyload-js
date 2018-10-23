# Import
import Lazyload from './lazyload';

# Available options (by default)
Lazyload.init({
    beforeVisible: 500,
    selector: '[js-lazyload]'
});

#beforeVisible => number of pixel before loading the img