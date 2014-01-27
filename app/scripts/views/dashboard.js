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

        template: JST['app/scripts/templates/dashboard.ejs'],

        initialize: function(){

            // render on load
            this.render();

            // hack : change to load plats from local storage
            var plat_view = new PlatView();

        },

        render: function(){

            // Add to main
            $('#Main').append(this.template());

            // register other behaviors
            $("#Tabs").sortable({
                containerSelector:'#Tabs',
                itemSelector:'div.tab',
                handle:'image',
                placeholder: '<div class="tab placeholder"/>'
            });

            // register other behaviors
            $("#Plats").sortable({
                containerSelector:'#Plats',
                itemSelector:'div.plat',
                placeholder: '<div class="plat placeholder"/>'
            });

        }

    });

    return DashboardView;
});
