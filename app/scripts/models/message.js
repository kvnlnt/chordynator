/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var MessageModel = Backbone.Model.extend({

        defaults: {
            title:'hi',
            message:'sup',
            timeout:null
        },

        initialize:function(){

            // subs
            Backbone.pubSub.on('message:show', this.update, this);
            Backbone.pubSub.on('message:showTemporary', this.update, this);

        },

        update:function(msg) {

            // update data
            this.set('title',   msg.title);
            this.set('message', msg.message);
            this.set('timeout', msg.timeout);

            // manually update html because it may be the same message
            $("#Message .title").html(msg.title);
            $("#Message .message").html(msg.message);

        }

    });

    return MessageModel;
});
