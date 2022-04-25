async function createItem() {
  const itemName = document.getElementById('postItemName').value;
  const itemDesc = document.getElementById('postItemDesc').value;
  const userId = document.getElementById('postItemUserId').value;
  const placeId = document.getElementById('postItemPlaceId').value;

  let obj = {};
  obj.name = itemName;
  obj.description = itemDesc;
  obj.userId = userId;
  obj.placeId = placeId;

  const stringObj = JSON.stringify(obj);
  console.log(stringObj);

  const response = await fetch('/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: stringObj,
  }).then((data) => {
    console.log(data.json());
  });

  document.getElementById('postItemName').value = '';
  document.getElementById('postItemDesc').value = '';
  document.getElementById('postItemUserId').value = '';
  document.getElementById('postItemPlaceId').value = '';
}

async function createPlace() {
  const response = await fetch('/places', { method: 'POST' }).then((data) => {
    console.log(data.json());
  });
}

async function assignPlace() {
  const userId = document.getElementById('assignPlaceId').value;
  const placeId = document.getElementById('assignUserId').value;

  let obj = {};
  obj.userId = parseInt(userId);
  obj.occupation = 'OCCUPIED'

  const stringObj = JSON.stringify(obj);
  console.log(stringObj);

  const response = await fetch('/places/' + placeId, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: stringObj,
  }).then((data) => {
    console.log(data.json());
  });

  document.getElementById('assignPlaceId').value = '';
  document.getElementById('assignUserId').value = '';
}

async function deleteUser() {
  const userId = document.getElementById('deleteUserId').value;
  const response = await fetch('/users/' + userId, { method: 'DELETE' }).then((data) => {
    console.log(data.json());
  });
  document.getElementById('deleteUserId').value = "";
}

async function deletePlace() {
  const placeId = document.getElementById('deletePlaceId').value;
  const response = await fetch('/places/' + placeId, { method: 'DELETE' }).then((data) => {
    console.log(data.json());
  });
  document.getElementById('deletePlaceId').value = "";
}

async function deleteItem() {
  const itemId = document.getElementById('deleteItemId').value;
  const response = await fetch('/items/' + itemId, { method: 'DELETE' }).then((data) => {
    console.log(data.json());
  });
  document.getElementById('deleteItemId').value = "";
}
