/*global define*/

define([
    'underscore',
    'backbone'
], function () {
    'use strict';

    var KeyModel = Backbone.Model.extend({

        defaults: {
            key: 'C',
            notation:{
                roots: ['C','D','E','F','G','A','B'], // C natural major scale
                steps: [2,2,1,2,2,2,1],               // major intervals
                accidentals: ['bb','b','','#','x']    // note accidentals 
            }
        },

        initialize: function(){
            this.set('key', this.normalize(this.get('key'))); // normalize key
            // console.log(this.get('key'));
        },

        // Calculate key chords and notes
        getNotes: function(){

            // basic params
            var name = this.get('key').charAt(0);
            var name_pos = this.get('notation').roots.indexOf(name);
            var acc = this.get('key').charAt(1);
            var acc_index = this.get('notation').accidentals.indexOf(acc);
            var acc_offset = acc_index - 2 < 0 ? 3 + acc_index : acc_index - 2;
            var acc_pos = 2;
            var notes = [];

            // copy original arrays for manipulation
            var dataAcc = this.get('notation').accidentals.slice(0); 
            var dataRoots = this.get('notation').roots.slice(0);
            var dataSteps = this.get('notation').steps.slice(0);

            // create internal array maps
            var accMap = dataAcc.concat(dataAcc.splice(0,acc_offset)); // rearrange so accidental is in middle
            var noteMap = dataRoots.concat(dataRoots.splice(0,name_pos)); // rearrange so notes are in order
            var stepMap = dataSteps.concat(dataSteps.splice(0,name_pos)); // rearrange to steps map new note order

            // populate primary chords and notes
            for(var i = 0; i < noteMap.length; i++){

                // compare current step to original
                var offset = this.get('notation').steps[i] - stepMap[i];

                // get data
                var name = noteMap[i];
                var accidental = accMap[acc_pos];

                // add to arrays
                notes.push(name + accidental);

                // update accidental position
                acc_pos = acc_pos + offset;

            }

            return notes;

        },

        getPrimaryChords: function(){

            var notes = this.getNotes();

            var chords = {
                1:{ note:notes[0], type:'M', types: ['M','2','6','7','9','sus'] },
                2:{ note:notes[1], type:'m', types: ['m','m7','m9'] },
                3:{ note:notes[2], type:'m', types: ['m','m7'] },
                4:{ note:notes[3], type:'M', types: ['M','6','7','m','m6'] },
                5:{ note:notes[4], type:'M', types: ['M','7','9','11','13'] },
                6:{ note:notes[5], type:'m', types: ['m','m7','m9'] },
                7:{ note:notes[6], type:'*', types: ['*'] }
            };

            return chords;

        },

        getSecondaryChords: function(){

            var notes = this.getNotes();

            var chords = {
                 1: { note:notes[5],                    type:'7',     types:['7','9','b9','M'] },
                 2: { note:notes[1],                    type:'7',     types:['7','9','b9','M'] }, 
                 3: { note:notes[6],                    type:'7',     types:['7','9','b9','M'] }, 
                 4: { note:this.sharpenNote(notes[0]),  type:'*7',    types:['*7'] }, 
                 5: { note:this.sharpenNote(notes[1]),  type:'*7',    types:['*7'] }, 
                 6: { note:this.sharpenNote(notes[4]),  type:'*7',    types:['*7'] }, 
                 7: { note:notes[2],                    type:'7',     types:['7','9','b9','M'] }, 
                 8: { note:this.sharpenNote(notes[3]),  type:'m*7b5', types:['m*7b5'] }, 
                 9: { note:notes[2],                    type:'m7b5',  types:['m7b5'] }, 
                10: { note:this.sharpenNote(notes[3]),  type:'m7b5',  types:['m7b5'] }, 
                11: { note:this.sharpenNote(notes[0]),  type:'*7',    types:['*7'] }, 
                12: { note:notes[0],                    type:'7',     types:['7','9','b9','M'] }
            };

            return chords;

        },

        getTertieryChords: function(){

            var notes = this.getNotes();

            var chords = {
                 1: { note:notes[2],                     type:'m7b5', types:['m7b5'] }, 
                 2: { note:notes[3],                     type:'m7b5', types:['m7b5'] }, 
                 3: { note:notes[4],                     type:'m7',   types:['m7'] }, 
                 4: { note:notes[0],                     type:'m6',   types:['m6'] }, 
                 5: { note:this.slashChord(4, 1, notes), type:'m7b5', types:['m7b5'] }, 
                 6: { note:this.flattenNote(notes[5]),   type:'M',    types:['M'] }, 
                 7: { note:this.flattenNote(notes[6]),   type:'9',    types:['9'] }, 
                 8: { note:this.slashChord(3, 0, notes), type:'M',    types:['M'] }, 
                 9: { note:this.slashChord(4, 0, notes), type:'M',    types:['M'] }, 
                10: { note:this.slashChord(0, 4, notes), type:'M',    types:['M'] }, 
                11: { note:notes[3],                     type:'m7b5', types:['m7b5'] }, 
                12: { note:notes[6],                     type:'9',    types:['9'] }, 
                13: { note:notes[5],                     type:'7',    types:['7'] }, 
                14: { note:notes[0],                     type:'*b3',  types:['*b3'] }, 
                15: { note:notes[2],                     type:'m7b5', types:['m7b5'] }, 
                16: { note:notes[6],                     type:'m7b5', types:['m7b5'] }, 
                17: { note:notes[0],                     type:'7',    types:['7'] }, 
                18: { note:notes[3],                     type:'m7',   types:['m7'] }, 
                19: { note:this.slashChord(0, 2, notes), type:'7',    types:['7'] }  
            };

            return chords;

        },

        getChords: function(){
            return {
                primary:this.getPrimaryChords(),
                secondary:this.getSecondaryChords(),
                tertiery:this.getTertieryChords()
            }
        },

        // HELPERS

        // get list of keys : used for menus and such
        getListOfKeys: function(){

            var keys = [];
            for(var i in this.get('notation').roots){
                for(var j = 1; j < 4; j++){
                    keys.push(this.get('notation').roots[i] + this.get('notation').accidentals[j]);
                }
            }

            return keys;

        },

        // concat a "slashed" or "compound" chord
        slashChord: function(bass, root, notes) {
            return notes[bass].charAt(0) + "/" + notes[root].charAt(0);
        },

        // translate unicodes
        charUnicode: function(note){
            var note = typeof note == 'undefined' ? '' : note;
            var match = note.match('x|#|b');
            if(match){
                return note.replace("b","♭").replace("#","♯");
            } else {
                return note;
            }
            
        },

        // normalize a double sharp note
        normalizeDoubleSharp: function(note){

            var name = note.charAt(0);
            var name_pos = this.get('notation').roots.indexOf(name);
            var halfsteps = this.get('notation').steps[name_pos]; // next step

            if( halfsteps == 1){
                note = name_pos == this.get('notation').roots.length - 1 ? this.get('notation').roots[0] + "#" : this.get('notation').roots[name_pos+1] + "#";
            } else {
                note = name_pos == this.get('notation').roots.length - 1 ? this.get('notation').roots[0] : this.get('notation').roots[name_pos+1];
            }

            return note;

        },

        // normalize a double flat note
        normalizeDoubleFlat: function(note){

            var name = note.charAt(0);
            var name_pos = this.get('notation').roots.indexOf(name);
            var halfsteps = name_pos == 0 ? this.get('notation').steps[this.get('notation').roots.length-1] : this.get('notation').steps[name_pos-1]; // prev step

            if ( halfsteps == 1 ) {
                note = name_pos == 0 ? this.get('notation').roots[this.get('notation').roots.length-1] + "b" : this.get('notation').roots[name_pos-1] + "b";
            } else {
                note = name_pos == 0 ? this.get('notation').roots[this.get('notation').roots.length-1] : this.get('notation').roots[name_pos-1];
            }

            return note;

        },

        // "normalize note"...translate it from double sharp or double flat
        normalize: function(note){

            //var note = charUnicode(note);
            var match = note.match('x|##|bb');

            // double accidental?
            if(!match){

                // basic translations
                note = note.replace("B#", "C").replace("Cb", "B").replace("E#", "F").replace("Fb", "E");

                // return translation
                return note;

            } else {

                // return normalized note
                return match == '##' || match == 'x' ? this.normalizeDoubleSharp(note) : this.normalizeDoubleFlat(note);

            }

        },

        // sharpen note
        sharpenNote: function(note){

            var name = note.charAt(0);
            var name_pos = this.get('notation').roots.indexOf(name);
            var acc = note.charAt(1);
            var halfsteps = this.get('notation').steps[name_pos]; // next step
            var sharpenedNote;

            // find next half step note by current notes step interval (either 1 or else 2)
            if ( halfsteps == 1 ) {

                if (acc == 'b') sharpenedNote = name; // remove flat
                if (acc == '') sharpenedNote = name_pos + 1 == this.get('notation').roots.length ? this.get('notation').roots[0] : this.get('notation').roots[name_pos + 1]; // get next note
                if (acc == '#') sharpenedNote = name_pos + 1 == this.get('notation').roots.length ? this.get('notation').roots[0] + '#' : this.get('notation').roots[name_pos + 1] + '#'; // add sharp

            } else {

                if (acc == 'b') sharpenedNote = name; // remove flat
                if (acc == '') sharpenedNote = name + '#'; // add sharp
                if (acc == '#') sharpenedNote = name_pos + 1 == this.get('notation').roots.length ? this.get('notation').roots[0] : this.get('notation').roots[name_pos + 1]; // get next note

            }

            return sharpenedNote;

        },

        // sharpen note
        flattenNote: function(note){

            var name = note.charAt(0);
            var name_pos = this.get('notation').roots.indexOf(name);
            var acc = note.charAt(1);
            var halfsteps = name_pos == 0 ? this.get('notation').steps[this.get('notation').roots.length-1] : this.get('notation').steps[name_pos-1]; // prev step
            var flattenedNote;

            // find next half step note by current notes step interval (either 1 or else 2)
            if ( halfsteps == 1 ) {

                if (acc == '#') flattenedNote = name; // remove flat
                if (acc == '') flattenedNote = name_pos == 0 ? this.get('notation').roots[this.get('notation').roots.length-1] : this.get('notation').roots[name_pos - 1]; // get next note
                if (acc == 'b') flattenedNote = name_pos == 0 ? this.get('notation').roots[this.get('notation').roots.length-1] + 'b' : this.get('notation').roots[name_pos - 1] + 'b'; // add sharp

            } else {

                if (acc == '#') flattenedNote = name; // remove flat
                if (acc == '') flattenedNote = name + 'b'; // add flat
                if (acc == 'b') flattenedNote = name_pos == 0 ? this.get('notation').roots[this.get('notation').roots.length-1] : this.get('notation').roots[name_pos - 1]; // get prev note

            }

            return flattenedNote;

        }

    });

    return KeyModel;
});
