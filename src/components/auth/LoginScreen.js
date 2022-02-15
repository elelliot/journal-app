import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {
    
    //igual que en el RegisterScreen, obtenemos el loading del ui del state de redux
    //esto va en el disabled = del botón de login
    const { loading } = useSelector( state => state.ui );
    
    //dispatch de acciones al store con redux 
    const dispatch = useDispatch();

    //Form
    const [ formValues, handleInputChange ] = useForm({
        email: 'elelliot@gmail.com',
        password: '123456'

    });

    const { email, password } = formValues;



    //Submit
    const handleLogin = (e) => {
        e.preventDefault();//para que no se refresque
        // console.log(email, password)
        //dispatch(login(123,'ElElliot'))

        //dispatch(el de Redux) de acción al store, recibe email y password en el actions/auth.js
        dispatch( startLoginEmailPassword(email, password) );

    }

    //botonazo de google
    const handleGoogleLogin = () =>{

        //como usamos signInwithPopup, no evitamos el refresh, pero para movil, sería apropiado manejarlo
        dispatch( startGoogleLogin() )
    }

    return (
        // Formulario V1
        <div className='animate__animated animate__fadeIn animate__faster'>
            <h3 className="auth__title">Login</h3>
            <form onSubmit ={ handleLogin }>
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="on"
                    value = { email }
                    onChange = { handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    autoComplete="on"
                    value = { password }
                    onChange = { handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={ loading }
                >
                    Login
                </button>

                {/* Botón de Google, se supone que el auth te dice que está en ese archivo, y luego iría la clase, pero something´s off*/}
                <div className="auth__social-networks">
                    <p>Login with social network</p>
                    <div 
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                        >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Create new Account
                </Link>


            </form>
        </div>

    )
}
