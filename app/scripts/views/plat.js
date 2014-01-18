/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'models/plat',
    'views/plot/plot',
    'models/plot',
    'views/svg'
], function ($, _, Backbone, JST, PlatModel, PlotView, PlotModel, SVGview) {
    'use strict';

    var PlatView = SVGview.extend({

      tagName: 'svg',
      attributes: { viewBox:'0 0 100 100', version:'1.1' },
      template: JST['app/scripts/templates/plat.ejs'],

      render: function(){

        // get plat wrapper
        var template = $(this.template({ id:this.model.id }));

        // attach plat template and plat to DOM
        $('#Dashboard').prepend(template.html(this.$el));

        // attach plots
        this.renderPlots();

        // preselect key plot
        this.$el.find('g[plot="5"]').click();   

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
