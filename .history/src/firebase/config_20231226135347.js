// Importa solo las funciones que necesitas de firebase/app
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAfNqnGX9jnsCuIXugoWL9mR_E1YnLALCE",
  authDomain: "deliverapp-1fc04.firebaseapp.com",
  projectId: "deliverapp-1fc04",
  storageBucket: "deliverapp-1fc04.appspot.com",
  messagingSenderId: "341484835756",
  appId: "1:341484835756:web:c15c49beca6d51e581a009",
  measurementId: "G-FSL64LZYFP"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa los servicios de Firebase
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// Exporta los servicios
export { auth, firestore, storage };