/*global define*/

// rhyme endpoint: 'http://www.stands4.com/services/v2/rhymes.php?uid=2737&tokenid=XpGnTiGkthJ7TuYg&term=rhyme'

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var WordModel = Backbone.Model.extend({

        defaults: {
            UserID: 0,
            Token: '',
            endpoint: { rhyme:'http://chordynator.com:3000' },
            word:'',
            rhymes:'',
            idioms:'',
            related_words:'',
            definitions:''
        },

        initialize:function(){

            var that = this;

            // get rhymes
            $.ajax({
                type:"GET",
                url: this.get('endpoint').rhyme + '/' + this.get('word'), 
                async: true, 
                timeout:3000,

                beforeSend:function(){

                    // show user message that search is taking place
                    var msg = { title:'Please wait', message:'searching rhymes, phrases, synonyms, etc', time:null}
                    Backbone.pubSub.trigger('message:show', msg);

                },

                success: function(data) {

                    if(data.length != 0) {

                        // format data
                        var rhymes         = data.rhymes        === null ? 'no results' : data.rhymes.split('|').join(", ");
                        var idioms         = data.idioms        === null ? 'no results' : data.idioms.split('|').join(", ");
                        var related_words  = data.related_words === null ? 'no results' : data.related_words.split('|').join(", ");
                        var definitions    = data.definitions   === null ? 'no results' : data.definitions.split('|').join(", ");

                    } else {

                        var rhymes = idioms = related_words = definitions = 'no results';

                    }


                    // update model
                    that.set('rhymes', rhymes);
                    that.set('idioms', idioms);
                    that.set('related_words', related_words);
                    that.set('definitions', definitions);

                },

                failure:function(){

                    // let user know something failed
                    // that.set('rhymes', 'sorry, the request failed. Let me know! email kevin@kevinlint.com');

                },

                error: function(){

                    // update model
                    // that.set('rhymes', 'No rhymes found.');

                },
                
                complete:function(){

                    // trigger update
                    Backbone.pubSub.trigger("word:rhymes");
                    Backbone.pubSub.trigger("message:hide");

                }
            });

        }

    });

    return WordModel;
});
