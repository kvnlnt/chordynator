/*global define*/

define(
  [
    "jquery",
    "underscore",
    "backbone",
    "templates",
    "elements/nav",
    "views/plat",
    "models/plat",
    "models/plats",
    "views/tab",
    "models/tab",
    "views/word",
    "models/word",
    "views/primer",
    "models/primer",
    "views/scale",
    "models/scale",
    "models/key",
    "models/jtab"
  ],
  function(
    $,
    _,
    Backbone,
    JST,
    DOM,
    PlatView,
    PlatModel,
    PlatModelCollection,
    TabView,
    TabModel,
    WordView,
    WordModel,
    PrimerView,
    PrimerModel,
    ScaleView,
    ScaleModel,
    KeyModel,
    jTabModel
  ) {
    "use strict";

    var NavView = Backbone.View.extend({
      tagName: "nav",
      template: JST["app/scripts/templates/nav.ejs"],
      attributes: { id: "Nav" },

      initialize: function() {
        // add collection
        this.platModelCollection = new PlatModelCollection();

        // render nav
        this.render();

        // register subs
        Backbone.pubSub.on("plot:clicked", this.tabFinderTextUpdate, this);
        Backbone.pubSub.on("plot:clicked", this.tabHint, this);
      },

      events: function() {
        // events container
        var e = {};
        var that = this;

        // dynamically named events
        e["click " + DOM.menuHome] = "subNav";

        e["click " + DOM.menuWord] = "subNav";
        e["click " + DOM.wordAdd] = "wordFind";

        e["click " + DOM.menuPlat] = "subNav";
        e["click " + DOM.platsKey] = "platAdd";
        e["click " + DOM.platNext] = "platShowNextKeys";

        e["click " + DOM.menuTab] = "subNav";
        e["click " + DOM.tabAdd] = "tabAdd";
        e["input " + DOM.tabFind] = "tabHint";
        e["click " + DOM.tabHints] = "tabHintClick";

        e["click " + DOM.menuScale] = "subNav";
        e["click " + DOM.scaleAdd] = "scaleAdd";

        e["click " + DOM.menuPrimer] = function(e) {
          that.subNav(e);
          that.primersLoad(e);
        };

        // return object
        return e;
      },

      // SUBNAV

      subNav: function(e) {
        var item = $(e.target).attr("item");
        var items = [
          DOM.menuHome,
          DOM.Home,
          DOM.menuWord,
          DOM.Words,
          DOM.words,
          DOM.menuPlat,
          DOM.Plats,
          DOM.plats,
          DOM.menuTab,
          DOM.Tabs,
          DOM.tabs,
          DOM.menuScale,
          DOM.Scales,
          DOM.scales,
          DOM.menuPrimer,
          DOM.Primers,
          DOM.primers
        ];

        // GA: log page views
        ga("send", "event", "page", "view", "page", item);

        function hideAllExcept(els) {
          items.filter(function(item) {
            if (els.indexOf(item) < 0) $(item).removeClass("showing");
          });
        }

        switch (item) {
          case "home":
            $(DOM.menuHome).toggleClass("showing");
            $(DOM.Home).toggleClass("showing");
            hideAllExcept([DOM.menuHome, DOM.Home, DOM.home]);
            break;
          case "words":
            $(DOM.menuWord).toggleClass("showing");
            $(DOM.Words).toggleClass("showing");
            $(DOM.words).toggleClass("showing");
            if ($(DOM.menuWord).hasClass("showing"))
              $(DOM.wordFind).trigger("focus");
            hideAllExcept([DOM.menuWord, DOM.Words, DOM.words]);
            break;
          case "plats":
            $(DOM.menuPlat).toggleClass("showing");
            $(DOM.plats).toggleClass("showing");
            $(DOM.Plats).toggleClass("showing");
            hideAllExcept([DOM.menuPlat, DOM.plats, DOM.Plats]);
            break;
          case "tabs":
            $(DOM.menuTab).toggleClass("showing");
            $(DOM.tabs).toggleClass("showing");
            $(DOM.Tabs).toggleClass("showing");
            if ($(DOM.menuTab).hasClass("showing"))
              $(DOM.tabFind).trigger("focus");
            hideAllExcept([DOM.menuTab, DOM.tabs, DOM.Tabs]);
            break;
          case "scales":
            $(DOM.menuScale).toggleClass("showing");
            $(DOM.scales).toggleClass("showing");
            $(DOM.Scales).toggleClass("showing");
            hideAllExcept([DOM.menuScale, DOM.scales, DOM.Scales]);
            break;
          case "primers":
            $(DOM.menuPrimer).toggleClass("showing");
            $(DOM.primers).toggleClass("showing");
            $(DOM.Primers).toggleClass("showing");
            hideAllExcept([DOM.menuPrimer, DOM.primers, DOM.Primers]);
            break;
        }
      },

      // WORDS

      wordFind: function(e) {
        var word = $(DOM.wordFind)
          .val()
          .toLowerCase();
        if (!word.length) return false;
        var model = new WordModel({ word: word });
        var view = new WordView({ model: model });
      },

      wordFindFocus: function(e) {
        $(DOM.wordFind).trigger("click");
      },

      // TABS

      tabFindFormatter: function(e) {
        // cap first string
        var value = $(DOM.tabFind).val();

        // only do this business if it's the first letter
        if (value.length <= 0) {
          // get character entered
          var key = String.fromCharCode(e.keyCode);

          // reset value
          $(DOM.tabFind).val(key);

          // prevent default
          e.preventDefault();
        } else {
          var capitalized = value.charAt(0).toUpperCase() + value.slice(1);
          $(DOM.tabFind).val(capitalized);
        }
      },

      tabHint: function(e) {
        // now do internal formatting
        var text = $(DOM.tabFind)
          .val()
          .replace("*", "dim");

        // uppercase first letter
        var lowerCase = new RegExp("[a-z]");
        if (text.charAt(0).match(lowerCase)) {
          text = text.charAt(0).toUpperCase() + text.slice(1);
          $(DOM.tabFind).val(text);
        }

        if (text.length) {
          var jtab = new jTabModel(text);
          var hints = [];

          // loop keys
          for (var key in jtab.baseChords) {
            var isLength = key.length == text.length + 1;
            var isSimilar = key.substring(0, text.length) == text;
            var isChord = key === text;
            if ((isLength && isSimilar) || isChord) hints.push(key);
          }

          // remove hints
          $(DOM.tabHints).remove();

          // prepend onto tab subnav
          _.each(hints, function(hint, i) {
            var li = '<li class="hint"><a>' + hint + "</a></li>";
            if (i <= 3) $(DOM.tabItems).append(li);
          });
        }
      },

      tabHintClick: function(e) {
        // get this hints text
        var chord = $(e.target).text();

        // assign it to the tabfinder
        $(DOM.tabFind).val(chord);

        // rerun tabhint after
        $(DOM.tabAdd).trigger("click");

        // change focus back to window
        $(window).focus();
      },

      // updates tab finder text on plot:clicked event usually
      tabFinderTextUpdate: function(plot) {
        // get a copy of the key model so we can use some of it' normalization features
        var key = new KeyModel();

        // find the chord passed by the event object
        var chord = (plot.chord.note + plot.chord.type).replace("M", "");

        // normalize the chord string
        var chord = key.normalize(chord);

        // update the text input box with the chord string
        $(DOM.tabFind).val(chord);

        // return chord
        return chord;
      },

      // add tab to dashboard
      tabAdd: function(e) {
        // get chord name
        // and more
        var name = $(DOM.tabFind)
          .val()
          .trim()
          .replace("*", "dim");
        // console.log(name);

        // get variations up to fret 19
        var variations = [];

        for (var i = 1; i < 20; i++) {
          var chord = new jTabModel(name + ":" + i); // get chord by NAME:CAGED_INDEX
          var isFrettable = chord.chordArray[0] <= 19; // is this chord still on the fretboard
          if (isFrettable) variations.push(chord); // if on fretboard, collect it
          if (!isFrettable) break; // quit if frets are off the board
        }

        // check if any chords where found
        if (variations.length) {
          // create tab model
          var model = new TabModel({ variations: variations, chord: name });

          // create tab
          var tab = new TabView({ model: model });

          // pub modification
          Backbone.pubSub.trigger("tab:modified", e.currentTarget);
        } else {
          var msg = {
            title: "Whoops!",
            message: "The chord you entered was not found.",
            timeout: 2000
          };
          Backbone.pubSub.trigger("message:showTemporary", msg);
        }
      },

      // PLATS

      // add plat to dashboard, or remove it if it already exists
      platAdd: function(e) {
        // add or remove?
        var mode = $(e.currentTarget)
          .parent()
          .hasClass("showing")
          ? "remove"
          : "add";
        var key = $(e.currentTarget).data("key");

        switch (mode) {
          case "add":
            this.platCreate(key);
            break;
          case "remove":
            this.platRemove(key);
            break;
        }

        $(e.currentTarget)
          .parent()
          .toggleClass("showing");

        // pub modification
        Backbone.pubSub.trigger("plat:modified", e.currentTarget);
      },

      // create a new plat
      platCreate: function(key) {
        // create unique id
        var id = "plat" + key.replace("#", "_sharp");

        // create unique model and add to collection
        var model = new PlatModel({ id: id, key: key });
        this.platModelCollection.add(model);

        // create unique view and
        var view = new PlatView({ id: id, model: model });

        // render plat view
        view.render();
      },

      // remove plat by key
      platRemove: function(key) {
        // get model by id
        var id = "plat" + key.replace("#", "_sharp");
        var model = this.platModelCollection.get(id);
        this.platModelCollection.remove(model);

        // broadcast for localized garbage collection
        Backbone.pubSub.trigger("plat:destroy", id);
      },

      // toggle plat key nav lists backwards
      platShowNextKeys: function(e) {
        // get lists
        var lists = $(".plats .keys");

        // get the first element
        var first_li = $(lists[0]);

        // get last
        var last_li = $(lists[2]);

        // send first element to end
        first_li.insertAfter(last_li);
      },

      // SCALES

      scaleAdd: function() {
        // get key and scale
        var key = $("#ScaleKey").val();
        var scale = $("#ScaleType").val();

        // if valid selection
        if (key != "key" && scale != "scale") {
          var model = new ScaleModel({ key: key, scale: scale });
          var view = new ScaleView({ model: model });
        }
      },

      // PRIMERS

      primersLoad: function() {
        var model = new PrimerModel();
        var view = new PrimerView({ model: model });
      },

      // render the nav
      render: function() {
        // create key model
        var key = new KeyModel();

        // attach notes
        this.$el.html(this.template({ keys: key.get("roots") }));

        // add to main template
        $("#Main").append(this.$el);
      }
    });

    return NavView;
  }
);
