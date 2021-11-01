// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCqpqSb8SDzLCJnAMBJYUpsQgGYv6j-PJ8',
  authDomain: 'rp-character-creator-945e4.firebaseapp.com',
  projectId: 'rp-character-creator-945e4',
  storageBucket: 'rp-character-creator-945e4.appspot.com',
  messagingSenderId: '227011382366',
  appId: '1:227011382366:web:559f48b636b5a67f6c38cf',
  measurementId: 'G-2BTNKT87WV',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Export plugins
export const analytics = getAnalytics(app)
export const db = getFirestore(app)
