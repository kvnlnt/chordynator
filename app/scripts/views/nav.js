/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/plat',
    'models/plat',
    'models/plats',
    'models/key',
    'models/jtab'
], function ($, _, Backbone, JST, PlatView, PlatModel, PlatModelCollection, KeyModel, jTabModel) {

    'use strict';

    var NavView = Backbone.View.extend({
        
        tagName: "nav",
        template: JST['app/scripts/templates/nav.ejs'],
        attributes: { 'id':'Nav' },

        initialize: function(){
            this.platModelCollection = new PlatModelCollection();
            this.render();
        },

        events: function() {
            var e = { 
                'click #nav_add_plat' : 'showKeySelector',
                'click #keys .key' : 'keySelected',
                'click #nav_add_tab' : 'showTabSelector',
                'click #tabs #tabChordFindButton': 'addTab'
            };
            return e;
        },

        addTab:function(e){
            var name = $("#tabs #tabChordText").val().trim();
            var chord = new jTabModel(name);
            console.log(chord);
        },

        showTabSelector:function(e){
            var text = $("#nav_add_tab").html() == '- Tab' ? '+ Tab' : '- Tab';
            $("#nav_add_tab").html(text);
            $("#nav_add_tab").parent().toggleClass('showing');
            $("#tabs").toggleClass('showing');
        },

        showKeySelector: function(e){
            var text = $("#nav_add_plat").html() == '- Map' ? '+ Map' : '- Map';
            $("#nav_add_plat").html(text);
            $("#nav_add_plat").parent().toggleClass('showing');
            $("#keys").toggleClass('showing');
        },

        keySelected:function(e){

            // add or remove?
            var mode = $(e.currentTarget).parent().hasClass('showing') ? 'remove' : 'add';
            var key  = $(e.currentTarget).data('key');

            switch(mode)
            {
                case 'add':
                    this.addPlat(key);
                    break;
                case 'remove':
                    this.removePlat(key);
                    break;
            }

            $(e.currentTarget).parent().toggleClass('showing');

        },

        addPlat:function(key){

            // create unique id
            var id = 'plat'+key;

            // create unique model and add to collection
            var model = new PlatModel({ id:id, key:key });
                this.platModelCollection.add(model);

            // create unique view and
            var view = new PlatView({ id:id, model:model });

            // render plat view
            view.render();

        },

        removePlat:function(key){

            // get model by id
            var id    = 'plat'+key;
            var model = this.platModelCollection.get(id);
                this.platModelCollection.remove(model);

            // broadcast for localized garbage collection
            Backbone.pubSub.trigger('plat:destroy', id); 
            
        },

        render: function(){
            var key = new KeyModel();
            this.$el.html( this.template({ keys:key.get('notation').roots }) );
            $('#Main').append(this.$el);
        }

    });

    return NavView;

});
