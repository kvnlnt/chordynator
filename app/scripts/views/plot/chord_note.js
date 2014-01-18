/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/svg'
], function ($, _, Backbone, SVGview) {
    'use strict';

    var PlotChordNote = SVGview.extend({
        
        tagName:'text',
        attributes:{ class:'name', x:7.75, y:7.75 },

        render:function(){
            this.$el.append(this.model.note);
            return this;
        }

    });

    return PlotChordNote;
});
