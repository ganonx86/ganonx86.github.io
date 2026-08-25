const accounts = JSON.parse(localStorage.getItem('questscore-accounts') || '[]');
const sessionEmail = localStorage.getItem('questscore-session');
const account = accounts.find(item => item.email === sessionEmail) || JSON.parse(localStorage.getItem('questscore-account') || 'null');
const profile = account?.profile || JSON.parse(localStorage.getItem('questscore-profile') || 'null');
const fullName = [profile?.firstName, profile?.lastName].filter(Boolean).join(' ');
const displayName = profile?.gamertag || fullName || account?.email?.split('@')[0] || 'Player';
const initials = (profile?.firstName?.[0] || displayName[0] || 'P').concat(profile?.lastName?.[0] || '').toUpperCase();
document.querySelectorAll('.mini-profile strong').forEach(element => { element.textContent = displayName; });
document.querySelectorAll('.mini-profile span').forEach(element => { element.textContent = fullName || 'Score chaser'; });
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
