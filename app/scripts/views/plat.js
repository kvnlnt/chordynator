/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'models/plat',
    'views/plot/plot',
    'views/handle',
    'models/plot',
    'models/plots',
    'views/svg'
], function ($, _, Backbone, JST, PlatModel, PlotView, PlatHandleView, PlotModel, PlotsCollection, SVGview) {
    'use strict';

    var PlatView = SVGview.extend({

      tagName: 'svg',
      attributes: { viewBox:'0 0 100 100', version:'1.1' },
      template: JST['app/scripts/templates/plat.ejs'],

      initialize:function(){

        // create new collection
        this.collection = new PlotsCollection();

        // subs
        Backbone.pubSub.on('plat:destroy', this.close, this);

      },

      close:function(id){

        // remove this view
        if(this.id == id) {

          // delete it's model
          delete this.model;

          // delete collection
          delete this.collection;

          // remove this view
          this.remove();

          // remove it's container too
          $('#'+id).remove();

        }

      },

      render: function(){

        // get plat wrapper
        var template = $(this.template({ id:this.model.id, key:this.model.get('key') }));

        // attach plat template and plat to DOM
        $('#Plats').prepend(template.html(this.$el));

        // attach plots
        this.renderPlots();

        // render handle
        this.renderHandle();

        // preselect key plot
        this.$el.find('g[plot="5"]').click();   

      },

      renderHandle:function(){

        var model  = new PlotModel(); model.plat = this;
        var handle = new PlatHandleView({model:model});
        this.$el.append(handle.render().el);

      },

      renderPlots:function(){

        // get chords
        var chords = this.model.get('chords');

        // PRIMARY PLOTS

        // plotmap for primary chords
        var plotmap = this.model.get('platmap').primary;

        // attach primary plots
        for(var plot in plotmap) {

          // var get chord
          var model       = new PlotModel();
              model.id    = plotmap[plot].id;
              model.plat  = this;
              model.plot  = plotmap[plot];
              model.chord = chords.primary[plotmap[plot].chord];

          // add to platplot collection
          this.collection.add(model);

          // get plot view
          var plotview = new PlotView({model:model});

        }

        // SECONDARY PLOTS

        // plotmap for secondary chords
        var plotmap = this.model.get('platmap').secondary;

        // attach primary plots
        for(var plot in plotmap) {

          // var get chord
          var model       = new PlotModel();
              model.id    = plotmap[plot].id;
              model.plat  = this;
              model.plot  = plotmap[plot];
              model.chord = chords.secondary[plotmap[plot].chord];

          // add to platplot collection
          this.collection.add(model);

          // get plot view
          var plotview = new PlotView({model:model});

        }

      }

    });

    return PlatView;
});
