/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var TabModel = Backbone.Model.extend({
        defaults: {
            variation:0
        }
    });

    return TabModel;
});
