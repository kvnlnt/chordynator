/*global define*/

define(function () {
    'use strict';

    // dom els
    var dom = {

        menuComp: '.menu > ul.items > li > a.comp',
        menuPlat: '.menu > ul.items > li > a.plat',
        menuTab:  '.menu > ul.items > li > a.tab',

        comps:    '.comps',

        plats:    '.plats',
        platsKey: '.plats .key',

        tabs:     '.tabs',
        tabFind:  '.tabs .find input',
        tabItems: '.tabs .items',
        tabHints: '.tabs .hint',
        tabAdd:   '.tabs .add a'

    };

    return dom;

});
