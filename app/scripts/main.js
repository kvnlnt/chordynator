/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [ 'underscore', 'jquery', 'energize' ],
            exports: 'Backbone'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        energize:'../bower_components/energize.js/energize',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore'
    }
});

require([
    'underscore',
    'backbone',
    'routes/main'
], function (_, Backbone, Router) {

    // KML
    // if(window.APP === undefined) window.APP = { views:[], viewCollections:[], models:[], modelCollections:[] };

    // register pubSub mediator
    Backbone.pubSub = _.extend({}, Backbone.Events);

    // register router
    var router = new Router();

    // start app browser history
    Backbone.history.start();

});
