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

        initialize:function(){

            // sub
            Backbone.pubSub.on('plat:destroy', this.close, this);

        },

        close:function(id){
            
            // remove this view
            if(this.model.plat == id) this.remove();

        },

        render:function(){
            this.$el.append(this.model.type);
            return this;
        }

    });

    return PlotChordType;
});
