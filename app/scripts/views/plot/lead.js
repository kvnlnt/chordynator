/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/svg'
], function ($, _, Backbone, SVGview) {
    'use strict';

    var Lead = SVGview.extend({
        
        tagName:'line',

        initialize:function(){

            this.render();

            // sub
            Backbone.pubSub.on('plat:destroy', this.close, this);

        },

        close:function(id){
            
            // remove this view
            if(this.model.plat == id) this.remove();

        },

        attributes:function(){

            var attrs = {

                x1:this.model.x1,
                y1:this.model.y1,
                x2:this.model.x2,
                y2:this.model.y2

            };

            return attrs;

        },

        render:function(){
            return this;
        }

    });

    return Lead;
});