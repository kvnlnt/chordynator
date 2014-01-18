/*global define*/

define([
    'underscore',
    'backbone',
    'models/plot'
], function (_, Backbone, PlotModel) {
    'use strict';

    var platPlotsCollection = Backbone.Collection.extend({
        model: PlotModel
    });

    return platPlotsCollection;
});
