//Tipos de Acciones

export const types = {

    login:'[Auth] Login',
    logout:'[Auth] Logout',

    //Se puede poner los nombres que se quiera pero que quede muy claro cual es el reducer que ejecuta la accion
    uiSetError: '[UI] Set Error',
    uiRemoveError: '[UI] Remove Error',

    //con esto cambiamos el estado de loading a false o true según necesitamos
    uiStartLoading: '[UI] Start loading',
    uiFinishLoading: '[UI] Finish loading',

    //Para las notas
    notesAddNew: '[Notes] New Note',
    notesActive: '[Notes] Set active note',
    notesLoad: '[Notes] Load Notes',
    notesUpdate: '[Notes] Updated note',
    notesFileUrl: '[Notes] Updated image url',
    notesDelete: '[Notes] Delete note',
    notesLogoutCleaning: '[Notes] Logout Cleaning',

}