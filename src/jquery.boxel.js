/**
 * jQuery.boxel
 *
 * (a) Wil Neeley
 * (c) Code may be freely distributed under the MIT license.
 */
;(function ( $, window, document, undefined ) {

  "use strict";

  var
    plugin_name   = 'boxel',
    defaults      = {
      rel:        null,
      pos:        'top',
      inner:      false,
      offy:       0,
      offx:       0,
      offset:     0
    };

  // Plugin constructor
  function Plugin( element, options ) {
    this._name = plugin_name;
    this._defaults = defaults;
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this.init();
  }

  // Extend plugin prototype
  $.extend(Plugin.prototype, {

    // Initialization method
    init: function() {
      var coords = this.calculatePosition();
      this.positionElement(coords.y, coords.x);
    },

    /**
     * Returns the positioning coordinates where target element should be positioned
     * relative to the 'rel_elm' element.
     */
    calculatePosition: function() {
      if (this.options.rel) {
        var
          pos             = this.options.pos,
          rel_elm         = $(this.options.rel),
          pos_elm         = $(this.element),
          offy            = this.options.offset ? this.options.offset : this.options.offy,
          offx            = this.options.offset ? this.options.offset : this.options.offx,
          r_e_h           = rel_elm.outerHeight(),
          r_e_w           = rel_elm.outerWidth(),
          r_e_y           = rel_elm.offset().top,
          r_e_x           = rel_elm.offset().left,
          p_e_h           = pos_elm.outerHeight(),
          p_e_w           = pos_elm.outerWidth(),
          y               = 0,
          x               = 0,
          calcPos         = {
            middleY: function() {
              return r_e_y + (r_e_h / 2) - (p_e_h / 2) + offy;
            },
            middleX: function() {
              return r_e_x + (r_e_w / 2) - (p_e_w / 2) + offx;
            },
            top: function() {
              return r_e_y - p_e_h - offy;
            },
            left: function() {
              return r_e_x - p_e_w - offx;
            },
            topInner: function() {
              return r_e_y + offy;
            },
            leftInner: function() {
              return r_e_x + offx;
            },
            rightInner: function() {
              return r_e_x + r_e_w - p_e_w - offx;
            },
            right: function() {
              return r_e_x + r_e_w + offx;
            },
            bottom: function() {
              return r_e_y + r_e_h + offy;
            },
            bottomInner: function() {
              return r_e_x + r_e_h - p_e_h - offy;
            }
          };

        // Determine positioning
        switch (true) {
          case (pos == 't' || pos == 'top') :
            this.innerOrOuter({
              inner: function () {
                y = calcPos.topInner();
                x = calcPos.middleX();
              },
              outer: function () {
                y = calcPos.top();
                x = calcPos.middleX();
              }
            });
            break;

          case (pos == 'r' || pos == 'right') :
            this.innerOrOuter({
              inner: function () {
                y = calcPos.middleY();
                x = calcPos.rightInner();
              },
              outer: function () {
                y = calcPos.middleY();
                x = calcPos.right();
              }
            });
            break;

          case (pos == 'b' || pos == 'bottom') :
            this.innerOrOuter({
              inner: function () {
                y = calcPos.bottomInner();
                x = calcPos.middleX();
              },
              outer: function () {
                y = calcPos.bottom();
                x = calcPos.middleX();
              }
            });
            break;

          case (pos == 'l' || pos == 'left') :
            this.innerOrOuter({
              inner: function () {
                y = calcPos.middleY();
                x = calcPos.leftInner();
              },
              outer: function () {
                y = calcPos.middleY();
                x = calcPos.left();
              }
            });
            break;

          case (pos == 'tl' || pos == 'top-left') :
            this.innerOrOuter({
              inner: function () {
                y = calcPos.topInner();
                x = calcPos.leftInner();
              },
              outer: function () {
                y = calcPos.top();
                x = calcPos.left();
              }
            });
            break;

          case (pos == 'tr' || pos == 'top-right') :
            this.innerOrOuter({
              inner: function () {
                y = calcPos.topInner();
                x = calcPos.rightInner();
              },
              outer: function () {
                y = calcPos.top();
                x = calcPos.right();
              }
            });
            break;

          case (pos == 'br' || pos == 'bottom-right') :
            this.innerOrOuter({
              inner: function () {
                y = calcPos.bottomInner();
                x = calcPos.rightInner();
              },
              outer: function () {
                y = calcPos.bottom();
                x = calcPos.right();
              }
            });
            break;

          case (pos == 'bl' || pos == 'bottom-left') :
            this.innerOrOuter({
              inner: function () {
                y = calcPos.bottomInner();
                x = calcPos.leftInner();
              },
              outer: function () {
                y = calcPos.bottom();
                x = calcPos.left();
              }
            });
            break;
        }

        return {y: y, x: x};
      }
    },

    /**
     * Responsible for positioning target element.
     * @param y
     * @param x
     */
    positionElement: function(y, x) {
      $(this.element).css({top: y, left: x});
    },

    /**
     * Switch determines if target element should be positioned on the inside or outside of relative element.
     * @param side
     */
    innerOrOuter: function(side) {
      if (this.options.inner) {
        side.inner.call(this);
      } else {
        side.outer.call(this);
      }
    }
  });

  // Plugin wrapper
  $.fn[plugin_name] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + plugin_name)) {
        $.data(this, 'plugin_' + plugin_name, new Plugin( this, options ));
      }
    });
  };

})( jQuery, window, document );
