/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var PrimerView = Backbone.View.extend({

        template: JST['app/scripts/templates/primer.ejs'],

        initialize: function(){

            // render nav
            this.render();

        },

        events: function() {

           $(".title").on('click', function(){
                $(this).siblings('p').toggleClass('showing');
           });

        },

        render:function(){

            // get template
            var template = this.template();

            // assign to el
            this.setElement($(template));

            // attach plat template and plat to DOM
            $('#Primers').html(template);

        }


    });

    return PrimerView;
});
