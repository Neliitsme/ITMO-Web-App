function buildToast(toastConfig) {
  let toastDiv = document.createElement('div');
  let toastHeader = document.createElement('div');
  let toastHeaderStrong = document.createElement('strong');
  let toastBody = document.createElement('div');
  let toastCloseButton = document.createElement('button');

  toastDiv.classList.add('toast');
  toastDiv.classList.add('text-white');
  if (toastConfig.type === 'success') {
    toastDiv.classList.add('bg-success');
  } else if (toastConfig.type === 'error') {
    toastDiv.classList.add('bg-danger');
  }
  toastHeader.classList.add('toast-header');
  toastHeaderStrong.classList.add('me-auto');
  toastBody.classList.add('toast-body');
  toastCloseButton.classList.add('btn-close');

  toastDiv.setAttribute('role', 'alert');
  toastDiv.setAttribute('aria-live', 'assertive');
  toastDiv.setAttribute('aria-atomic', 'true');
  toastCloseButton.setAttribute('type', 'button');
  toastCloseButton.setAttribute('data-bs-dismiss', 'toast');
  toastCloseButton.setAttribute('aria-label', 'Close');

  toastHeaderStrong.append(document.createTextNode(toastConfig.status));
  toastHeader.append(toastHeaderStrong, toastCloseButton);
  toastBody.append(document.createTextNode(toastConfig.message));
  toastDiv.append(toastHeader, toastBody);

  document.getElementById('toastContainer').append(toastDiv);

  return new bootstrap.Toast(toastDiv);
}

function showToast(toastConfig) {
  let toastEl = buildToast(toastConfig);
  let toastElList = [].slice.call(document.querySelectorAll('.toast'));

  if (toastElList.length > 7) {
    toastElList.at(0).remove();
  }

  toastEl.show();
  setTimeout(() => {
    toastElList.at(-1).remove();
  }, 5250);
}

function getSuccessResponseObject(response) {
  return {
    status: response.statusText,
    message: JSON.stringify(response.data),
    type: 'success',
  };
}

function getErrorResponseObject(error) {
  return {
    status: error.response.statusText,
    message: JSON.stringify(error.response.data),
    type: 'error',
  };
}

function tempoButton() {
  showToast({ status: 'Tempo', message: 'Button', type: 'success' });
}

async function createItem() {
  const itemName = document.getElementById('postItemName').value;
  let itemDesc = document.getElementById('postItemDesc').value;
  const userId = document.getElementById('postItemUserId').value;
  const placeId = document.getElementById('postItemPlaceId').value;

  if (itemDesc === '') {
    itemDesc = null;
  }

  axios
    .post('/items', {
      name: itemName,
      description: itemDesc,
      userId: parseInt(userId),
      placeId: parseInt(placeId),
    })
    .then((response) => {
      console.log(response);
      showToast(getSuccessResponseObject(response));
    })
    .catch((error) => {
      console.log(error);
      showToast(getErrorResponseObject(error));
    });

  document.getElementById('postItemName').value = '';
  document.getElementById('postItemDesc').value = '';
  document.getElementById('postItemUserId').value = '';
  document.getElementById('postItemPlaceId').value = '';
}

async function createPlace() {
  axios
    .post('/places')
    .then((response) => {
      console.log(response);
      showToast(getSuccessResponseObject(response));
    })
    .catch((error) => {
      console.log(error);
      showToast(getErrorResponseObject(error));
    });
}

async function assignPlace() {
  const placeId = document.getElementById('assignPlaceId').value;
  const userId = document.getElementById('assignUserId').value;

  axios
    .patch('/places/' + placeId, {
      userId: parseInt(userId),
      occupation: 'OCCUPIED',
    })
    .then((response) => {
      console.log(response);
      showToast(getSuccessResponseObject(response));
    })
    .catch((error) => {
      console.log(error);
      showToast(getErrorResponseObject(error));
    });

  document.getElementById('assignPlaceId').value = '';
  document.getElementById('assignUserId').value = '';
}

async function deleteUser() {
  const userId = document.getElementById('deleteUserId').value;

  axios
    .delete('/users/' + userId)
    .then((response) => {
      console.log(response);
      showToast(getSuccessResponseObject(response));
    })
    .catch((error) => {
      console.log(error);
      showToast(getErrorResponseObject(error));
    });

  document.getElementById('deleteUserId').value = '';
}

async function deletePlace() {
  const placeId = document.getElementById('deletePlaceId').value;

  axios
    .delete('/places/' + placeId)
    .then((response) => {
      console.log(response);
      showToast(getSuccessResponseObject(response));
    })
    .catch((error) => {
      console.log(error);
      showToast(getErrorResponseObject(error));
    });

  document.getElementById('deletePlaceId').value = '';
}

async function deleteItem() {
  const itemId = document.getElementById('deleteItemId').value;

  axios
    .delete('/items/' + itemId)
    .then((response) => {
      console.log(response);
      showToast(getSuccessResponseObject(response));
    })
    .catch((error) => {
      console.log(error);
      showToast(getErrorResponseObject(error));
    });

  document.getElementById('deleteItemId').value = '';
}
