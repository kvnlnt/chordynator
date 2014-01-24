/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/svg',
    'templates'
], function ($, _, Backbone, SVGview, JST) {
    'use strict';

    var TabView = Backbone.View.extend({

        template: JST['app/scripts/templates/tab.ejs'],

        initialize:function(){

            // create collection
            // find CAGED fingerings
            // create models for each fingering
            // register subs
                // render

            this.render();

        },

        render:function(){

            // get fingering
            var fingering = { id:1, chord:'C' };

            // get template
            var template  = $(this.template(fingering));

            // attach plat template and plat to DOM
            $('#Dashboard').html(template);
        },

        close:function(){

        },

    });

    return TabView;
});
