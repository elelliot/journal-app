import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { login } from "../../actions/auth";
import { AppRouter } from "../../routers/AppRouter";

import { act } from 'react-dom/test-utils';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


//Faking login
jest.mock('../../actions/auth', ()=> ({
    login: jest.fn()
}))


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui:{
        loading: false,
        msgError: null
    },
    notes:{
        notes:[],
        active:null // Cannot destructure property 'active' as it is undefined., se refiere al del state, y como no lo tenía se lo agregué
    }
};

let store = mockStore( initState );

store.dispatch = jest.fn();



describe('Pruebas en <AppRouter />', () => {


    test('Debe llamar el login si estoy autenticado', async() => {


        let user;
        //Si se hace un cambio en el state del componente (en este caso con el useEffect del AppRouter) se debe envolver el mount en un act
       await act( async() => {
            
            //Hay que disparar el onAuthChanged de firebase (es async), ya que eso es lo que dispara el efecto, para eso hay que loguearse
            const auth = getAuth();
            const userCred = await signInWithEmailAndPassword(auth,'test@testing.com','123456');
            
            //userCred ya es muy grande y aunque este también , al menos aligera la carga. (Aunque no lo usemos, es solo para visualizar la data y ayudar con el expect)
            user= userCred.user; 
            
            const wrapper = mount( 
                <Provider store={ store }>
                    <AppRouter />
                    {/* You cannot render a <Router> inside another <Router>. You should never have more than one in your app.
                    para ese error quitamos el MemoryRouter
                    <MemoryRouter> 
                        <AppRouter />
                    </MemoryRouter> */}
                </Provider>
            );
        })
        
        expect( login ).toHaveBeenCalledWith('dJ6s8kRzbmay0Nie4QEwl0u7mlB2',null);


    })
})