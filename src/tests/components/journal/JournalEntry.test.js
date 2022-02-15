import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { JournalEntry } from "../../../components/journal/JournalEntry";
import { activeNote } from "../../../actions/notes";



const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};



let store = mockStore( initState );
store.dispatch = jest.fn();

const note = {
    id: 112,
    date: 0,
    title: 'Hola',
    body: 'Perrito',
    url: 'https://perrito.com/perrirou.jpg'
}

const wrapper = mount(
    <Provider store={ store }>
        <JournalEntry {...note}/>
    </Provider>
);






describe('Pruebas en <JournalEntry />', () => {


    test('Debe mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();

    });


    test('Debe activar la nota', () => {

        wrapper.find('.journal__entry').prop('onClick')();
        //También podemos usar el store.disapatch como una forma más general de evaluar.
        expect( store.dispatch ).toHaveBeenCalledWith(
            activeNote( note.id, { ...note } )
        );
    })
})