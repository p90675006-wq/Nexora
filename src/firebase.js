import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD33aIGdSo8dfLWuYCuFyz4vtoUDt96Ykc',
  authDomain: 'studymate-91784.firebaseapp.com',
  projectId: 'studymate-91784',
  storageBucket: 'studymate-91784.firebasestorage.app',
  messagingSenderId: '190411914673',
  appId: '1:190411914673:web:c72e62b791d370b0395190',
  measurementId: 'G-J1DD727PCT',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
