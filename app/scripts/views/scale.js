/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var ScaleView = Backbone.View.extend({

        template: JST['app/scripts/templates/scale.ejs'],

        initialize:function(){

            // render by default
            this.render();

        },

        events:function(){

            var e = {};

            e['click svg > [button="remove"]'] = 'close';

            return e;

        },

        render:function(){

            // get template
            var template  = this.template({ 
                                key:this.model.get('key'),
                                title:this.model.get('formulas')[this.model.get('scale')].name,
                                scale:this.model.get('scale'),
                                fretboard:this.model.get('fretboard') 
                            });

            // assign to el
            this.setElement(template);

            // attach to DOM
            $('#Scales').prepend(this.el);

        },

        close:function(id){

            // delete it's model
            delete this.model;

            // remove this view
            this.remove();

        }


    });

    return ScaleView;
});
