/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var ScaleModel = Backbone.Model.extend({

        defaults: {
            key:'C',
            scale:'major',
            fretboard:{},
            chromaticScale:['A','A#/Bb', 'B', 'C','C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab'],
            formulas:{
                major:{
                    name:'Major',
                    steps:'R, W, W, H, W, W, W, H',
                    formula: [2,2,1,2,2,2,1]
                },
                natural_minor:{
                    name:"Minor",
                    steps:'R, W, H, W, W, H, W, W',
                    formula:[2,1,2,2,1,2,2]
                },
                harmonic_minor:{
                    name:"Harm. Minor",
                    steps:'R, W, H, W, W, H, W+H, H',
                    formula:[2,1,2,2,1,3,1]
                },
                melodic_minor:{
                    name:"Mel. Minor",
                    steps:'R, W, H, W, W, W, W, H',
                    formula:[2,1,2,2,2,2,1]
                },
                dorian_mode:{
                    name:"Dorian",
                    steps:'R, W, H, W, W, W, H, W',
                    formula:[2,1,2,2,2,1,2]
                }, 
                mixolydian_mode:{
                    name:"Mixolydian",
                    steps:'R, W, W, H, W, W, H, W',
                    formula:[2,2,1,2,2,1,2]
                },
                blues:{
                    name:"Blues",
                    steps:'R, W+H, W, W, W+H, W',
                    formula:[3,2,1,1,3,3]
                }
            }
        }, 

        initialize:function(){

            this.set({ fretboard:this.fretboard() });

        },

        // reorder the chromatic scale so the note passed is first
        shuffleScale:function(note){

            var chromaticScale = this.get('chromaticScale').slice(0); // shallow copy
            var index = 0;

            for(var i = 0; i < chromaticScale.length; i++){
                var current_note = chromaticScale[i];
                if(current_note == note){
                    index = i;
                }
            }

            var chromaticScale = chromaticScale.splice(index, chromaticScale.length).concat(chromaticScale);
            return chromaticScale;

        },

        // get two octaves of the scale for a string
        getStringNotes:function(note){

            var chromaticScale = this.shuffleScale(note);
            return chromaticScale.concat(chromaticScale);

        },

        getScaleNotes:function(){

            // get notes in scale
            var chromaticScale = this.shuffleScale(this.get('key'));
            var note_index     = 0;
            var notes          = [];
            var formula        = this.get('formulas')[this.get('scale')].formula;

            for(var i = 0; i < formula.length; i++){
                var note = chromaticScale[note_index];
                notes.push(note);
                note_index += formula[i];
            }

            // add showing class to all notes
            for(var i = 0; i < notes.length; i++){
                var note = notes[i];
            }

            return notes;

        },

        // create the fretboard
        fretboard:function(){

            // params
            var yOffset      = 35;
            var fontSize     = 6;
            var stringWidth  = 70/5;
            var radius       = 5.5;
            var notes        = this.getScaleNotes();

            // object literal
            var board = {};
                board.frets      = 24;  // num of frets + 1
                board.len        = 355, // in pixels
                board.bars       = [];  // y pos of bars
                board.strings    = [];  // x pos of strings
                board.notes      = [];   // x, y pos of notes 
                board.fretWidth  = board.len/(board.frets-1);
                board.fontOffset = (board.fretWidth - fontSize)/2 + 1;
                board.noteOffset = (board.fretWidth - radius)/2 + 2.75;
                board.key_notes  = notes;

            // populate bars
            for(var i = 0; i < board.frets; i++){
                board.bars.push( i * board.fretWidth + yOffset );
            }

            // populate strings
            for(var i = 0; i < 6; i++) {
                board.strings.push(20 + (i * stringWidth));
            }

            // get scale
            var stringScales = [
                this.getStringNotes('E'),
                this.getStringNotes('A'),
                this.getStringNotes('D'),
                this.getStringNotes('G'),
                this.getStringNotes('B'),
                this.getStringNotes('E')
            ];

            // populate fretboard with all chromatic notes
            _.each(board.strings, function(string, x){

                _.each(board.bars, function(bar, y){

                    var note    = stringScales[x][y];
                    var showing = notes.indexOf(note) > -1 ? 'showing' : '';

                    board.notes.push({
                        note:note,
                        showing:showing,
                        x:string-0.5, 
                        y:board.bars[y], 
                        radius:radius 
                    });

                });

            });

            return board;
        }

    });

    return ScaleModel;
});
