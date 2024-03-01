import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDM4_toiM8KfUx80v19QsO2x8vGmHI8itk',
  authDomain: 'react-bootcamp-skooldio.firebaseapp.com',
  projectId: 'react-bootcamp-skooldio',
  storageBucket: 'react-bootcamp-skooldio.appspot.com',
  messagingSenderId: '210749983783',
  appId: '1:210749983783:web:da599b5e99da4a67e29202',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
