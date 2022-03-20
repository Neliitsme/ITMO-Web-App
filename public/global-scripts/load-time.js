// let start = new Date().getTime();
window.addEventListener(
  'load',
  function (event) {
    getLoadTime();
  },
  false,
);

function getLoadTime() {
  var loadTime =
    window.performance.timing.domContentLoadedEventEnd -
    window.performance.timing.navigationStart;
  var footerTime = document.querySelector('.footer__load-time');
  footerTime.innerHTML = `Page loaded in ${loadTime / 1000}s`;
}
