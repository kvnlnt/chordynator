/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/plat'
], function ($, _, Backbone, JST, PlatView) {
    'use strict';

    var DashboardView = Backbone.View.extend({

        tagName: "div",
        attributes:{ 'id':'Dashboard', 'class':'dashboard' },

        initialize: function(){
            this.render();

            // hack : change to load plats from local storage
            var plat_view = new PlatView();

        },

        render: function(){
            $('#Main').append(this.$el);
        }

    });

    return DashboardView;
});
