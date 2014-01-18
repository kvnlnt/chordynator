/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/svg'
], function ($, _, Backbone, SVGview) {
    'use strict';

    var PlotBgView = SVGview.extend({
        
        tagName:'rect',
        attributes:{ width:15, height:15 },

        initialize:function(){
            this.render();
        },

        render:function(){
            return this;
        }

    });

    return PlotBgView;
});
