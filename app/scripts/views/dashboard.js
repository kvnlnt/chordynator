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

        },

        render: function(){

            // Add to main
            $('#Main').append(this.template());

            // register other behaviors
            $("#Tabs").sortable({
                containerSelector:'#Tabs',
                itemSelector:'div.tab',
                handle:'g',
                placeholder: '<div class="tab placeholder"/>'
            });

            // register other behaviors
            $("#Plats").sortable({
                containerSelector:'#Plats',
                itemSelector:'div.plat',
                handle:'image',
                placeholder: '<div class="plat placeholder"/>'
            });

            // register other behaviors
            $("#Scales").sortable({
                containerSelector:'#Scales',
                itemSelector:'div.scale',
                handle:'g',
                placeholder: '<div class="scale placeholder"/>'
            });

        }

    });

    return DashboardView;
});
