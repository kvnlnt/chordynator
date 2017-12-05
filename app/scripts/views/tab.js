/*global define*/

define(["jquery", "underscore", "backbone", "views/svg", "templates"], function(
  $,
  _,
  Backbone,
  SVGview,
  JST
) {
  "use strict";

  var TabView = Backbone.View.extend({
    template: JST["app/scripts/templates/tab.ejs"],

    initialize: function() {
      // render by default
      this.render();

      // pubs/subs
      this.model.on("change:tab", this.render, this);
    },

    events: function() {
      // events container
      var e = {};

      // dynamically named events
      // e['click'] = 'nextVariation';
      e['click svg > [button="remove"]'] = "close";

      // return object
      return e;
    },

    nextVariation: function() {
      this.model.nextVariation();
    },

    render: function() {
      // get template
      var template = this.template(this.model.get("tab"));

      // check if element already exists on page and get index
      var index = $("#Tabs .tab").index(this.$el);

      // assign to el
      this.setElement(template);

      // HACK : No element is being constructed, it's all in the template...where/when should a container be attached to the DOM? On intialize?
      // attach plat template and plat to DOM
      // if index exists, remove and paste in at index, else prepend to Tabs
      if (index >= 0) {
        var old_tab = $("#Tabs .tab").get(index); // get old tab dom element by index
        this.$el.insertAfter(old_tab); // insert new one after it
        old_tab.remove(); // remove the old tab
      } else {
        $("#Tabs").prepend(this.el);
      }
    },

    close: function(id) {
      // delete it's model
      delete this.model;

      // remove this view
      this.remove();
    }
  });

  return TabView;
});
