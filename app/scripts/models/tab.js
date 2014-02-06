/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var TabModel = Backbone.Model.extend({

        defaults: {
            variation:0,
            variations:[],
            chord:''
        },

        initialize:function(){

            // set tab config to model
            this.set('tab', this.getVariationTab());

        },

        getVariationTab:function(){

            // get variations
            var variations = this.get('variations'); // get all variations
            var variation  = variations[this.get('variation')]; // get current variation

            var tab         = {};
                tab.chord   = variation.baseName;
                tab.strings = this.getStrings(variation.chordArray);
                tab.frets   = this.getFrets(variation.chordArray).frets;
                tab.fingers = this.getFingers(variation.chordArray);

            return tab;

        },

        // advance variation
        nextVariation:function(){

            // calc next variation
            var variation = this.get('variation') >= this.get('variations').length-1 ? 0 : this.get('variation') + 1;

            // set new variation
            this.set('variation', variation);

            // reset tab config in model
            this.set('tab', this.getVariationTab());

        },

        // get's fret configuration from jtab chordArray
        getFrets:function(chordArray){

            // fret container
            var frets = [];

            // filter container
            var tabFilter  = [];

            // filter out -1 
            for(var x = 1; x < chordArray.length; x++ ){ if(chordArray[x][0] != -1 ){ tabFilter.push(chordArray[x][0]) } }

            // sort new array
            var tabSort = tabFilter.sort(function(a,b){return a-b});

            // now calc fret length
            var length = tabSort.indexOf(0) == -1 ? tabSort[tabSort.length-1] - tabSort[0] + 1 : tabSort[tabSort.length-1]; // step 2: if no 0s, count frets to first fret, else to 0
        
            // set fret width based on length
            var width = 76/length; // 76 is the width of a tab, frets start at an x of 12 + calc width 

            // get first fret
            var first = tabSort[0] === 0 ? 1 : tabSort[0];

            // get last fret
            var last = first + length;

            // get fret numbers
            var numbers = _.range(first, first + length);

            // populate fret array
            for(var i = 0; i < length; i++){

                var x = 12 + (i * width); 
                frets.push({ x:x, number:numbers[i] });

            }

            // add last fret onto fret array 
            frets.push({ x:88, number:null });

            // return everything so we can use these calculations elsewhere
            return {
                frets:frets,
                length:length,
                width:width,
                first:first,
                last:last,
                numbers:numbers
            }

        },

        // get's strings configuration from jtab chordArray
        getStrings:function(chordArray, fretLength){

            // var container
            var strings = [];

            // create strings array, walking backwards for normal tab layout
            for(var i = 6; i >= 1; i--){

                var string = i; // string number
                var y      = 39 - (i * 4); // strings are 4 pixels apart and start at 15
                var state  = (chordArray[i][0] == -1) ? 'muted' : ((chordArray[i][0] == 0) ? 'open' : 'fretted'); // state of string

                // add to array
                strings.push({ string:string, y:y, state:state });

            }

            // return object
            return strings;

        },

        // get's finger configuration from jtab chordArray
        getFingers:function(chordArray){

            var fingers = [];
            var frets   = this.getFrets(chordArray);
            var numbers = frets.numbers; numbers.unshift(0); // add zero onto beginning of array
            var tab     = chordArray.map(function(x){ return x[0]; }); tab.shift(); tab.reverse(); // get tab and cleanup

            // loop strings
            for(var string = 1; string <= tab.length; string++){

                var fret   = tab[string-1];
                var fret_i = numbers.indexOf(fret);
                var x      = 12 + (frets.width * (fret_i-1)) + (frets.width/2);
                var y      = 15 + (4 * (string-1));

                if(fret > 0) fingers.push({ x:x, y:y, string:string, fret:fret });

            }

            return fingers;

        }

    });

    return TabModel;
});
