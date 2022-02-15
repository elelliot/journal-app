import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { activeNote } from "../../../actions/notes";
import { NoteScreen } from "../../../components/notes/NoteScreen";

jest.mock('../../../actions/notes', ()=> ({
    activeNote: jest.fn()
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

//No tiene que ser legit la info, pero con que simule el state que necesitamos
const initState = {
    auth: {
        uid:'1232',
        name: 'ElElliot'
    },
    ui:{
        loading: false,
        msgError: null
    },
    notes:{
        notes:[],
        active:{
            id:'1234ggg',
            body:'Friend of a Friend',
            date:0,
            title:'Hello'
        }
    }
};



let store = mockStore( initState );
store.dispatch = jest.fn();


const wrapper = mount(
    <Provider store={ store }>
        <NoteScreen />
    </Provider>
);


describe('Pruebas en <NoteScreen />', () => {
    
    test('Debe mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });


    test('Debe de disparar el activeNote ', () => { 
        //Simulamos el cambio al title de la activeNote
        wrapper.find('input[name="title"]').simulate('change',{
            target:{
                name:'title',
                value:'Hello, Again'
            }
        });

        //expect(activeNote).toHaveBeenCalledTimes(1);

        //cuando se llega a llamar varias veces, en este caso solo importa la última llamada, pero como se llamó solo una vez no importa.
        // expect( activeNote ).toHaveBeenLastCalledWith( 
        //     '1234ggg',
        //     {
        //         body:'Friend of a Friend',
        //         title:'Hello, Again',
        //         id:'1234ggg',
        //         date: 0

        //     }
        // );
        
        expect( activeNote ).toHaveBeenCalledWith( 
            '1234ggg',
            {
                body:'Friend of a Friend',
                title:'Hello, Again',
                id:'1234ggg',
                date: 0

            }
        );


     })


})