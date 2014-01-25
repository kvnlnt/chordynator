/*global define*/

define([
    'jquery',
    'backbone',
    'views/nav',
    'views/dashboard'
], function ($, Backbone, NavView, DashboardView) {
    'use strict';

    var MainRouter = Backbone.Router.extend({
        
        routes: {
            "" : "main"
        },

        main:function(){
            var nav = new NavView();
            var dashboard = new DashboardView();
        }

    });

    return MainRouter;
});
