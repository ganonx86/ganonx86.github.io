const loginForm = document.querySelector('#localLoginForm');
const loginStatus = document.querySelector('#loginStatus');

function baseProfile(email, displayName = '') {
  const fallback = displayName.trim() || email.split('@')[0];
  const [firstName = '', ...rest] = fallback.split(' ');
  return {
    gamertag: fallback,
    firstName,
    lastName: rest.join(' '),
    profileImage: '',
    country: '',
    town: '',
    zipCode: ''
  };
}

loginForm?.addEventListener('submit', event => {
  event.preventDefault();
  const email = String(loginForm.elements.email.value || '').trim().toLowerCase();
  const displayName = String(loginForm.elements.displayName.value || '').trim();

  if (!email.includes('@')) {
    loginStatus.textContent = 'Please enter a valid email address.';
    return;
  }

  const accounts = JSON.parse(localStorage.getItem('questscore-accounts') || '[]');
  const existingIndex = accounts.findIndex(account => account.email === email);
  const existingAccount = existingIndex >= 0 ? accounts[existingIndex] : null;
  const account = existingAccount || {
    uid: `local-${Date.now()}`,
    email,
    gamerscore: 0,
    achievements: [],
    isNew: false
  };

  account.profile = account.profile || baseProfile(email, displayName);
  if (!account.profile.gamertag && displayName) account.profile.gamertag = displayName;
  if (!account.profile.firstName && displayName) {
    const [firstName = '', ...rest] = displayName.split(' ');
    account.profile.firstName = firstName;
    account.profile.lastName = rest.join(' ');
  }
  account.isNew = false;

  if (existingIndex >= 0) accounts[existingIndex] = account;
  else accounts.push(account);

  localStorage.setItem('questscore-accounts', JSON.stringify(accounts));
  localStorage.setItem('questscore-account', JSON.stringify(account));
  sessionStorage.setItem('questscore-session', email);
  loginStatus.textContent = 'Signed in locally. Redirecting...';
  setTimeout(() => { window.location.href = 'dashboard.html'; }, 250);
});
