import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// Tus credenciales de configuración de Firebase
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
firebase.initializeApp(firebaseConfig);

// Exporta los servicios que vas a utilizar
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
