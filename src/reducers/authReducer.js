
import { types } from "../types/types";


/*
El state está vacío cuando no este auth, y cuando me autentique tendré: 
    {
        uid (id de user): 'fsdiufdiufhdis655413187',
        name: 'ElElliot'
    }
*/

//reducers siempre reciben el state(debe inicializarse, no debe ser null ni undefined) y el action
export const authReducer = ( state={}, action) =>{


    switch ( action.type ) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }//regresa el payload con uid y name 

        case types.logout:
            return { } //regresa el objeto vacío con logout

        default:
            return state; //por defecto retorna el mismo state
    }
}