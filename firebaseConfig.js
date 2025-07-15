// Importa los módulos
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDrtzYYMXIDcIR752SPuxmd8U-gW9HO1-k",
  authDomain: "login-c54e4.firebaseapp.com",
  projectId: "login-c54e4",
  storageBucket: "login-c54e4.firebasestorage.app",
  messagingSenderId: "292914294664",
  appId: "1:292914294664:web:dc3cd330cba8ccceafd43d",
  measurementId: "G-BVDCNLX0JL"
};


// Evita inicializar más de una vez
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Exporta auth correctamente
export const auth = getAuth(app);