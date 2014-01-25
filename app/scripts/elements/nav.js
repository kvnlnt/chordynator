/*global define*/

define(function () {
    'use strict';

    // dom els
    var dom = {

        menuComp: '.menu > ul.items > li > a.nav_comp',
        menuPlat: '.menu > ul.items > li > a.nav_plat',
        menuTab:  '.menu > ul.items > li > a.nav_tab',

        comps:    '.comps',

        Plats:    '#Plats',
        plats:    '.plats',
        platsKey: '.plats .key',

        Tabs:     '#Tabs',
        tabs:     '.tabs',
        tabFind:  '.tabs .find input',
        tabItems: '.tabs .items',
        tabHints: '.tabs .hint',
        tabAdd:   '.tabs .add a'

    };

    return dom;

});
