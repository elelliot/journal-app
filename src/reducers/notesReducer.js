import { types } from "../types/types";

/*
    {
        notes: [],
        active: null, //cuando la pantalla está sin una nota visualizada, está la pantalla morada
        active: {
            id: 'ID proporcionado por firebase',
            title: '',
            body: '',
            imageUrl: '',
            date: 123165465
        }

        }
    }
*/
const initialState = {
    notes:[],
    active: null
}
export const notesReducer = ( state = initialState, action ) => {

    switch (action.type) {
        
        case types.notesActive:
            return {
                ...state, //clonamos el state anterior para regresar un nuevo estado y no mutar el anterior
                active: {
                    ...action.payload //igual clonamos el payload (para evitar que se rompa la app en caso de modificar el objeto)
                }
            }


        case types.notesAddNew: 
            return {
                ...state,
                notes: [ action.payload, ...state.notes ] //agregamos la nota al array de notes
            }
        
        case types.notesLoad:
            //console.log(action.payload);//es una promesa que devuelve un array
            return {
                ...state,
                notes: [ ...action.payload ] //es un array por eso el spread
            }
        
        case types.notesUpdate:
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id
                        ? action.payload.note
                        : note
                )
            }

        case types.notesDelete:
            return {
                ...state, //para no perder el state anterior
                active: null, //la quitamos del state (Redux)
                
                //Regresamos todas las notas cuyo id sea diferente al action.payload (que sería = id de la nota que borramos)
                notes: state.notes.filter( note => note.id !== action.payload )
            }

        case types.notesLogoutCleaning:
            return {
                ...state,
                active: null,
                notes: []
            }

        default:
            return state;
    }
}