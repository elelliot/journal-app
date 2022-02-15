import { finishLoading, removeError, setError, startLoading } from "../../actions/ui";
import { types } from "../../types/types";


describe('Pruebas en actions/ui.js', () => {
    

    test('Todas las acciones deben funcionar', () => {
        
        const setErrorAction = setError('AIUDA!');

        expect( setErrorAction ).toEqual({
            type: types.uiSetError,
            payload: 'AIUDA!'
        });


        const removeErrorAction = removeError();
        const startLoadingAction = startLoading();
        const finishLoadingAction = finishLoading();

        expect( removeErrorAction ).toEqual({
            type: types.uiRemoveError
        });

        expect( startLoadingAction ).toEqual({
            type: types.uiStartLoading
        });

        expect( finishLoadingAction ).toEqual({
            type: types.uiFinishLoading
        });

    });
    
});
