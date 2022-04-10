function userLogIn() {
  var username = document.querySelector('.username').value;
  var password = document.querySelector('.password').value;
  if (username.trim() === '' || password.trim() === '') {
    alert('Incorrect username or password!');
    return;
  }

  document.cookie = 'logged=true';
  document.cookie = 'username=' + username;
  location.reload();
}

function userLogOut() {
  document.cookie = 'logged=false';
  document.cookie = 'username=';
  location.reload();
}
