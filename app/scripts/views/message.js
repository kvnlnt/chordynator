/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'models/message'
], function ($, _, Backbone, JST, MessageModel) {
    'use strict';

    var MessageView = Backbone.View.extend({

        template: JST['app/scripts/templates/message.ejs'],

        initialize:function(){

            // create default model
            this.model = new MessageModel();

            // render
            this.render();

            // pub subs
            Backbone.pubSub.on('message:hide', this.hide, this);
            Backbone.pubSub.on('message:show', this.show, this);
            Backbone.pubSub.on("message:showTemporary", this.showTemporary, this)

        },

        events: function() {

            // events container
            var e = {};

            // return object
            return e;

        },

        showTemporary:function(){

            // show message
            this.show();

            // get timeout param
            var timeout = this.model.get('timeout');

            // if has timer, show for timeout
            var that = this;
            var t = setTimeout(function(){ Backbone.pubSub.trigger('message:hide'); }, timeout);

            // bind click hide
            $(this.el).on('click', function(){
                clearTimeout(t);
                that.hide();
            });

        },

        show:function(){

            // show message window, using visibility to preserver click throughs
            $(this.el).addClass("showing");

        },

        hide:function(){

            // hide message window, use visibility to preserve click throughs
            $(this.el).removeClass("showing");

            // remove bindings
            $(this.el).unbind('click');

        },

        // // MESSAGING

        // message:function(msg){

        //     // template
        //     var template = JST['app/scripts/templates/message.ejs'];

        //     // attach notes
        //     var message = template({ title:msg.title, message:msg.message });

        //     // add to dom
        //     $("#Main").append(message);

        //     this.close = function(){
        //         $("#Message").on('click',function(){ 
        //             this.remove(); 
        //             clearTimeout(timeout); 
        //         });
        //     }

        //     // if time not null, set timer and add onclick to remove for UX
        //     if(msg.time != null) {

        //         // create timeout
        //         var timeout = setTimeout(function(){ 
        //             $("#Message").fadeOut( "slow", function() {
        //                 this.remove();
        //             });
        //         }, msg.time);

        //         // remove on click
        //         this.close();

        //     }

        // },

        // messageClose:function(){
        //     $("#Message").fadeOut( "slow", function() {
        //         this.remove();
        //     });
        // },


        render:function(){

            // get template
            var template = this.template({ title:this.model.get('title'), message:this.model.get('message') });

            // assign to el
            this.setElement(template);

            // attach plat template and plat to DOM
            $('#Main').append(this.el);

        },

        close:function(id){

            // remove this view
            this.remove();

        }

    });

    return MessageView;
});
