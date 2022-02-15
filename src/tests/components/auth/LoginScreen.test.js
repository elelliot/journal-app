import '@testing-library/jest-dom';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom'

import { LoginScreen } from "../../../components/auth/LoginScreen"
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';
//import { startGoogleLogin } from '../../../actions/auth';

jest.mock('../../../actions/auth', ()=> ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}))


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

//Le asignamos el estado que tendría al estar en el LoginScreen, o al menos lo escencial
const initState = {
    auth: {},
    ui:{
        loading: false,
        msgError: null
    }
};

let store = mockStore( initState );

//simulamos el dispatch del handleGoogleLogin (startGoogleLogin) y del handleLogin (startLoginEmailPassword)
store.dispatch = jest.fn();

const wrapper = mount( 
    //Necesito darle acceso al test al context value, y para eso es el provider
    //Y como no hay state hay que crear un mock del store
    <Provider store={ store }>
        {/* Necesito MemoryRouter cuando trabajo con rutas
        ayuda a fingirlas y trabajar como si estuviera en el navegador con las rutas pero en la consola*/}
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
    </Provider>
);


describe('Pruebas en <LoginScreeen />', () => {

    beforeEach( () => {
        store= mockStore( initState );
        jest.clearAllMocks(); //es buena práctica limpiar los mocks
    })

    test('Debe Mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot()
    });


    test('Debe de disparar la acción de startGoogleLogin', () => { 

        //llamamos el onClick, otra opción era el simulate click pero creo que solo aplica cuando es botón y este es div
        wrapper.find('.google-btn').prop('onClick')();
        expect( startGoogleLogin ).toHaveBeenCalled();

    });


    test('Debe disparar el startLoginEmailPass con los respectivos args', () => {
        
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        }); //el preventDefault se manda aquí 
        expect( startLoginEmailPassword ).toHaveBeenCalledWith('elelliot@gmail.com','123456');
    })

})