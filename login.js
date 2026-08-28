import { auth, googleProvider, signInWithPopup } from './firebase-config.js';

const loginStatus = document.querySelector('#loginStatus');
const googleLogin = document.querySelector('#googleLogin');

googleLogin.addEventListener('click', async () => {
  if (location.protocol === 'file:') {
    loginStatus.textContent = 'Please run the app from a local web server: http://localhost:8000/login.html. Firebase Auth does not work from a file:// page.';
    googleLogin.disabled = false;
    return;
  }

  googleLogin.disabled = true;
  loginStatus.textContent = 'Connecting to Google...';
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const googleName = user.displayName || user.email.split('@')[0];
    const account = { uid: user.uid, email: user.email, googleDisplayName: googleName, profile: { gamertag: googleName, firstName: user.displayName?.split(' ')[0] || '', lastName: user.displayName?.split(' ').slice(1).join(' ') || '', profileImage: user.photoURL || '' }, gamerscore: 0, achievements: [], isNew: true };
    const accounts = JSON.parse(localStorage.getItem('questscore-accounts') || '[]');
    const existingIndex = accounts.findIndex(item => item.email === user.email);
    const savedAccount = existingIndex >= 0 ? { ...accounts[existingIndex], ...account, profile: accounts[existingIndex].profile || account.profile } : account;
    if (existingIndex >= 0) accounts[existingIndex] = savedAccount;
    else accounts.push(savedAccount);
    localStorage.setItem('questscore-accounts', JSON.stringify(accounts));
    const savedProfile = savedAccount.profile;
    localStorage.setItem('questscore-account', JSON.stringify(savedAccount));
    sessionStorage.setItem('questscore-session', user.email);
    const profile = savedProfile || account.profile;
    const hasCompleteProfile = profile?.gamertag && profile?.firstName && profile?.lastName && profile?.country && profile?.town && profile?.zipCode;
    window.location.href = hasCompleteProfile ? 'dashboard.html' : 'profile-creation.html';
  } catch (error) {
    loginStatus.textContent = error.code === 'auth/popup-closed-by-user' ? 'Google sign-in was cancelled.' : 'Google sign-in failed. Please try again.';
    googleLogin.disabled = false;
  }
});
