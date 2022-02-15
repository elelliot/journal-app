

import { getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { Toast } from "../alerts/alert";
import { googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types"
import { noteLogout } from "./notes";
import { finishLoading, startLoading } from "./ui";

//Alerts ver en alert.js
const welcome = () => { Toast.fire({
    iconColor: '#41D70C',
    icon: 'success',
    title: 'Welcome, what do we have for today? ^u^/'
  })};

const loginErr = () => {Toast.fire({
    icon: 'error',
    title: 'User or Password might be wrong or don\'t exist, try again ^u^'
  })};


const emailUsed = () => {Toast.fire({
    icon: 'error',
    title: 'Email already used'
  })};
//actions


//acción que dispara otra acción(login) cuando el setTimeout(tarea asíncrona) se resuelve
export const startLoginEmailPassword = (email, password) => {

    //al usar el dispatch de redux, la funcion retorna un callback ()=> ,y uno de sus args es el dispatch de Thunk  (todo adentro del callback se ejecuta)
    //se espera que se use el dispatch para trabajar los datos que llegan de una tarea async

    //se pueden realizar fetch, posteo de archivos o incluso dispatch de otra acción dentro del callback
    return (dispatch) => {
    
        //loading: true
        dispatch( startLoading() );

        //Para loguearse con email y password
        const auth = getAuth();
           return signInWithEmailAndPassword(auth, email, password)
            .then( ({user}) => {
                //console.log(user)
                //Mandamos uid y displayName al state cuando se hace login
                //dispatch( login( user.uid, user.displayName) );
                
                //PA LAS PRUEBAS puse el return y el dispatch del login(con esto se dispararía 2 veces en la app):
                dispatch( login( user.uid, user.displayName) );
                
                welcome()
            })
            .catch( ({ message }) => {
                
                //Args: Title, HTML, Icon... Alerta de error de Sweet Alert2
                //Swal.fire('Error', message, 'error');
                
                loginErr()
            })
            .finally( () => {
                //Para no tener que usar el finishLoading 2 veces podemos usarlo una vez aquí y en cualquiera de los 2 casos se llama
                //loading: false
                dispatch( finishLoading() );
            });
    }
}



//Registrar email
export const startRegisterWithEmail = ( email, password, name ) => {
    //en cuanto tenga el user grabado en firebase realizaré el dispatch
    return( dispatch ) => {

        const auth = getAuth();
        //en cuanto se crea el user esto intenta autenticar inmediatamente por eso da error por ahora.
        createUserWithEmailAndPassword(auth, email, password)
            .then( async ({ user }) => {
                
                //"displayName" es null usando esta función, solo se obtiene cuando se usa una red social como login
                //podemos asignar el name(el que damos en el form) al displayName con updateProfile
                await updateProfile(user,{displayName: name})
                
                //ya que el useEffect se ejecuta antes del updateProfile, el name es null, así que por ahora haremos el mismo dispatch con el nombre obtenido del update y tendremos 2 login al terminar el registro
                dispatch( login(user.uid, user.displayName ) )
                welcome()
            })
            .catch( ({ code } ) => {
                //desestructuramos message de error
                
                emailUsed()
            });
    }
}



//login con google 
export const startGoogleLogin = () =>{
    return (dispatch) =>{
        const auth = getAuth();
        //(aquí me tira el popup de login)
        signInWithPopup(auth, googleAuthProvider)
        //se obtiene el parametro por default y desestructuramos user del mismo
            .then( ({ user }) =>{
                //desestructuramos para obtener uid y displayName (user es solo una propiedad del objeto grande que te da la promise al cumplirse, por eso se ponen así en específico):
                //dispatch( login( user.uid, user.displayName ) );
                
                welcome()
            })
            .catch( ( { code } )  => {
                //por si se cierra el popup sin haber seleccionado usuario
                
                // const errorCode = error.code;
                // const errorMessage = error.message;
                //console.log(message);
                Toast.fire({
                    icon: 'error',
                    title: code
                  })
            });
    }
}


//El login que se usa en las otras 2 acciones
export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid, 
        displayName
    }
});


//Logout es Async por que hay que se usa una función firebase para esto y usa promesa

export const startLogout = () => {
    return async( dispatch ) => {
        const auth = getAuth();
        await signOut(auth)
            .then( ()=>{

                //limpiamos el user del state 
                dispatch( logout() );
                //limpiamos las notas del state
                dispatch( noteLogout() );
            })
            .catch( (e) => {
                console.log(e); //no suele pasar pero en caso de que se vaya el internet o algo
            })
    }
}

export const logout = () => ({
    type: types.logout,
});


//forma larga del return
// export const login = (uid, displayName) => {
//     return {
//         type: types.login,
//         payload: {
//             uid, 
//             displayName
//         }
//     }
// }


