/*global define*/

define(function() {
  "use strict";

  // dom els
  var dom = {
    logo: ".logo",

    menuHome: ".logo",
    menuPlat: ".menu > .menu-item.nav_plats",
    menuTab: ".menu > .menu-item.nav_tabs",
    menuWord: ".menu > .menu-item.nav_words",
    menuPrimer: ".menu > .menu-item.nav_primers",
    menuScale: ".menu > .menu-item.nav_scales",

    Home: "#Home",

    Words: "#Words",
    words: ".words",
    wordFind: ".words .find input",
    wordAdd: ".words .add a",

    Plats: "#Plats",
    plats: ".plats",
    platsKey: ".plats .key",
    platNext: ".plats .next",

    Tabs: "#Tabs",
    tabs: ".tabs",
    tabFind: ".tabs .find input",
    tabItems: ".tabs .items",
    tabHints: ".tabs .hint",
    tabAdd: ".tabs .add a",

    Scales: "#Scales",
    scales: ".scales",
    scaleAdd: ".scales .add a",

    Primers: "#Primers",
    primers: ".primers"
  };

  return dom;
});
