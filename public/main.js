document.addEventListener('DOMContentLoaded', function () {
  const splide = new Splide('.splide', {
    perPage: 3,
    perMove: 1,
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

function updateUserCount(userCount) {
  let counter = document.getElementById('counter-users');
  counter.innerHTML = userCount;
}

function updateItemCount(itemCount) {
  let counter = document.getElementById('counter-items');
  counter.innerHTML = itemCount;
}

let socket = io();
socket.emit('connection', (data) => {
  updateUserCount(data.userCount);
  updateItemCount(data.itemCount);
});

socket.on('receive_item_count', (data) => {
  updateItemCount(data.itemCount);
});

socket.on('receive_user_count', (data) => {
  updateUserCount(data.userCount);
});
