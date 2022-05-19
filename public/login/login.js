supertokens.init({
  apiDomain: window.location.origin,
  apiBasePath: '/auth',
});

const axiosInstance = axios.create({
  baseURL: window.location.origin + '/auth',
  headers: { rid: 'emailpassword' },
});

supertokens.addAxiosInterceptors(axiosInstance);
let alert = document.getElementById('errorMessage');

function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function clearAlert() {
  alert.innerHTML = '';
  alert.classList.add('d-none');
}

function showAlert(message) {
  alert.innerHTML = message;
  alert.classList.remove('d-none');
}

async function logIn() {
  if (!alert.classList.contains('d-none')) {
    clearAlert();
  }

  let inputEmail = document.getElementById('inputEmail').value.trim();
  let inputPassword = document.getElementById('inputPassword').value;

  if (!(inputEmail && inputPassword)) {
    showAlert('All fields must be filled!');
    return;
  }
  if (!validateEmail(inputEmail)) {
    showAlert('Invalid email!');
    return;
  }

  let signInSt = await axiosInstance.post(`/signin`, {
    formFields: [
      {
        id: 'email',
        value: inputEmail,
      },
      {
        id: 'password',
        value: inputPassword,
      },
    ],
  });

  console.log(signInSt);
  if (signInSt.data.status !== 'OK') {
    showAlert('Something went wrong!')
    console.log(signInSt);
    return;
  }

  if (signInSt.status === 200) {
    window.location.href = '/';
  }
}
