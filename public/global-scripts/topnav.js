function navDropdown() {
  document
    .querySelector('.topnav__navbox_nav_list')
    .classList.toggle('topnav__navbox_nav_show');
}

window.onclick = function (event) {
  if (!event.target.matches('.topnav__navbox_button')) {
    var dropdowns = document.getElementsByClassName('topnav__navbox_nav_list');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('topnav__navbox_nav_show')) {
        openDropdown.classList.remove('topnav__navbox_nav_show');
      }
    }
  }
};

window.addEventListener(
  'load',
  function (event) {
    activePage();
  },
  false,
);

// window.onload = activePage;
function activePage() {
  var page = window.location.pathname.split('/').at(-1);
  var listItems = document.querySelectorAll('.topnav__navbox_nav_list li');
  for (i = 0; i < listItems.length; i++) {
    var item = listItems[i];
    if (item.children[0].pathname.split('/').at(-1).includes(page)) {
      item.classList.add('topnav__navbox_nav_list_item-active');
      break;
    }
  }
}
