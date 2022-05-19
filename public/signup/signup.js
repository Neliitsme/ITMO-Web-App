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

async function signUp() {
  if (!alert.classList.contains('d-none')) {
    clearAlert();
  }

  let inputUsername = document.getElementById('inputUsername').value.trim();
  let inputEmail = document.getElementById('inputEmail').value.trim();
  let inputPassword = document.getElementById('inputPassword').value;

  if (!(inputUsername && inputEmail && inputPassword)) {
    showAlert('All fields must be filled!');
    return;
  }
  if (!validateEmail(inputEmail)) {
    showAlert('Invalid email!');
    return;
  }

  let emailExists = await axiosInstance.get(
    `/signup/email/exists?email=${inputEmail}`,
  );
  if (emailExists.data.status === 'OK' && emailExists.data.exists === true) {
    showAlert('Email is already in use!');
    return;
  }

  let signUpSt = await axiosInstance.post(`/signup`, {
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
  if (signUpSt.data.status !== 'OK') {
    showAlert('Something went wrong!');
    console.log(signUpSt);
    return;
  }

  let createdUser = await axios.post('/users', {
    uuid: signUpSt.data.user.id,
    timeJoined: signUpSt.data.user.timeJoined.toString(),
    name: inputUsername,
    email: signUpSt.data.user.email,
    password: inputPassword,
  });
  if (createdUser.status === 201) {
    window.location.href = '/';
  }
}
