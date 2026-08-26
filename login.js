import { auth, googleProvider, signInWithPopup } from './firebase-config.js';

const loginStatus = document.querySelector('#loginStatus');
const googleLogin = document.querySelector('#googleLogin');

googleLogin.addEventListener('click', async () => {
  googleLogin.disabled = true;
  loginStatus.textContent = 'Connecting to Google...';
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const account = { uid: user.uid, email: user.email, profile: { firstName: user.displayName?.split(' ')[0] || '', lastName: user.displayName?.split(' ').slice(1).join(' ') || '', profileImage: user.photoURL || '' }, gamerscore: 0, achievements: [], isNew: true };
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
    const hasCompleteProfile = profile?.gamertag && profile?.firstName && profile?.lastName && profile?.birthDate && profile?.country && profile?.town && profile?.zipCode;
    window.location.href = hasCompleteProfile ? 'dashboard.html' : 'profile-creation.html';
  } catch (error) {
    loginStatus.textContent = error.code === 'auth/popup-closed-by-user' ? 'Google sign-in was cancelled.' : 'Google sign-in failed. Please try again.';
    googleLogin.disabled = false;
  }
});
