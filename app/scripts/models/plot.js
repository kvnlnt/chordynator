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
        }

    });

    return PlotModel;
});
