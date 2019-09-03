import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
//  Configuración de Firebase
var config = {
    apiKey: "AIzaSyAQJAHB40ne0EENFkLr2r1qmXtsKL4nrcs",
    authDomain: "jwmanagement-f3951.firebaseapp.com",
    databaseURL: "https://jwmanagement-f3951.firebaseio.com",
    projectId: "jwmanagement-f3951",
    storageBucket: "",
    messagingSenderId: "422514159596",
    appId: "1:422514159596:web:efdc228e7ccf735c"
  };
  // Inicialización de Firebase
  const fb = firebase.initializeApp(config);
  const db = firebase.firestore();
  export {fb, db};