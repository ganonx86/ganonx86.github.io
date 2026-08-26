const sessionEmail = localStorage.getItem('questscore-session');
const accounts = JSON.parse(localStorage.getItem('questscore-accounts') || '[]');

if (!sessionEmail || !accounts.some(account => account.email === sessionEmail)) {
  window.location.replace('login.html');
}