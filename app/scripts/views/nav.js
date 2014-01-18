/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/plat',
    'models/plat',
    'collections/plat_plots',
    'models/key'
], function ($, _, Backbone, JST, PlatView, PlatModel, PlatPlotsCollection, KeyModel) {

    'use strict';

    var NavView = Backbone.View.extend({
        
        tagName: "nav",
        template: JST['app/scripts/templates/nav.ejs'],
        attributes: { 'id':'Nav' },

        events: function() {
            var e = { 
                'click #nav_add_plat' : 'showKeySelector',
                'click #keys .key' : 'keySelected'
            };
            return e;
        },

        initialize: function(){
            this.render();
        },

        showKeySelector: function(e){
            $("#keys").toggleClass('showing');
        },

        keySelected:function(e){
            var key = $(e.currentTarget).data('key');
            this.addPlat(key);
            $("#nav_add_plat").click();
        },

        addPlat:function(key){
            var model      = new PlatModel({ id:'plat'+$('.plat').length, key:key });
            var collection = new PlatPlotsCollection();
            var view       = new PlatView({ model:model, collection:collection });
            view.render();
        },

        render: function(){
            var key = new KeyModel();
            this.$el.html( this.template({ keys:key.get('notation').roots }) );
            $('#Main').append(this.$el);
        }

    });

    return NavView;

});
