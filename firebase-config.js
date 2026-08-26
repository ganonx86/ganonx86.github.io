import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js';
import { getAnalytics, isSupported } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDwJpVYmSBk4DyW4ffVEaTxfXZrTq5Kp5c',
  authDomain: 'authentification-tmg.firebaseapp.com',
  projectId: 'authentification-tmg',
  storageBucket: 'authentification-tmg.firebasestorage.app',
  messagingSenderId: '772836051541',
  appId: '1:772836051541:web:1408f9b646cdb719dea2dc',
  measurementId: 'G-FGKZ4JSQWQ'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = isSupported().then(supported => supported ? getAnalytics(app) : null);

export { app, analytics, auth, googleProvider, onAuthStateChanged, signInWithPopup, signOut };
