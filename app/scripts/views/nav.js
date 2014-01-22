/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'elements/nav',
    'views/plat',
    'models/plat',
    'models/plats',
    'models/key',
    'models/jtab'
], function ($, _, Backbone, JST, DOM, PlatView, PlatModel, PlatModelCollection, KeyModel, jTabModel) {

    'use strict';

    var NavView = Backbone.View.extend({
        
        tagName: "nav",
        template: JST['app/scripts/templates/nav.ejs'],
        attributes: { 'id':'Nav' },

        initialize: function(){

            // add collection
            this.platModelCollection = new PlatModelCollection();

            // render nav
            this.render();

            // register subs
            Backbone.pubSub.on("plot:clicked", this.updateTabChordText, this);

        },

        events: function() {

            // events container
            var e = {};

            // dynamically named events
            e['click ' + DOM.menuPlat] = 'showPlatSelector';
            e['click ' + DOM.menuTab]  = 'showTabSelector';
            e['click ' + DOM.platsKey] = 'addPlat';
            e['click ' + DOM.tabAdd]   = 'addTab';

            // return object
            return e;

        },

        // TABS
        updateTabChordText:function(plot){
            var chord = (plot.chord.note + plot.chord.type).replace('*','dim');
            $("#tabChordText").val(chord);
            return chord;
        },

        showTabSelector:function(e){
            var text = $(DOM.menuTab).html() == '- Tab' ? '+ Tab' : '- Tab';
            $(DOM.menuTab).html(text);
            $(DOM.tabs).toggleClass('showing');
        },

        addTab:function(e){
            var name = $(DOM.tabFind).val().trim();
            var chord = new jTabModel(name);
            console.log(chord);
        },

        // PLATS
        showPlatSelector: function(e){
            var text = $(DOM.menuPlat).html() == '- Map' ? '+ Map' : '- Map';
            $(DOM.menuPlat).html(text);
            $(DOM.plats).toggleClass('showing');
        },

        addPlat:function(e){

            // add or remove?
            var mode = $(e.currentTarget).parent().hasClass('showing') ? 'remove' : 'add';
            var key  = $(e.currentTarget).data('key');

            switch(mode)
            {
                case 'add':
                    this.createPlat(key);
                    break;
                case 'remove':
                    this.removePlat(key);
                    break;
            }

            $(e.currentTarget).parent().toggleClass('showing');

        },

        createPlat:function(key){

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
