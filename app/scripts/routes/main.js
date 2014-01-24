/*global define*/

define([
    'jquery',
    'backbone',
    'views/nav',
    'views/dashboard',
    'views/tab'
], function ($, Backbone, NavView, DashboardView, TabView) {
    'use strict';

    var MainRouter = Backbone.Router.extend({
        
        routes: {
            "" : "main"
        },

        main:function(){
            var nav = new NavView();
            var dashboard = new DashboardView();

            // tab dev
            var tab = new TabView();

            // KML : Default key shim
            //nav.addPlat('C');
        }

    });

    return MainRouter;
});
