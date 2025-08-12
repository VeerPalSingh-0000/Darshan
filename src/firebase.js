import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// --- IMPORTANT ---
// Replace this with your own Firebase project's configuration object.
// You can find this in your Firebase project settings.
const firebaseConfig = {
  apiKey: "AIzaSyAGwOxPWFk6gqvMVXavNn3fFasJgOP_QCk",
  authDomain: "darsana-2f361.firebaseapp.com",
  projectId: "darsana-2f361",
  storageBucket: "darsana-2f361.firebasestorage.app",
  messagingSenderId: "692897519529",
  appId: "1:692897519529:web:03207af130b5c147e416b8",
  measurementId: "G-JLV89SKVKR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Export the instances to be used in other parts of your app
export { db, auth };
