import { db } from "../firebase/firebase-config";
import { collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

import { types } from '../types/types';
import { loadNotes } from "../helpers/loadNotes";
import Swal from 'sweetalert2';
import { fileUpload } from "../helpers/fileUpload";

//Estructura de la db de las notas: uid (user) -> journal -> notes -> id( autogenerado) de la nota -> nota


export const startNewNote = () => {

    return async ( dispatch, getState ) => {

        //obtenemos el State, literal todo, y con esto podemos obtener cualquier cosa del estado
        // const state = getState();
        // console.log(state);

        //obtenemos uid del user (obtenido desde el state) 
        const { uid } = getState().auth;
        
        //nueva nota
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime() //momento exacto en que se crea la nota
        }

        //Query, no es obligatorio, pero es buena práctica hacerlo con try catch
        //agregamos a la db, la nueva nota con id autogenerado en la colección dada (si no existe, la crea).

        let docRef = '';
        try {
            docRef = await addDoc(collection(db, `${uid}/journal/notes`), newNote)
            //console.log("New Note Added",docRef);
          } catch (e) {
            console.log("Error: Couldn't create Note",e)
          }


        //mandamos al reducer
        dispatch( activeNote( docRef.id, newNote ) );

        //Refresh Sidebar
        dispatch( addNewNote(docRef.id, newNote) );
    }
}

//ya creamos la nota, ahora la queremos visualizar al crearla
export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id, //id de la nota
        ...note //el resto igual con todo y id
    }
});

//para que al crear la nota, haga refresh el sidebar
export const addNewNote = ( id,note ) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
})

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {
        //loadNotes es una promesa..., y después 
        const notes = await loadNotes( uid );
        //aquí es cuando se mandan a Redux
        dispatch( setNotes( notes ) );
    }
}
export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes //como siempre estamos creando un nuevo arreglo, no necesitamos el spread ya que sería "redundante"
});


//Update en la BD al dar click en Save
export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {

        //obtenemos uid del user (obtenido desde el state) 
        const { uid } = getState().auth;

        //Si no viene el url de la imagen, lo borramos para evitar meter un undefined a firebase ya que dará error
        if( !note.url ) {
            delete note.url;
        }


        //El id de la nota no lo queremos grabar en FireStore, por eso lo eliminamos en nu nuevo obj.
        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        //Update
        const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);
        try {
            await updateDoc(noteRef, noteToFireStore);
            //console.log('Note Updated!');
            
            //de esta forma el sideBar se actualiza al oprimir save, el problema es que además de la nota que cambió, también se actualizan las demás
            //dispatch(startLoadingNotes( uid );
            dispatch( refreshNote( note.id, noteToFireStore) );

            //Saved Note Alert
            Swal.fire({
                iconColor: '#41D70C',
                icon: 'success',
                titleText: `Note: "${ noteToFireStore.title }" Saved!`,
                color: "#FFFFFF",
                background: "#4D4D4D",
              })


          } catch (e) {
            console.log('There was an error while updating note!',e);
          }
    }

}

//
export const refreshNote = ( id, note ) => ({
    type: types.notesUpdate,
    payload: {
        id,
        note: {
            id,
            ...note //Recordar que a noteToFirestore le borramos el id  
        }
    }
})


//subimos la imagen (es asíncrona)
export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {
        
        //obtenemos la activeNote y la renombramos
        const { active: activeNote } = getState().notes;

        //Para que se muestre "cargando" al subir imagen...
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });
        
        //Subimos el file a Cloudinary y obtenemos el url de la imagen subida a Cloudinary
        const fileUrl = await fileUpload( file );
        //console.log(fileUrl);

        //Le asignamos el url de la imagen a la nota activa y lo mandamos con el dispatch a FireStore
        activeNote.url = fileUrl;
        await dispatch( startSaveNote( activeNote ) );

        Swal.close();//quitamos la carga en cuanto la imagen se haya subido a Cloudinary
    }
}


//Borrar la nota de FireStore
export const startDeleting = ( id ) => {

    return async( dispatch, getState ) => {

        //obtenemos uid de la nota actual
        const { uid } = getState().auth;

        //referencia a la nota activa(id) del usuario (uid)
        const noteRef = doc(db, `${uid}/journal/notes/${id}`);
        await deleteDoc(noteRef); //borramos la nota
        
        //Modificamos el Store
        dispatch( deleteNote(id) );
    }
}

//Borramos la nota del Store
export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
});


//Limpiar las notas del state al dar logout
export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});