import React from 'react';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmail } from '../../actions/auth';

export const RegisterScreen = () => {
    //dispatch de acciones al store con redux
    const dispatch = useDispatch();

    /*useSelector es un hook que dispara un callback en el cual tengo el state completo del store de Redux
    queremos agarrar el mensaje de error, como está en el ui lo extraemos con su nombre.*/
    const {msgError} = useSelector( state => state.ui );

    //Recordar que React redibuja y dispara el mensaje con cualquier cambio, y el msgError por defecto es null
    //console.log(msgError);


    //Form
    const [ formValues, handleInputChange ] = useForm({
        name:'Elliot',
        email:'elelliot@gmail.com',
        password: 123456,
        password2: 123456
    });
    const { name, email, password, password2 } = formValues;
    
    //Submit
    const handleRegister = (e) =>{
        //Evitamos Refresh y propagación por el URL
        e.preventDefault();
        
        if ( isFormValid() ){
            
            //console.log('Formulario Correcto');
            //dispatch para registrar a firebase con correo (debe ser diferente al de google)

            dispatch( startRegisterWithEmail(email, password, name) );
        }

    }

    /*
    Validamos Formulario (en lugar de hacer RegEx una alternatva sería usar la librería de npm Validator)
    el <input type="email"> no se usó, why?
    -dispatch al store de cada mensaje de error
    */
    const isFormValid = () => {
        
        if( name.trim().length === 0){
            //Si no hay nada escrito en el nombre
            dispatch( setError('Name is Required') );
            
            return false;
        } else if( !validator.isEmail( email ) ){
            //si el email no es válido (usamos la librería de validator para eso)
            dispatch( setError('Email not Valid') );
            
            //console.log('Email not Valid'); 

            return false;
        } else if ( password !== password2 || password.length < 5 ) {
            //Si el Password no coincide o si es menor a 5 car. 
            //QUEDA PENDIENTE CAMBIAR EL COMPORTAMIENTO (VER MI PREGUNTA EN UDEMY CLASE 251)
            dispatch( setError('Password should be at least 6 characters and Match each other') );
            
            //console.log('Password should be at least 6 characters and Match each other');
            return false;
        }
        //si es válido
        dispatch( removeError() ); 
        return true;
    }


    return (
        <div className='animate__animated animate__fadeIn animate__faster'>
            <h3 className="auth__title">Register</h3>

            
            {
                //Mensaje de Error del Formulario se maneja en la acción setError para usar Sweet Alert, 
                //ya que el msgError es null cuando queremos usarlo en el isFormValid y usarlo aquí rompe la app
                //si msgError es !== null muestra el mensaje de error
                msgError &&
                (
                    <div className="auth__alert-error">
                        { msgError }
                    </div>
                )
            }

            <form onSubmit ={ handleRegister }>
            <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange = { handleInputChange }
                />
                
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange = { handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    autoComplete="on"
                    value={ password }
                    onChange = { handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    className="auth__input"
                    autoComplete="on"
                    value={ password2 }
                    onChange = { handleInputChange }
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                    // disabled={ true }
                >
                    Register
                </button>

                <Link 
                    to="/auth/login"
                    className="link "
                >
                    Already Registered?
                </Link>


            </form>
        </div>
    )
}
