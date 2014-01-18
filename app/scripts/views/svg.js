/*global define*/

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';

    var SVG = Backbone.View.extend({

      nameSpace: "http://www.w3.org/2000/svg",
      _ensureElement: function() {

         if (!this.el) {

            // get attributes
            var attrs = _.extend({}, _.result(this, 'attributes'));
            // recreate element
            var el = window.document.createElementNS(_.result(this, 'nameSpace'), _.result(this, 'tagName'));
            // reattach attributes within new namespace
            _.each(attrs, function(value, key){ el.setAttributeNS(null, key, value); });
            // reset element
            this.setElement(el, true);

         } else {
            this.setElement(_.result(this, 'el'), false);
         }

      }
   });

    return SVG;
});


