/*global define*/

define([
    'jquery',
    'backbone',
    'views/nav',
    'views/dashboard',
    'views/home',
    'views/message'
], function ($, Backbone, NavView, DashboardView, HomeView, MessageView) {
    'use strict';

    var MainRouter = Backbone.Router.extend({
        
        routes: {
            "" : "main"
        },

        main:function(){
            var nav = new NavView();
            var dashboard = new DashboardView();
            var home = new HomeView();
            var msg = new MessageView();
        }

    });

    return MainRouter;
});
