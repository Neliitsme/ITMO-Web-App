function switchLight() {
    document.body.classList.toggle("body-darkmode");
    document.querySelector("header").classList.toggle("header-darkmode");
    document.querySelector("main").classList.toggle("main-darkmode");
    document.querySelector(".topnav__navbox_nav_list_item-active").classList.toggle("item-active-darkmode")
    document.querySelector("footer").classList.toggle("footer-darkmode");
    document.querySelector(".h2-styled").classList.toggle("h2-styled-darkmode");
    document.querySelector("code").classList.toggle("code-darkmode");
    document.querySelector(".topnav__navbox_nav_show").classList.toggle("topnav__navbox_nav_show-darkmode");
}