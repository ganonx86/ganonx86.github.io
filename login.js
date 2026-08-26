const loginStatus = document.querySelector('#loginStatus');
const accountLogin = document.querySelector('#accountLogin');
const signInTab = document.querySelector('#signInTab');
const signUpTab = document.querySelector('#signUpTab');
const loginEyebrow = document.querySelector('#loginEyebrow');
const loginHeading = document.querySelector('#loginHeading');
const loginSubtitle = document.querySelector('#loginSubtitle');
const loginSubmit = document.querySelector('#loginSubmit');
let mode = 'signIn';
function getAccounts() {
  const accounts = JSON.parse(localStorage.getItem('questscore-accounts') || '[]');
  const legacy = JSON.parse(localStorage.getItem('questscore-account') || 'null');
  if (!accounts.length && legacy?.email) {
    accounts.push(legacy);
    localStorage.setItem('questscore-accounts', JSON.stringify(accounts));
  }
  return accounts;
}
function setMode(nextMode) {
  mode = nextMode;
  const signUp = mode === 'signUp';
  signInTab.classList.toggle('active', !signUp);
  signUpTab.classList.toggle('active', signUp);
  signInTab.setAttribute('aria-selected', String(!signUp));
  signUpTab.setAttribute('aria-selected', String(signUp));
  loginEyebrow.textContent = signUp ? 'NEW PLAYER' : 'WELCOME BACK';
  loginHeading.textContent = signUp ? 'Create your Quest Score account' : 'Sign in to Quest Score';
  loginSubtitle.textContent = signUp ? 'Create an account with your email and password.' : 'Use your email address and password.';
  loginSubmit.innerHTML = signUp ? 'Create account <span>→</span>' : 'Sign in <span>→</span>';
  document.querySelector('#password').autocomplete = signUp ? 'new-password' : 'current-password';
  loginStatus.textContent = '';
}
signInTab.addEventListener('click', () => setMode('signIn'));
signUpTab.addEventListener('click', () => setMode('signUp'));
accountLogin.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(accountLogin);
  const email = String(data.get('email')).trim().toLowerCase();
  const password = String(data.get('password'));
  const accounts = getAccounts();
  const account = accounts.find(item => item.email === email);
  if (mode === 'signUp') {
    if (account) {
      loginStatus.textContent = 'An account with this email already exists. Sign in instead.';
      return;
    }
    accounts.push({ email, password, profile: null, gamerscore: 0, achievements: [], isNew: true });
    localStorage.setItem('questscore-accounts', JSON.stringify(accounts));
    localStorage.setItem('questscore-account', JSON.stringify(accounts.at(-1)));
    localStorage.setItem('questscore-session', email);
    window.location.href = 'profile.html';
    return;
  }
  if (!account || account.password !== password) {
    loginStatus.textContent = 'Email or password does not match.';
    return;
  }
  localStorage.setItem('questscore-account', JSON.stringify(account));
  localStorage.setItem('questscore-session', email);
  window.location.href = 'profile.html';
});
