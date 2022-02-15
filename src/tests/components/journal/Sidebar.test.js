import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { Sidebar } from "../../../components/journal/Sidebar";
import { startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";


jest.mock('../../../actions/auth', ()=> ({
    startLogout: jest.fn()
}));

jest.mock('../../../actions/notes', ()=> ({
    startNewNote: jest.fn()
}))


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

//Le asignamos el estado que tendría el RegisterScreen, o al menos lo escencial
const initState = {
    auth: {
        uid:'dJ6s8kRzbmay0Nie4QEwl0u7mlB2',
        name: null
    },
    ui:{
        loading: false,
        msgError: null
    },
    notes:{
        notes:[//puede ser datos falsos pero whatever
            {
                id:'4baZszlzfjfKoWQqBu3e',
                body:'Hola 2',
                date:1643968823092,
                title:'Probando Save Note',
                url:'https://gatito2.com/gatito2.jpg'
            },
            {
                id:'TLnQMM2J1vrisWCLhRa8',
                body:'',
                date:1643968948919,
                title:''
            },
            {
                id:'XSTvJIPkXnTW67uFQNoQ',
                body:'',
                date:1643968673039,
                title:''
            },
        ],
        active:null
    }
};



let store = mockStore( initState );
store.dispatch = jest.fn(); //para las async actions


const wrapper = mount(
    <Provider store={ store }>
        <Sidebar />
    </Provider>
);

describe('Pruebas en <Sidebar />', () => {



    test('Debe mostrarse correctamente', () => {
        //snapshot
        expect( wrapper ).toMatchSnapshot();
    });


    test('Debe llamar el startLogout action', () => {

        //Damos Click al logout (se supone que es el único por eso puse el elemento)
        wrapper.find('button').prop('onClick')();
        expect( startLogout ).toHaveBeenCalled();

    });


    test('Debe llamar el startNewNote action', () => {
        //Que se dispare la acción
        wrapper.find('.journal__new-entry').simulate('click');
        expect( startNewNote ).toHaveBeenCalled();

    })

})