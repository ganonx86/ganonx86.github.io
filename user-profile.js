const accounts = JSON.parse(localStorage.getItem('questscore-accounts') || '[]');
const sessionEmail = localStorage.getItem('questscore-session');
const account = accounts.find(item => item.email === sessionEmail) || JSON.parse(localStorage.getItem('questscore-account') || 'null');
const profile = account?.profile || JSON.parse(localStorage.getItem('questscore-profile') || 'null');
const fullName = [profile?.firstName, profile?.lastName].filter(Boolean).join(' ');
const displayName = profile?.gamertag || fullName || account?.email?.split('@')[0] || 'Player';
const initials = (profile?.firstName?.[0] || displayName[0] || 'P').concat(profile?.lastName?.[0] || '').toUpperCase();
const accountScore = Number(account?.gamerscore || 0);
const today = new Date();
const currentDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const accountTasks = JSON.parse(localStorage.getItem(`questscore-tasks-${sessionEmail || 'guest'}`) || '[]');
const activeTodayCount = accountTasks.filter(task => (task.scheduledDate || currentDate) === currentDate && !task.done).length;
document.querySelectorAll('.mini-profile strong').forEach(element => { element.textContent = displayName; });
document.querySelectorAll('.mini-profile span').forEach(element => { element.textContent = fullName || 'Score chaser'; });
document.querySelectorAll('.xp-mini-top span:first-child').forEach(element => { element.textContent = 'Score'; });
document.querySelectorAll('.xp-mini-top span:last-child').forEach(element => { element.textContent = `${accountScore.toLocaleString()} GS`; });
document.querySelectorAll('.xp-mini .progress-fill').forEach(element => { element.style.width = `${Math.min(100, Math.round((accountScore / 1500) * 100))}%`; });
document.querySelectorAll('.nav-count').forEach(element => { element.textContent = activeTodayCount; });
document.querySelectorAll('.rank-you .rank-person strong').forEach(element => { element.innerHTML = `${displayName} <em>You</em>`; });
document.querySelectorAll('.avatar, .rank-avatar').forEach(element => {
  if (element.classList.contains('avatar-you') || element.classList.contains('avatar') || element.classList.contains('rank-avatar')) {
    if (profile?.profileImage) {
      element.textContent = '';
      element.style.backgroundImage = `url("${profile.profileImage}")`;
      element.style.backgroundSize = 'cover';
      element.style.backgroundPosition = 'center';
    } else element.textContent = initials;
  }
});
document.querySelectorAll('[aria-label*="Jamie Doe"]').forEach(element => { element.setAttribute('aria-label', `${displayName} profile`); });
const todayHeading = document.querySelector('#today h1');
if (todayHeading) todayHeading.firstChild.nodeValue = `Good morning, ${displayName} `;
