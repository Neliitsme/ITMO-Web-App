window.addEventListener(
  'load',
  function (event) {
    var dataTableRow = document.querySelectorAll('.items-table__data tbody tr');
    var i;
    for (i = 0; i < dataTableRow.length; i++) {
      var deleteButton = document.createElement('td');
      deleteButton.className = 'items-table__data_delete';
      dataTableRow[i].appendChild(deleteButton);
    }

    if (localStorage.getItem('table-data') != null) {
      var table = document.querySelector('.items-table__data tbody');
      table.innerHTML = this.localStorage.getItem('table-data');
    }

    var deleteButtons = document.querySelectorAll('.items-table__data_delete');
    for (i = 0; i < deleteButtons.length; i++) {
      addDeleteFunction(deleteButtons[i]);
    }
  },
  false,
);

function addDeleteFunction(item) {
  item.onclick = function () {
    var item = this.parentElement;
    item.remove();
    saveTableState();
  };
}

function saveTableState() {
  var table = document.querySelector('.items-table__data tbody');
  localStorage.setItem('table-data', table.innerHTML);
}

function toggleLoading() {
  document
    .querySelector('.items-table__loading')
    .classList.toggle('loading--show');
}

function addItem() {
  var inputId = document.querySelector('.items-table__input').value;
  if (inputId.trim() === '') {
    alert('Write something first!');
    return;
  }
  toggleLoading();

  var entryRow = document.createElement('tr');
  var entryId = document.createElement('td');
  var entryName = document.createElement('td');
  var entryStatus = document.createElement('td');
  var id = document.createTextNode(inputId);
  entryId.appendChild(id);

  var controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
    alert('Request timeout.');
    toggleLoading();
  }, 10000);

  var fetchedTodos = fetch('https://jsonplaceholder.typicode.com/todos', {
    signal: controller.signal,
  })
    .then((response) => response.json())
    .then((todo) => {
      clearTimeout(timeoutId);
      if (todo[inputId - 1] === undefined) {
        alert('ID not found.');
        toggleLoading();
        return;
      } else {
        return [todo[inputId - 1].title, todo[inputId - 1].completed];
      }
    })
    .catch((error) => {
      clearTimeout(timeoutId);
      toggleLoading();
      alert('Connection loss.');
    });

  fetchedTodos.then((namestatus) => {
    if (namestatus === undefined) {
      return;
    }

    var deleteButton = document.createElement('td');
    deleteButton.className = 'items-table__data_delete';
    addDeleteFunction(deleteButton);

    entryRow.appendChild(entryId);
    var nameData = document.createTextNode(namestatus[0]);
    var statusData = document.createTextNode(namestatus[1]);
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
