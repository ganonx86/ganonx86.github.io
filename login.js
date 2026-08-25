const loginStatus = document.querySelector('#loginStatus');
const accountLogin = document.querySelector('#accountLogin');
const activationBox = document.querySelector('#activationBox');
const activationLink = document.querySelector('#activationLink');
let pendingAccount = null;
accountLogin.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(accountLogin);
  const email = String(data.get('email')).trim().toLowerCase();
  const password = String(data.get('password'));
  const account = JSON.parse(localStorage.getItem('questscore-account') || 'null');
  if (!account) {
    pendingAccount = { email, password };
    activationBox.hidden = false;
    loginStatus.textContent = 'Your activation link is ready below.';
    return;
  }
  if (account.email !== email || account.password !== password) {
    loginStatus.textContent = 'Email or password does not match.';
    return;
  }
  if (!account.activated) {
    pendingAccount = account;
    activationBox.hidden = false;
    loginStatus.textContent = 'Activate your account before signing in.';
    return;
  }
  localStorage.setItem('questscore-session', 'active');
  window.location.href = 'profile.html';
});
activationLink.addEventListener('click', event => {
  event.preventDefault();
  if (!pendingAccount) return;
  localStorage.setItem('questscore-account', JSON.stringify({ ...pendingAccount, activated: true }));
  loginStatus.textContent = 'Account activated. Click Sign in to continue.';
  activationBox.hidden = true;
});
