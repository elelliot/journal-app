
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { login, logout, startLoginEmailPassword, startLogout } from '../../actions/auth';
import { types } from '../../types/types';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore( initState );


describe('Pruebas en acciones de auth.js', () => { 

    beforeEach( () => {
        store= mockStore( initState )
    })


    test('login y logout deben crear la acción respectiva', () => { 

        //Hacemos dispatch de login y obtenemos las acciones
        const uid= 'TESTING'
        const displayName= 'TestName'

        const loginAction = login( uid, displayName );
        const logoutAction = logout();

        expect( loginAction ).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        });
        expect( logoutAction ).toEqual({
            type: types.logout
        });

    });


    test('Debe realizar el startLogout', async() => { 

        await store.dispatch( startLogout() );
        const actions = store.getActions();
        //console.log(actions);

        expect( actions[0] ).toEqual( {type: types.logout} );
        expect( actions[1] ).toEqual( {type: types.notesLogoutCleaning} );
    });


    test('debe iniciar el startLoginWithEmailPassword', async() => {
        /*Para esta prueba activamos los methodos de autenticación por correo y google en la BDD de pruebas de firestore
        también creamos un nuevo user de correo y pass:
        test@testing.com 123456      */
        await store.dispatch( startLoginEmailPassword('test@testing.com', '123456') );

        //Para que me de las acciones que quiero probar, debo agregar el dispatch del login aunque lo vaya a ejecutar 2 veces
        const actions = store.getActions();
        //console.log(actions)

        expect( actions[1] ).toEqual({
            type:types.login,
            payload:{
                uid: 'dJ6s8kRzbmay0Nie4QEwl0u7mlB2',
                displayName: null //el uid lo agarro de firestore del user que hice, y el displayName es null por qué no usé la app para registrar este user
            }
        })
    })

 })
