window.addEventListener(
  'load',
  function (event) {
    let dataTableRow = document.querySelectorAll('.items-table__data tbody tr');
    let i;
    for (i = 0; i < dataTableRow.length; i++) {
      let deleteButton = document.createElement('td');
      deleteButton.className = 'items-table__data_delete';
      dataTableRow[i].appendChild(deleteButton);
    }

    if (localStorage.getItem('table-data') != null) {
      let table = document.querySelector('.items-table__data tbody');
      table.innerHTML = this.localStorage.getItem('table-data');
    }

    let deleteButtons = document.querySelectorAll('.items-table__data_delete');
    for (i = 0; i < deleteButtons.length; i++) {
      addDeleteFunction(deleteButtons[i]);
    }
  },
  false,
);

function addDeleteFunction(item) {
  item.onclick = function () {
    let item = this.parentElement;
    item.remove();
    saveTableState();
  };
}

function saveTableState() {
  let table = document.querySelector('.items-table__data tbody');
  localStorage.setItem('table-data', table.innerHTML);
}

function toggleLoading() {
  document
    .querySelector('.items-table__loading')
    .classList.toggle('loading--show');
}

function addItem() {
  let inputId = document.querySelector('.items-table__input').value;
  if (inputId.trim() === '') {
    alert('Write something first!');
    return;
  }
  toggleLoading();

  let entryRow = document.createElement('tr');
  let entryId = document.createElement('td');
  let entryName = document.createElement('td');
  let entryStatus = document.createElement('td');
  let id = document.createTextNode(inputId);
  entryId.appendChild(id);

  let controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
    alert('Request timeout.');
    toggleLoading();
  }, 10000);

  let fetchedItem = fetch('/items/' + inputId, {
    method: 'GET',
    signal: controller.signal,
  })
    .then((response) => response.json())
    .then((item) => {
      clearTimeout(timeoutId);
      console.log(item);
      return item;
    })
    .catch((error) => {
      clearTimeout(timeoutId);
      toggleLoading();
      alert('ID not found');
    });

  fetchedItem.then((item) => {
    if (item === undefined) {
      return;
    }

    let deleteButton = document.createElement('td');
    deleteButton.className = 'items-table__data_delete';
    addDeleteFunction(deleteButton);

    entryRow.appendChild(entryId);
    let nameData = document.createTextNode(item.name);
    let statusData = document.createTextNode(item.description);
    entryName.appendChild(nameData);
    entryStatus.appendChild(statusData);

    entryRow.appendChild(entryName);
    entryRow.appendChild(entryStatus);
    entryRow.appendChild(deleteButton);

    document.querySelector('.items-table__data tbody').appendChild(entryRow);
    document.querySelector('.items-table__input').value = '';

    toggleLoading();
    saveTableState();
  });
}
