/*global define*/

define([
    'underscore',
    'backbone',
    'models/plat'
], function (_, Backbone, PlatModel) {
    'use strict';

    var TabModelCollection = Backbone.Collection.extend({
        model: TabModel
    });

    return TabModelCollection;
});
