const profileForm = document.querySelector('#profileForm');
const profileStatus = document.querySelector('#profileStatus');
const connectedAccount = document.querySelector('#connectedAccount');
const profileImage = document.querySelector('#profileImage');
const profileImagePreview = document.querySelector('#profileImagePreview');
const profileImageFallback = document.querySelector('#profileImageFallback');
const accounts = JSON.parse(localStorage.getItem('questscore-accounts') || '[]');
const sessionEmail = sessionStorage.getItem('questscore-session');
const account = accounts.find(item => item.email === sessionEmail) || JSON.parse(localStorage.getItem('questscore-account') || 'null');
if (!account) window.location.href = 'login.html';
connectedAccount.textContent = account ? `${account.email} account connected` : '';
const profileActions = document.querySelector('.profile-actions');
const disconnectBtn = document.querySelector('#disconnectBtn') || document.createElement('button');
if (!disconnectBtn.id) profileActions.prepend(disconnectBtn);
disconnectBtn.className = 'button button-danger';
disconnectBtn.type = 'button';
disconnectBtn.id = 'disconnectBtn';
disconnectBtn.textContent = 'Disconnect profile';
profileActions.prepend(disconnectBtn);
const savedProfile = account?.profile || JSON.parse(localStorage.getItem('questscore-profile') || 'null');
if (savedProfile) Object.entries(savedProfile).forEach(([name, value]) => {
  if (name !== 'profileImage' && profileForm.elements[name]) profileForm.elements[name].value = value;
});
function showProfileImage(image) {
  if (!image) return;
  profileImagePreview.src = image;
  profileImagePreview.hidden = false;
  profileImageFallback.hidden = true;
}
if (savedProfile?.profileImage) showProfileImage(savedProfile.profileImage);
profileImage.addEventListener('change', () => {
  const file = profileImage.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener('load', () => showProfileImage(reader.result));
  reader.readAsDataURL(file);
});
profileForm.addEventListener('submit', event => {
  event.preventDefault();
  const profile = Object.fromEntries(new FormData(profileForm));
  profile.profileImage = profileImagePreview.hidden ? savedProfile?.profileImage || '' : profileImagePreview.src;
  account.isNew = false;
  account.profile = profile;
  const updatedAccounts = accounts.some(item => item.email === account.email) ? accounts.map(item => item.email === account.email ? account : item) : [...accounts, account];
  localStorage.setItem('questscore-accounts', JSON.stringify(updatedAccounts));
  localStorage.setItem('questscore-account', JSON.stringify(account));
  localStorage.setItem('questscore-profile', JSON.stringify(profile));
  profileStatus.textContent = 'Profile saved. Your quests are ready.';
  setTimeout(() => { window.location.href = isCreatingProfile ? 'dashboard.html' : 'index.html'; }, 700);
});
disconnectBtn?.addEventListener('click', async () => {
  sessionStorage.removeItem('questscore-session');
  localStorage.removeItem('questscore-account');
  window.location.replace('login.html');
  import('./firebase-config.js').then(({ auth, signOut }) => signOut(auth)).catch(() => {});
});
