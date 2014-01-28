/*global define*/

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';

    var SVG = Backbone.View.extend({

      nameSpaces: {
        svg:"http://www.w3.org/2000/svg",
        xlink: "http://www.w3.org/1999/xlink",
        xml:"http://www.w3.org/XML/1998/namespace"
      },

      _ensureElement: function() {

        var that = this;

        // toggle namespaces for attributes...like embedded svg images
        function getAttributeNamespace(attr){

          var ns = null;
          if(attr == 'xlink:href') ns = that.nameSpaces.xlink;
          if(attr == 'xml:space')  ns = that.nameSpaces.xml;
          return ns;

        }

        // Assign namespaces
         if (!this.el) {

            // get attributes
            var attrs = _.extend({}, _.result(this, 'attributes'));

            // recreate element
            var el = window.document.createElementNS(this.nameSpaces.svg, this.tagName);

            // reattach attributes within new namespace
            _.each(attrs, function(value, key){ el.setAttributeNS(getAttributeNamespace(key), key, value); });

            // reset element
            this.setElement(el, true);

         } else {

            this.setElement(_.result(this, 'el'), false);

         }

      }

   });

    return SVG;
});


