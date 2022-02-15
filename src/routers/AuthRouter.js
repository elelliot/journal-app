import React from 'react'
//react-router-dom v5
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Redirect,
//   } from "react-router-dom";

//react-router-dom v6
import { Routes, Route, Navigate} from "react-router-dom";

import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';


export const AuthRouter = () => {
    return (
        //react-router-dom v5
        // <Router>
        //     <div>
        //         <Switch>
        //             <Route exact path="/auth/login" component ={ LoginScreen }/>
        //             <Route exact path="/auth/register" component ={ RegisterScreen }/>

        //             <Redirect to ="/auth/login" />

        //         </Switch>
        //     </div>
        // </Router>


        //react-router-dom v6, como Authrouter es hijo de AppRouter
        //estilos de sass en el _auth.scss
        <div className="auth__main">
            <div className="auth__box-container">
                <Routes>
                    <Route path="login" element={ <LoginScreen /> } />
                    <Route path="register" element={ <RegisterScreen /> } />
                    
                    <Route path="/" element={ <Navigate to="login" /> } />
                    <Route path="*" element={ <Navigate to="login" /> } />
                </Routes>
            </div>
        </div>
    )
}
