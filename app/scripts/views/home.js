/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'elements/nav'
], function ($, _, Backbone, JST, NavDOM) {
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

            $("#Home .menuHowTo").on('click', this.showAbout);
            $("#Home .menuMaps").on('click', function(){ $(NavDOM.menuPlat).click(); });
            $("#Home .menuTabs").on('click', function(){ $(NavDOM.menuTab).click(); });
            $("#Home .menuWords").on('click', function(){ $(NavDOM.menuWord).click(); });
            $("#Home .menuScales").on('click', function(){ $(NavDOM.menuScale).click(); });
            $("#Home .menuPrimers").on('click', function(){ $(NavDOM.menuPrimer).click(); });

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
