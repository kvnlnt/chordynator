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
            Backbone.pubSub.on("plot:clicked", this.updateTabFinderText, this);
            Backbone.pubSub.on("plot:clicked", this.tabHint, this);

        },

        events: function() {

            // events container
            var e = {};

            // dynamically named events
            e['click ' + DOM.menuComp] = 'showSubNav';
            e['click ' + DOM.menuPlat] = 'showSubNav';
            e['click ' + DOM.menuTab]  = 'showSubNav';
            e['click ' + DOM.platsKey] = 'addPlat';
            e['click ' + DOM.tabAdd]   = 'addTab';
            e['focus ' + DOM.tabFind]  = 'tabHint';
            e['keyup ' + DOM.tabFind]  = 'tabHint';
            e['click ' + DOM.tabHints] = 'tabHintClick'

            // return object
            return e;

        },

        // SUBNAV

        showSubNav:function(e){

            var item  = $(e.target).attr('item');
            var items = [DOM.menuComp, DOM.menuPlat, DOM.menuTab, DOM.comps, DOM.plats, DOM.tabs];

            function hideAllExcept(els){
                items.filter(function(item){ 
                    if(els.indexOf(item) < 0) $(item).removeClass('showing'); 
                });
            }

            switch (item)
            {
                case 'comp':
                    $(DOM.menuComp).toggleClass('showing');
                    $(DOM.comps).toggleClass('showing');
                    hideAllExcept([DOM.menuComp, DOM.comps]);
                    break;
                case 'plat':
                    $(DOM.menuPlat).toggleClass('showing');
                    $(DOM.plats).toggleClass('showing');
                    hideAllExcept([DOM.menuPlat, DOM.plats]);
                    break;
                case 'tab':
                    $(DOM.menuTab).toggleClass('showing');
                    $(DOM.tabs).toggleClass('showing');
                    hideAllExcept([DOM.menuTab, DOM.tabs]);
                    break;
            }

            // if target is showing, hide
            // else, show and
        },

        // TABS
        tabHint:function(){

            var text  = $(DOM.tabFind).val();

            if(text.length) {

                var jtab  = new jTabModel(text);
                var hints = [];

                // loop keys
                for(var key in jtab.baseChords){
                    var isLength  = key.length == text.length + 1;
                    var isSimilar = key.substring(0, text.length) == text; 
                    if(isLength && isSimilar) hints.push(key);
                }

                // remove hints
                $(DOM.tabHints).remove();

                // prepend onto tab subnav
                _.each(hints, function(hint, i){
                    var li = '<li class="hint"><a>'+hint+'</a></li>';
                    if(i <= 3) $(DOM.tabItems).append(li);
                });

            }
            
        },

        tabHintClick:function(e){

            // get this hints text
            var chord = $(e.target).text();

            // assign it to the tabfinder
            $(DOM.tabFind).val(chord);
            
        },

        // updates tab finder text on plot:clicked event usually
        updateTabFinderText:function(plot){
            var chord = (plot.chord.note + plot.chord.type).replace('M','');
            $(DOM.tabFind).val(chord);
            return chord;
        },

        // add tab to dashboard
        addTab:function(e){
            var name = $(DOM.tabFind).val().trim();
            var chord = new jTabModel(name);
            console.log(chord);
        },

        // PLATS

        // add plat to dashboard, or remove it if it already exists
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

        // create a new plat
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

        // remove plat by key
        removePlat:function(key){

            // get model by id
            var id    = 'plat'+key;
            var model = this.platModelCollection.get(id);
                this.platModelCollection.remove(model);

            // broadcast for localized garbage collection
            Backbone.pubSub.trigger('plat:destroy', id); 
            
        },

        // render the nav
        render: function(){
            var key = new KeyModel();
            this.$el.html( this.template({ keys:key.get('notation').roots }) );
            $('#Main').append(this.$el);
        }

    });

    return NavView;

});
