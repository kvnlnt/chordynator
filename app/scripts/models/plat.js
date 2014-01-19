/*global define*/

define([
    'underscore',
    'backbone',
    'models/key',
    'singletons/platmap'
], function (_, Backbone, Key, PlatMap) {
    'use strict';

    var PlatModel = Backbone.Model.extend({

        defaults: {
            key: 'C',
            notes:{},
            chords:{},
            platmap:PlatMap
        },

        initialize:function(){

            // get plat key
            var key = new Key({key:this.get('key')});

            // get key notes
            this.set('notes',  key.getNotes());

            // get key chords
            this.set('chords', key.getChords());

        }
        
    });

    return PlatModel;
});
