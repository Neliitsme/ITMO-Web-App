supertokens.init({
  apiDomain: window.location.origin,
  apiBasePath: '/auth',
});

async function logOut() {
  await supertokens.signOut();
  window.location.href = '/';
}
