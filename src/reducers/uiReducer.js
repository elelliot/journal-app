import { types } from "../types/types";

const initialState = {
    loading: false,
    msgError: null
}

export const uiReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.uiSetError:
            return {
                //El mensaje que dejemos,lo recibimos en el action.payload,
                //y como el loading no lo cambiamos mantenemos el mismo state con el spread op y cambiamos el mensaje
                ...state,
                msgError: action.payload
            }
        
        case types.uiRemoveError:
            return {
                ...state,
                msgError: null
            }

        case types.uiStartLoading:
            return {
                ...state,
                loading: true
            }
        
        case types.uiFinishLoading:
            return {
                ...state,
                loading: false
            }
        
        default: 
            return state;
        
        
    }
}