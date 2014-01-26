/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [ 'underscore', 'jquery', 'jquery_sortable', 'energize' ],
            exports: 'Backbone'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        jquery_sortable:'../bower_components/jquery-sortable/jquery-sortable',
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

    // register pubSub mediator
    Backbone.pubSub = _.extend({}, Backbone.Events);

    // register router
    var router = new Router();

    // start app browser history
    Backbone.history.start();

});
