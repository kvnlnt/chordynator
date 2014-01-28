/*global define*/

define([
    'jquery',
    'backbone',
    'views/nav',
    'views/dashboard',
    'views/home'
], function ($, Backbone, NavView, DashboardView, HomeView) {
    'use strict';

    var MainRouter = Backbone.Router.extend({
        
        routes: {
            "" : "main"
        },

        main:function(){
            var nav = new NavView();
            var dashboard = new DashboardView();
            var home = new HomeView();
        }

    });

    return MainRouter;
});
