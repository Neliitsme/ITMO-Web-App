function navDropdown() {
  document
    .querySelector('.topnav__navbox_nav_list')
    .classList.toggle('topnav__navbox_nav_show');
}

window.onclick = function (event) {
  if (!event.target.matches('.topnav__navbox_button')) {
    let dropdowns = document.getElementsByClassName('topnav__navbox_nav_list');
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('topnav__navbox_nav_show')) {
        openDropdown.classList.remove('topnav__navbox_nav_show');
      }
    }
  }
};
