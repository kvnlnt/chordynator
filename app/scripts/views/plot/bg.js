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

            // sub
            Backbone.pubSub.on('plat:destroy', this.close, this);

        },

        close:function(id){
            
            // remove this view
            if(this.model.plat == id) this.remove();

        },

        render:function(){
            return this;
        }

    });

    return PlotBgView;
});
