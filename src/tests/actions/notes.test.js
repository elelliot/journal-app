/**
 * @jest-environment node
 */
//Por alguna razón cambiar el enviroment (aun que en la doc de jest diga que por defecto es node) arregla el error de las pruebas

import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { startLoadingNotes, startNewNote, startSaveNote } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';


const middlewares = [thunk]; //thunk es el middleware que usamos
const mockStore = configureStore(middlewares); //función para crear un "store"

/*Es el estado del store en el instante que queremos testear, podemos ver REDUX para saber cual queremos en específico.
Como las acciones de notes requieren estar logueado, lo adaptamos a eso
*/
const initState = {
    auth: {
        uid: 'TESTING', //puede ser cualquier valor para no poner el de un user de verdad
    }
};

let store = mockStore( initState )

describe('Pruebas con notes.js', () => {

    /*El store guarda todas las acciones que han sido disparadas, así que necesito limpiar el store antes de cada prueba*/
    beforeEach( ()=> {

        store= mockStore( initState )
    })





    //Para probar async actions con redux, instalar redux-mock-store package y hacer la config de arriba
    test('startNewNote debe crear una nueva nota', async () => {

        /*
        Se logra disparar la acción, pero firestore me da error de Privilegios, por lo que 
        mejor creamos una BDD que funcione igual pero para poder hacer pruebas.
        Así para evitamos modificar la seguridad/privilegios de la BDD, así como evitar que las pruebas
        toquen Producción.

        Ahora con la BDD de testing, configuramos en el firebase-config de forma condicional, que BDD usaremos basado en el NODE_ENV
        Las pruebas usaran la BDD de testing y la app usará la de desarrollo/Producción, idealmente tendriamos una 3er base, pero whatever
        */
       //Agregamos la nota
        await store.dispatch(startNewNote()); //recordar que es async

        
        //Depués de ese primer dispatch podemos obtener las acciones que se disparan y sus args (Es Array de Objetos)
        const actions = store.getActions();
        //console.log(actions);
        
        //Ya pudiendo agregar algo a la BDD, ya podemos hacer aserciones.
        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String), //Solo sabemos que el id será un string, pero no cual en específico
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String), //Solo sabemos que el id será un string, pero no cual en específico
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        //Ahora queremos borrar la nota al crearla para no hacer basura en la BDD cada que testeemos
        const docId = actions[0].payload.id; //id del doc creado

        //referencia a la nota creada del "usuario" (uid)
        const noteRef = doc(db, `TESTING/journal/notes/${docId}`);
        await deleteDoc(noteRef) //borramos la nota
        .then( ()=> {
            console.log('Nota de prueba borrada!');
        })
        .catch( ()=>{
            console.log('No se pudo borrar la nota de prueba!');
        })


    });


    test('startLoadingNotes debe cargar notas', async() => {
      
        await store.dispatch( startLoadingNotes('TESTING') );
        
        const actions = store.getActions();
        //Vemos la acción y las notas que se muestran solo como formato de objetos per ahí están
        //console.log(actions);

        //Esperamos la acción y el payload sería un Array de Objetos ya que podrían ser más de 1 nota.
        expect( actions[0] ).toEqual({
            type:types.notesLoad,
            payload:expect.any(Array) //no es muy riguroso, pero sabemos que debe haber un arreglo de notas
        });

        //Ahora evaluamos la estructura de las notas existentes (No importa si no tienen url)
        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        }

        //Esperamos que las notas cargadas tengan la misma estructura que les dimos (no importa que sean sin url)
        expect( actions[0].payload[0] ).toMatchObject( expected );
    });


    test('startSaveNote debe de actualizar la nota', async() => {

        const note = {
            id: '4baZszlzfjfKoWQqBu3e', //debe ser uno existente obviamente
            title: 'Probando Save Note',
            body:'Hola 2'
        }

        await store.dispatch( startSaveNote( note ) );

        const actions = store.getActions();
        //console.log(actions);

        //Evaluamos la acción
        expect( actions[0].type ).toBe( types.notesUpdate );

        //Ahora asegurarnos que lo que mandamos, esté en firestore
        const docRef = doc(db, `TESTING/journal/notes/${note.id}`); //Referenciamos la nota
        const docSnap = await getDoc(docRef);
        expect( docSnap.data().title ).toBe( note.title );
    });
    

});
