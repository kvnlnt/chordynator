/*global define*/

define(function () {
    'use strict';

    // dom els
    var dom = {

        menuPlat: '.menu > ul.items > li > a.nav_plat',
        menuTab:  '.menu > ul.items > li > a.nav_tab',

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
