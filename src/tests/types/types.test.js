import { types } from "../../types/types";

describe('Pruebas en Types', () => {
  

    test('Types debe ser el objeto asignado', () => {
      
        expect( types ).toEqual({

            login:'[Auth] Login',
            logout:'[Auth] Logout',
            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',
            uiStartLoading: '[UI] Start loading',
            uiFinishLoading: '[UI] Finish loading',
            notesAddNew: '[Notes] New Note',
            notesActive: '[Notes] Set active note',
            notesLoad: '[Notes] Load Notes',
            notesUpdate: '[Notes] Updated note',
            notesFileUrl: '[Notes] Updated image url',
            notesDelete: '[Notes] Delete note',
            notesLogoutCleaning: '[Notes] Logout Cleaning',
        
        })
    });
    



});
