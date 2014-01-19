/*global define*/

define([
    'underscore',
    'backbone',
    'models/plot'
], function (_, Backbone, PlotModel) {
    'use strict';

    var PlotModelCollection = Backbone.Collection.extend({
        model: PlotModel
    });

    return PlotModelCollection;
});
