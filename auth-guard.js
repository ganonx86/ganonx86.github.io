const sessionEmail = sessionStorage.getItem('questscore-session');
const accounts = JSON.parse(localStorage.getItem('questscore-accounts') || '[]');
const activeAccount = JSON.parse(localStorage.getItem('questscore-account') || 'null');

if (!sessionEmail || (!accounts.some(account => account.email === sessionEmail) && activeAccount?.email !== sessionEmail)) {
  window.location.replace('login.html');
}