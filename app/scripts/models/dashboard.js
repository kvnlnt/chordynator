/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var DashboardModel = Backbone.Model.extend({
        defaults: {
        }
    });

    return DashboardModel;
});
