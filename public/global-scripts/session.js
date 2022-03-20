function userLogIn() {
  var username = document.querySelector('.topnav__navbox_input').value;
  if (username.trim() === '') {
    alert('Write something first!');
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
