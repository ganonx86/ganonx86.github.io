const profileForm = document.querySelector('#profileForm');
const profileStatus = document.querySelector('#profileStatus');
const connectedAccount = document.querySelector('#connectedAccount');
const profileImage = document.querySelector('#profileImage');
const profileImagePreview = document.querySelector('#profileImagePreview');
const profileImageFallback = document.querySelector('#profileImageFallback');
const account = JSON.parse(localStorage.getItem('questscore-account') || 'null');
if (!account || !account.activated) window.location.href = 'login.html';
connectedAccount.textContent = account ? `${account.email} account connected` : '';
const savedProfile = JSON.parse(localStorage.getItem('questscore-profile') || 'null');
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
  localStorage.setItem('questscore-profile', JSON.stringify(profile));
  profileStatus.textContent = 'Profile saved. Your quests are ready.';
  setTimeout(() => { window.location.href = 'index.html'; }, 700);
});
