
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk' //para acciones asíncronas

import { authReducer } from "../reducers/authReducer";
import { notesReducer } from "../reducers/notesReducer";
import { uiReducer } from "../reducers/uiReducer";




//El store tiene todos los reducers que usaremos

/*como quiero poner el applyMiddleware en el createStore y no sé si eso lo rompe: usaré lo siguiente, sacado de
https://github.com/zalmoxisus/redux-devtools-extension
*/
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;




//el dispatch de redux va al store y prueba uno a uno todos los reducer hasta que se topa con el action.type que corresponda, asi sabe cual reducer usar
//Aunque tenga uno, lo hago así y podré mandar todos los reducers que quiera
//propiedad: reducer que lo maneja, esto es lo que se ve en Redux DevTools
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
})



//solo puedo mandarle 1 reducer, pero combineReducers lo arregla
export const store = createStore(
    reducers,
    //con esto podemos trabajar acciones asincronas en la app usando thunk
    composeEnhancers( 
        applyMiddleware( thunk )
    )


    //es para verlo en el tab de Redux de chrome, esto te lo da la documentación  (lo quité para usar el composeEnhancers)
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
    );

//Ahora lo importamos en el punto más alto de la app (JournalApp en este caso)