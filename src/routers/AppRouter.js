import React, { useEffect, useState } from 'react'
//react-router-dom v5
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Redirect,
//   } from "react-router-dom";

//react-router-dom v6
import { Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
// import { RegisterScreen } from '../components/auth/RegisterScreen';
// import { LoginScreen } from '../components/auth/LoginScreen';


import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';



export const AppRouter = () => {

    const dispatch = useDispatch();

    
    //Revsiando si estamos auth, o no .Mientras checking sea true , se mostrará una pantalla de carga.
    const [ checking, setChecking ] = useState(true);

    //Variable para saber si estamos autenticados
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);





    //Cada que la app se actualice, hacemos el login para mantener el state, si no estamos logueados no pasa nada
    useEffect(() => {
        //onAuthStateChanged regresa un "unSubscribe", crea un observer, se dispara este objeto al cambiar la autenticación
        //para hacer una limpieza de esto, se extrae en una variable y hacer el unSuscribe, pero como siempre queremos estar pendientes de la autenticacion no lo hacemos
        
        /*
        Cuando createUserWithEmailAndPassword termina el proceso, quiere loguearte, justo ahí es cuando cambia el state de 
        autenticación, y es cuando se dispara el useEffect, y con eso se dispara el dispatch antes de que el displayName sea cambiado
        por tanto se verá como null.
        Después del effect, termina el updateProfile y se hace el dispatch de nuevo y esta vez si viene con el displayName.
        
        Por tanto, para evitar el disparo del state con el displayName = null al registrarse, ponemos que debe existir el displayName
        también en el if, y así se dispara solo cuando ambos existan (por alguna razón empezó a no loguearse al terminar el register y lo quité del if). 
        
        */
        const auth = getAuth();
        onAuthStateChanged( auth, async (user) => {
            //si no está autenticado, user es null
            
            //si el user tiene algo (para eso es: ?) entonces pregunta si existe el uid, si el user es null la condicion termina
            
            if ( user?.uid /*&& user?.displayName*/ ) {
                //hacemos dispatch del login para mantener el estado (También hay un 2do state de login por esto)
                
                dispatch( login(user.uid, user.displayName));
                setIsLoggedIn( true );

                //mandamos las notas a la acción
                dispatch( startLoadingNotes( user.uid ) );

                
            } else{
                setIsLoggedIn( false );
            }

            //En cuanto tengamos respuesta de Firebase cambiamos el checking a false
            setChecking(false);
        });
    }, [ dispatch, setChecking, setIsLoggedIn ]);
    

    if( checking ){
        //si checking es true, tiramos una pantalla de carga, lo que sea, incluso un componente, pero por ahora esto.
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        
        //react-router-dom v6

        <BrowserRouter>
            <Routes>
                <Route path="/auth/*" element= { 
                    <PublicRoute userIsLogged = { isLoggedIn } >
                        <AuthRouter /> 
                    </PublicRoute>
                } />


                <Route path="/" element={ 
                    <PrivateRoute userIsLogged = { isLoggedIn } >
                        <JournalScreen /> 
                    </PrivateRoute>
                } />
                
                <Route path="*" element={ <Navigate to="/auth/login" /> } />
            </Routes>
        </BrowserRouter>







        //react-router-dom v5
        // <Router>
        //     <div>
        //         <Switch>
        //             <PublicRoute 
        //                 path="/auth" 
        //                 component ={ AuthRouter }
        //                 userIsLogged = { isLoggedIn }
        //             />


        //             <PrivateRoute 
        //                 exact 
        //                 userIsLogged = { isLoggedIn }
        //                 path="/" 
        //                 component ={ JournalScreen }
        //             />

        //             <Redirect to ="/auth/login" />


        //         </Switch>
        //     </div>
        // </Router>

        /* Por si no sirvieran las dos rutas de arriba
        <Route
            exact
            path="/"
            render={()=>(
              <PrivateRoute userIsLogged={ isLoggedIn }>
                <JournalScreen />
              </PrivateRoute>
            )}
          />
 
          <Route
            path="/auth"
            render={()=>(
              <PublicRoute userIsLogged={ isLoggedIn }>
                <AuthRouter />
              </PublicRoute>
            )}
          />
        */
        
    )
}
