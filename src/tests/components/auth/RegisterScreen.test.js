import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router-dom'

import { RegisterScreen } from "../../../components/auth/RegisterScreen"
import { types } from '../../../types/types';



const middlewares = [thunk];
const mockStore = configureStore(middlewares);

//Le asignamos el estado que tendría el RegisterScreen, o al menos lo escencial
const initState = {
    auth: {},
    ui:{
        loading: false,
        msgError: null
    }
};
let store = mockStore( initState );
//store.dispatch = jest.fn();

const wrapper = mount(
        <Provider store = { store }>
            <MemoryRouter>
                <RegisterScreen />
            </MemoryRouter>
        </Provider>
);

describe('Pruebas en <RegisterScreen />', () => {


    test('Debe mostrarse correctamente', () => {

        expect(wrapper).toMatchSnapshot();
    });


    test('Debe hacer el dispatch de la acción respectiva', () => {

        const emailField = wrapper.find('input[name="email"]');//seleccionamos un elemento por el name
        //console.log(emailField.exists())
        
        //Modificamos el campo, ahora el email está vacío en el registerForm
        emailField.simulate('change',{
            target:{
                value:'',
                name:'email'
            }
        });

        //Simulamos el submit del form con el campo de email vacío(igual se puede hacer con el prop que sería onSubmit)
        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        });

        //Como el aviso de error es sincrono, no necesitamos el store.dispatch = jest.fn(), osea simular el async dispatch
        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.uiSetError,
            payload: 'Email not Valid'
        });
    })


    test('Debe mostrar la alerta con el error (el div, no el Swal)', () => {

        const initState = {
            auth: {},
            ui:{
                loading: false,
                msgError: 'Email not valid (Test)'
            }
        };
        const store = mockStore( initState );
        
        const wrapper = mount(
                <Provider store = { store }>
                    <MemoryRouter>
                        <RegisterScreen />
                    </MemoryRouter>
                </Provider>
        );


        expect( wrapper.find('.auth__alert-error').exists() ).toBe( true );
        expect( wrapper.find('.auth__alert-error').text().trim() ).toBe( initState.ui.msgError );
    })
})