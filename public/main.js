document.addEventListener('DOMContentLoaded', function () {
  var splide = new Splide('.splide', {
    // perPage: 3,
    // perMove: 1,
    trimSpace: false,
    rewind: true,
    gap: '2em',
    pagination: false,
    fixedWidth: '15em',
    arrows: 'splide__arrows',
    arrow: 'splide__arrow',
    prev: 'splide__arrow--prev',
    next: 'splide__arrow--next',
  });
  splide.mount();
});
