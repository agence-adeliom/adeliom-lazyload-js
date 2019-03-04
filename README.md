# Install
```
yarn add https://bitbucket.org/adeliomgit/adeliom-lazyload-js.git
```

# HTML

```
<div
js-lazyload
data-img="url_img_xs"
data-img-sm="url_img_sm"
data-img-lg="url_img_lg"
data-img-2x="url_img_retina"
style="background-image:url('thumbnail')"></div>

<img
js-lazyload
src="thumbnail"
data-img="url_img_xs"
data-img-sm="url_img_sm"
data-img-lg="url_img_lg"
data-img-2x="url_img_retina">
```

# Import
```
import Lazyload from './lazyload';
```

# Available options (by default)

```
Lazyload.init({
    beforeVisible: 150,
    selector: '[js-lazyload]',
    breakpoints: {
        sm: 720,
        lg: 1280
    }
});
```

# Available methods

```
Lazyload.init();
Lazyload.reset();
Lazyload.update();
```