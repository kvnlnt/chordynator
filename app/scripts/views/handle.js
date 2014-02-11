/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/svg'
], function ($, _, Backbone, SVGview) {
    'use strict';

    var PlatHandle = SVGview.extend({
        
        tagName:'image',
        attributes:{ width:15, height:15, x:5, y:5, class:"move", 'xlink:href':'images/handle.svg' },

        initialize:function(){

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

    return PlatHandle;
});
