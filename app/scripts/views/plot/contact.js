/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/svg'
], function ($, _, Backbone, SVGview) {
    'use strict';

    var PlotContact = SVGview.extend({
        
        tagName:'ellipse',

        initialize:function(){

            // sub
            Backbone.pubSub.on('plat:destroy', this.close, this);

        },

        close:function(id){
            
            // remove this view
            if(this.model.plat == id) this.remove();

        },

        attributes:function(){

            var attrs = {

                pole:this.model.pole,
                class:this.model.class,
                rx:1, 
                ry:1,
                cx:this.model.cx,
                cy:this.model.cy

            };

            return attrs;

        },

        render:function(){
            
            this.attributes.cx = this.model.cx;
            this.attributes.cy = this.model.cy;

            return this;
        }

    });

    return PlotContact;
});