/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var WordView = Backbone.View.extend({

        template: JST['app/scripts/templates/home.ejs'],

        initialize:function(){

            // render
            this.render();

        },

        events: function() {

            // events container
            var e = {};

            e['click #Home .menu'] = 'showAbout';

            $("#Home .menu").on('click', this.showAbout);

            // return object
            return e;

        },

        showAbout:function(){

            $("#Home .about").toggleClass('showing');

        },


        render:function(){

            // get template
            var template = this.template();

            // assign to el
            this.setElement($(template));

            // attach plat template and plat to DOM
            $('#Home').html(template);

        },

        close:function(id){

            // remove this view
            this.remove();

        }

    });

    return WordView;
});
