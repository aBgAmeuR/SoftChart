import { getAnalytics } from "firebase/analytics"
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyCnIXAV3QiKLwCES4eyYmiwB1DpY8zIxek",
  authDomain: "softchart-438c7.firebaseapp.com",
  projectId: "softchart-438c7",
  storageBucket: "softchart-438c7.appspot.com",
  messagingSenderId: "233432917106",
  appId: "1:233432917106:web:104e33fd0a57a956e80eeb",
  measurementId: "G-CG4PXH49K4",
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
