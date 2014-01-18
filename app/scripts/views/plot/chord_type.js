/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/svg'
], function ($, _, Backbone, SVGview) {
    'use strict';

    var PlotChordType = SVGview.extend({
        
        tagName:'text',
        attributes:{ class:'type', x:7.75, y:12.25 },

        render:function(){
            this.$el.append(this.model.type);
            return this;
        }

    });

    return PlotChordType;
});
