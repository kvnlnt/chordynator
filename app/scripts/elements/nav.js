/*global define*/

define(function () {
    'use strict';

    // dom els
    var dom = {

        menuHome:   '.menu > ul.items > li > a.nav_home',
        menuPlat:   '.menu > ul.items > li > a.nav_plats',
        menuTab:    '.menu > ul.items > li > a.nav_tabs',
        menuWord:   '.menu > ul.items > li > a.nav_words',
        menuPrimer: '.menu > ul.items > li > a.nav_primers',

        Home:     '#Home',

        Words:    '#Words',
        words:    '.words',
        wordFind: '.words .find input',
        wordAdd:  '.words .add a',

        Plats:    '#Plats',
        plats:    '.plats',
        platsKey: '.plats .key',
        platNext: '.plats .next',

        Tabs:     '#Tabs',
        tabs:     '.tabs',
        tabFind:  '.tabs .find input',
        tabItems: '.tabs .items',
        tabHints: '.tabs .hint',
        tabAdd:   '.tabs .add a',

        Primers:  '#Primers',
        primers:  '.primers'

    };

    return dom;

});
