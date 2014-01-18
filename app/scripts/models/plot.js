/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var PlotModel = Backbone.Model.extend({

        defaults: {
            active:false,
            class:'plot'
        }, 

        intialize:function(){

            // model change listeners
            this.model.active.on("change", this.activeChange);

        },

        activeChange:function(){

            console.log('rerender plot');

        }

    });

    return PlotModel;
});
