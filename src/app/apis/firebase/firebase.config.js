import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseTypes } from './firebase.types';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: firebaseTypes.API_KEY,
  authDomain: firebaseTypes.AUTH_DOMAIN,
  projectId: firebaseTypes.PROJECT_ID,
  storageBucket: firebaseTypes.STORAGE_BUCKET,
  messagingSenderId: firebaseTypes.MESSAGING_SENDER_ID,
  appId: firebaseTypes.APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;