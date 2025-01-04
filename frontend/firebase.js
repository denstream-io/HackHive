import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const githubProvider = new GithubAuthProvider();

// Set authentication persistence to local (session or local)
setPersistence(auth, browserLocalPersistence) // use browserSessionPersistence for session-level persistence
  .then(() => {
    // The state persistence is now set
    console.log('Persistence set to local');
  })
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });

export { auth, githubProvider, signInWithPopup };
