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

        initialize:function(){

            // sub
            Backbone.pubSub.on('plat:destroy', this.close, this);

        },

        close:function(id){
            
            // remove this view
            if(this.model.plat == id) this.remove();

        },

        render:function(){
            this.$el.append(this.model.note);
            return this;
        }

    });

    return PlotChordNote;
});
