const sessionEmail = sessionStorage.getItem('questscore-session');
const accounts = JSON.parse(localStorage.getItem('questscore-accounts') || '[]');
const activeAccount = JSON.parse(localStorage.getItem('questscore-account') || 'null');

function removeWebsiteAccount(email) {
  if (!email) return;
  localStorage.removeItem(`questscore-tasks-${email}`);
  localStorage.removeItem(`questscore-achievements-${email}`);
  localStorage.removeItem(`questscore-completed-count-${email}`);
  localStorage.removeItem('questscore-account');
  localStorage.removeItem('questscore-profile');
  localStorage.setItem('questscore-accounts', JSON.stringify(accounts.filter(account => account.email !== email)));
  sessionStorage.removeItem('questscore-session');
}

if (!sessionEmail || (!accounts.some(account => account.email === sessionEmail) && activeAccount?.email !== sessionEmail)) {
  window.location.replace('login.html');
}