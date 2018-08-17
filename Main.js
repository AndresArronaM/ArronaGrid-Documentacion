let versionPage = "V1.0.3";

console.log("ArronaGrid Documentacion "+ versionPage);

let btnMenuOpen = document.querySelector('.icon-menu');
let btnMenuClose = document.querySelector('.icon-arrow-left2');
let aside = document.querySelector('.aside');
let header = document.querySelector('header');
let main = document.querySelector('main');
let footer = document.querySelector('footer');
let submenuOpen = document.getElementsByClassName('icon-cheveron-down');

const tablet = matchMedia('(min-width: 768px)');

const menuOpenSmarthPhone = mq => {
    if(mq.matches == false){
        btnMenuOpen.style.display = 'none';
        btnMenuClose.style.display = 'block';
        aside.style.display = 'block';
    }
}

const menuCloseSmarthPhone = mq => {
    if(mq.matches == false){
        btnMenuOpen.style.display = 'block';
        btnMenuClose.style.display = 'none';
        aside.style.display = 'none';
    }
}

const menuOpen = mq => {
    if(mq.matches == true){
        btnMenuOpen.style.display = 'none';
        btnMenuClose.style.display = 'block';
        aside.style.display = 'block';
        header.style.gridColumn = "2 / 9";
        main.style.gridColumn = "2 / 9";
        footer.style.gridColumn = "2 / 9";
    }
}

const menuClose = mq => {
    if(mq.matches == true){
        btnMenuOpen.style.display = 'block';
        btnMenuClose.style.display = 'none';
        aside.style.display = 'none';
        header.style.gridColumn = "1 / 9";
        main.style.gridColumn = "1 / 9";
        footer.style.gridColumn = "1 / 9";
    }
}

btnMenuOpen.addEventListener('click', e=>{
    tablet.addListener(menuOpenSmarthPhone);
    menuOpenSmarthPhone(tablet);
    tablet.addListener(menuOpen);
    menuOpen(tablet);
});

btnMenuClose.addEventListener('click', e=>{
    tablet.addListener(menuCloseSmarthPhone);
    menuCloseSmarthPhone(tablet);
    tablet.addListener(menuClose);
    menuClose(tablet);
});

for (let i = 0; i < submenuOpen.length; i++) {
    submenuOpen[i].addEventListener('click', e =>{
        let submenu = submenuOpen[i].nextElementSibling;
        if (submenu.style.display == "none"){
            submenu.style.display = "block";
        }else{
            submenu.style.display = "none";
        }
    });
}

