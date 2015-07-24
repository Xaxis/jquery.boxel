# jquery.boxel

Version 1.0.0

## Summary

A jQuery plugin for positioning elements relative to other elements.

jQuery.boxel is highly useful for positioning pop up message boxes among many other things.

## Features

* Shortcut position indicators (`tl`,`br`, etc...)
* Outer and inner positioning 
* Offset margin specification

## Author

Wil Neeley ( [@wilneeley](http://twitter.com/wilneeley) / [github.com](https://github.com/Xaxis) )

## Usage

Include `jquery.boxel.min.js` after jQuery.

### Position Elements

```css
#rel {
    width: 400px;
    height: 260px;
}
#box {
    max-width: 200px;
    border: 1px dashed black;
    position: absolute;
}
```

```html
<button id="rel">relative element</button>
<div id="box">message box</div>
```

```javascript
    // Position #box relative to #rel element
    $('#box').boxel({

        // Location box is positioned
        pos: 'tl',

        // Element box is positioned relative to
        rel: $('#rel'),

        // Positioned inside or outside relative element
        inner: false,

        // Y offset margin
        offy: 0,

        // X offset margin
        offx: 0,

        // Overall offset margin (overrides y/x when specified)
        offset: 0
    });
```

The preceding code will position the absolutely positioned `#box` element at the outer top left corner of the
`#rel` element. Alternatively you could position `#elm` in the inner top left corner by setting the `inner`
property to `true`.
 
Positioning options are `top`, `top-right`, `right`, `bottom-right`, `bottom`, `bottom-left`, `left`, and `top-left`.
You can alternately use the positioning strings `t`, `tr`, `r`, `br`, `b`, `bl`, `l`, or `tl`.

## Examples

See `test/test.html`.

## Changelog

### Version 1.0.0

* initial release
