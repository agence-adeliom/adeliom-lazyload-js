# Install
```
yarn add https://bitbucket.org/adeliomgit/adeliom-lazyload-js.git
```

# Import
```
import Lazyload from './lazyload';
```

# Available options (by default)

```
Lazyload.init({
    beforeVisible: 500,
    selector: '[js-lazyload]'
});
```

# HTML

```
<div data-img="url_img_original" data-img-retina="url_img_original_retina" style="background-image:url('thumbnail')"></div>

<img src="thumbnail" data-img="url_img_original" data-img-retina="url_img_original_retina">
```