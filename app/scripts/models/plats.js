/*global define*/

define([
    'underscore',
    'backbone',
    'models/plat'
], function (_, Backbone, PlatModel) {
    'use strict';

    var PlatModelCollection = Backbone.Collection.extend({
        model: PlatModel
    });

    return PlatModelCollection;
});
