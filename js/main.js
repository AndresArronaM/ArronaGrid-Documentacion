"use strict";

var versionPage = "V1.0.3";

console.log("ArronaGrid Documentacion " + versionPage);

var btnMenuOpen = document.querySelector('.icon-menu');
var btnMenuClose = document.querySelector('.icon-arrow-left2');
var aside = document.querySelector('.aside');
var header = document.querySelector('header');
var main = document.querySelector('main');
var footer = document.querySelector('footer');
var submenuOpen = document.getElementsByClassName('icon-cheveron-down');

var tablet = matchMedia('(min-width: 768px)');

var menuOpenSmarthPhone = function menuOpenSmarthPhone(mq) {
    if (mq.matches == false) {
        btnMenuOpen.style.display = 'none';
        btnMenuClose.style.display = 'block';
        aside.style.display = 'block';
    }
};

var menuCloseSmarthPhone = function menuCloseSmarthPhone(mq) {
    if (mq.matches == false) {
        btnMenuOpen.style.display = 'block';
        btnMenuClose.style.display = 'none';
        aside.style.display = 'none';
    }
};

var menuOpen = function menuOpen(mq) {
    if (mq.matches == true) {
        btnMenuOpen.style.display = 'none';
        btnMenuClose.style.display = 'block';
        aside.style.display = 'block';
        header.style.gridColumn = "2 / 9";
        main.style.gridColumn = "2 / 9";
        footer.style.gridColumn = "2 / 9";
    }
};

var menuClose = function menuClose(mq) {
    if (mq.matches == true) {
        btnMenuOpen.style.display = 'block';
        btnMenuClose.style.display = 'none';
        aside.style.display = 'none';
        header.style.gridColumn = "1 / 9";
        main.style.gridColumn = "1 / 9";
        footer.style.gridColumn = "1 / 9";
    }
};

btnMenuOpen.addEventListener('click', function (e) {
    tablet.addListener(menuOpenSmarthPhone);
    menuOpenSmarthPhone(tablet);
    tablet.addListener(menuOpen);
    menuOpen(tablet);
});

btnMenuClose.addEventListener('click', function (e) {
    tablet.addListener(menuCloseSmarthPhone);
    menuCloseSmarthPhone(tablet);
    tablet.addListener(menuClose);
    menuClose(tablet);
});

var _loop = function _loop(i) {
    submenuOpen[i].addEventListener('click', function (e) {
        var submenu = submenuOpen[i].nextElementSibling;
        if (submenu.style.display == "none") {
            submenu.style.display = "block";
        } else {
            submenu.style.display = "none";
        }
    });
};

for (var i = 0; i < submenuOpen.length; i++) {
    _loop(i);
}
//# sourceMappingURL=Main.js.map
