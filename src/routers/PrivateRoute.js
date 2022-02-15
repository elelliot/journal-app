import React from 'react'
//import { useContext } from 'react'
import { Navigate } from 'react-router-dom';
//import { AuthContext } from '../auth/authContext';




//children es una prop que agrupa todos los hijos de un higher order component en un arreglo
export const PrivateRoute = ({ children, userIsLogged }) => {

    /*si el user ta logueado, renderiza children, si no lo redireccionamos, pero como necesitamos regresar un componente,
    usamos el componente Navigate*/
    /*Si estás logueado, vete a children, si no, a login*/
    return userIsLogged
        ? children
        : <Navigate to="/auth/login" />
}



/* 
Para React Router Dom 5
import { Redirect } from 'react-router-dom'

export const PrivateRoute = ({ userIsLogged, children }) => {
    return userIsLogged ? 
        children
        : <Redirect 
            to={'/auth'}
        />
}

PrivateRoute.propTypes = {
    userIsLogged : PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
*/