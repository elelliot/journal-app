import { Toast } from "../alerts/alert";
import { types } from "../types/types";

//No necesitamos que sean async actions
// export const setError = ( err ) => ({
//     type: types.uiSetError,
//     payload: err
// });

export const setError = (err) =>{
    Toast.fire({
        icon: 'error',
        title: err
      });
      return{
        type: types.uiSetError,
        payload: err
      }
}


export const removeError = () => ({
    type: types.uiRemoveError
});

//Controlamos el estado del loading mandando el type de accion
export const startLoading = () => ({
    type: types.uiStartLoading
});


export const finishLoading = () => ({
    type: types.uiFinishLoading
});