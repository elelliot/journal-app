import React from 'react'
import { Navigate } from 'react-router-dom';




export const PublicRoute = ({ children, userIsLogged }) => {


    //console.log(userIsLogged);
    /*Si estás logueado, no puedes irte al login*/
    return userIsLogged
        ? <Navigate to="/" />
        : children
}



/*
import { Redirect } from 'react-router-dom'
export const PublicRoute = ({ userIsLogged, children }) => {

    return userIsLogged ?
        <Redirect to={'/'} />
        :
        children
}

PublicRoute.propTypes = {
    userIsLogged: PropTypes.bool.isRequired
    component: PropTypes.func.isRequired
}
*/