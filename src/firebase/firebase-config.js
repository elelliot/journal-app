import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

//Ahora usamos las variables de entorno y así se sabrá como asignar las config de las BDD dependiendo del entorno
const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY ,
    authDomain: process.env.REACT_APP_AUTHDOMAIN ,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
}

//console.log( process.env );

initializeApp(firebaseConfig);



//base de datos
const db = getFirestore();
//autenticación con google (aplica para las demás, como github etc.)
const googleAuthProvider = new GoogleAuthProvider();

export {
    db, 
    googleAuthProvider
}















/*Hay muchas propiedades del proceso de la app, como variables de entorno.Lo que buscamos es el NODE_ENV, 
el cual puede estar en test, production o development

Para crear variables de entorno en React, en este caso para testing, creamos el file en la raíz del proyecto.
y para obtenerlas, las buscamos en el process.env.
NOTAS:
-Un archivo por entorno, es decir, uno para testing, otro para development y otro para production.
-Deben empezar con REACT_APP_
-Solo pueden ser Strings por como se declaran, para hacerlas numeros parsearlas.
-Si no aparecen, bajar las pruebas o app y correrlas de nuevo.
*/
//console.log( process.env );




//Esto ahora se reemplazó para hacerlo con variables de entorno
//Configuramos firebase en el proyecto de forma tradicional y condicional:
// const firebaseConfig = {
//     apiKey: "AIzaSyDptzdE5jFsFbkDE2iLqoNGCIRUtlKfSFA",
//     authDomain: "journal-app-react-d97e2.firebaseapp.com",
//     projectId: "journal-app-react-d97e2",
//     storageBucket: "journal-app-react-d97e2.appspot.com",
//     messagingSenderId: "96856689919",
//     appId: "1:96856689919:web:4814230b8b4aa9bbf050ca"
// };

//BD de Testing en Redux-demo
// const firebaseConfigTesting = {
//   apiKey: "AIzaSyAVGe9Z5Rj8jRE9BDhVmRfecS7krtxmW20",
//   authDomain: "redux-demo-6f2ed.firebaseapp.com",
//   projectId: "redux-demo-6f2ed",
//   storageBucket: "redux-demo-6f2ed.appspot.com",
//   messagingSenderId: "164820878328",
//   appId: "1:164820878328:web:63de6399b56eed40c78c0d"
// };  
// Initialize Firebase de forma condicional (AHORA SE HACE CON VARIABLES DE ENTORNO)

// if( process.env.NODE_ENV ==='test') {
//     //testing
//     initializeApp(firebaseConfigTesting);
// } else {
//     //dev/prod
//     initializeApp(firebaseConfig);
// }