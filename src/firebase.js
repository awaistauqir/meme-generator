// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDlkdiYuBFOe2CrOr_q8uIserjnifeNA1w',
	authDomain: 'meme-generator-cd5e6.firebaseapp.com',
	projectId: 'meme-generator-cd5e6',
	storageBucket: 'meme-generator-cd5e6.appspot.com',
	messagingSenderId: '306109536088',
	appId: '1:306109536088:web:040890b5c23d0f4f18772d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
const db = getFirestore();

export { db };
