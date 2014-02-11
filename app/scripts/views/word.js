/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var WordView = Backbone.View.extend({

        template: JST['app/scripts/templates/word.ejs'],

        initialize:function(){

            // pubs
            Backbone.pubSub.on("word:rhymes", this.rerender, this);

        },

        events: function() {

            // events container
            var e = {};

            // return object
            return e;

        },

        rerender:function(){

            // get template
            var template = this.template({ 
                rhymes:this.model.get('rhymes'), 
                idioms:this.model.get('idioms'), 
                related_words:this.model.get('related_words'), 
                definitions:this.model.get('definitions') 
            });

            // assign to el
            this.setElement(template);

            // attach plat template and plat to DOM
            $('#Words').html(template);

        },

        close:function(id){

            // delete it's model
            delete this.model;

            // remove this view
            this.remove();

        }

    });

    return WordView;
});
