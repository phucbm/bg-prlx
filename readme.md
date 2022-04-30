# bg-prlx

[![release](https://badgen.net/github/release/phucbm/bg-prlx/?cache=600)](https://github.com/phucbm/bg-prlx/releases/latest)
[![license](https://badgen.net/github/license/phucbm/bg-prlx/)](https://github.com/phucbm/bg-prlx/blob/main/LICENSE)

> Create parallax effect for inline `background-image` or `object-fit:cover`.

## Install

```sh
npm i bg-prlx
```

## Usage

Simply add attribute `data-parallax` to your HTML.

### Setup HTML

With inline `background-image`:

```html

<div data-parallax
     style="background-image:url(https://picsum.photos/1920/1280); background-size:cover; aspect-ratio:1920/800; width:100%;">
    <!-- your extra content here -->
</div>
```

Or with `<img>`:

```html

<div data-parallax>
    <img src="https://picsum.photos/1920/1280" alt="Photo" style="object-fit:cover; aspect-ratio:1920/800; width:100%;">
</div>
```

> Note: In order to have parallax effect, the block that contains the image must have a smaller height
> than the real image's height. In the example above, the image size is 1920x1280, while the block size has ratio of 1920x800.

### Run script

```js
import backgroundParallax from "./index.js";

backgroundParallax();
```

## API

### backgroundParallax(elements?)

#### elements

Type: `DOM element`

Default value is `document.querySelectorAll("[data-parallax]:not(.parallax-enabled)")`.

## License

[MIT License](https://github.com/phucbm/bg-prlx/blob/main/LICENSE)

Copyright (c) 2022 Minh-Phuc Bui
