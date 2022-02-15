/**
 * @jest-environment node 
 */
// el jest-env node evita errores de Firestore
import * as fs from 'fs';
import { doc, getDoc } from 'firebase/firestore';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { fileUpload } from '../../helpers/fileUpload';


/*  jest.mock pide la librería a la que le quieres hacer mock. Y en el callback
    la(s) función(es) o hook(s) que queremos simular.
*/
//Aquí debemos importar el fileUpload real aunque ya tengamos su referencia aquí para poder hacer el mock en la prueba y obtener el url
jest.mock('../../helpers/fileUpload',() => ({
        fileUpload: jest.fn()
    }));


    //No hace el update si hacemos el return aquí, por que no lo obtiene en la prueba, ¿scope issue perhaps?
// jest.mock('../../helpers/fileUpload',() => ({
//     fileUpload: jest.fn(() => {
//         return 'https://gatito.com/gatito.jpg';
//         //return Promise.resolve('https://pagina-de-prueba.com/imagendeprueba1.jpg'); //esto es otra manera por que regresa promesa
//     })
// }));



const middlewares = [thunk]; //thunk es el middleware que usamos
const mockStore = configureStore(middlewares); //función para crear un "store"

/*Es el estado del store en el instante que queremos testear, podemos ver REDUX para saber cual queremos en específico.
Como las acciones de notes requieren estar logueado, lo adaptamos a eso
*/
const initState = {
    auth: {
        uid: 'TESTING', //puede ser cualquier valor para no poner el de un user de verdad
    },
    notes: {
        active:{
            id: '4baZszlzfjfKoWQqBu3e',
            title:"Probando Save Note",
            body:"Hola"
        }
    }
};

let store = mockStore( initState );

/* En algún punto del startUploading la app quiere usar el window.scrollTo pero como la corremos en consola debido a las pruebas,
esto dará un error así que podemos o hacer un mock del scroll (fix 2) o cambiar las propiedades del window.scrollTo
para las pruebas (en setupTests.js) */
//window.scrollTo error fix 2: usar un mock con Jest 
global.scrollTo = jest.fn(); 

describe('Pruebas con notes.js parte 2', () => {

    /*El store guarda todas las acciones que han sido disparadas, así que necesito limpiar el store antes de cada prueba*/
    // beforeEach( ()=> {

    //     store= mockStore( initState )
    // })


    test('startUploading debe actualizar el url del entry', async() => {
            
        //Archivo vacío.(Da error si lo definimos vacío por lo que lo debemos trabajar con el fs)
        //const file = new File([], 'foto.jpg');

        /*fileUpload es el real, pero accedemos al mockReturnValue gracias al primer jest.mock().
        Debemos importar el real para que podamos hacerle el mock y obtener su valor en la prueba, 
        si hacemos el return en el callback no podemos obtener el url, por tanto no hacemos el update del url; scope issues maybe*/
        fileUpload.mockReturnValue('https://gatito2.com/gatito2.jpg');
        
        
        fs.writeFileSync('foto.jpg', '');
        const file = fs.readFileSync('foto.jpg');
        /*Al llegar al fileUpload dará error por que el file está vacío, así que hacemos un mock 
        para que cuando se llame el fileUpload regrese un url en especifico.*/
        await store.dispatch( startUploading( file ) );

        //Obtenemos la nota y esperamos que el url que se grabó, sea el que le dimos
        const docRef = doc( db, 'TESTING/journal/notes/4baZszlzfjfKoWQqBu3e' );
        const docRecived = await getDoc( docRef );
        expect(docRecived.data().url).toBe('https://gatito2.com/gatito2.jpg');
        
    })

})