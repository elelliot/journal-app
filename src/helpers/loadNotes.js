import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/firebase-config";



//la llamamos en el effect, en la condicion, AppRouter.js, es una promise
export const loadNotes = async ( uid ) => {

    //obtenemos las notes del user
    const notesSnap = await getDocs( query( collection( db, `${ uid }/journal/notes` ) ) );
    //console.log(  notesSnap ); //Este formato lo trabajaremos abajo para que me de las notas de forma correcta

    //aquí las manejaremos
    const notes = [];


    notesSnap.forEach( snapHijo => {
        //estos son las notas obtenidas del snapHijo al iterar el notesSnap
        //console.log( snapHijo.data() );

        //agregamos las notas del snapHijo al arreglo, (.data() no tiene el ID,así que combinaremos eso en el nuevo arreglo)
        notes.push({
            id: snapHijo.id, //el id de firebase de la nota
            ...snapHijo.data() //body, date y title
        })
    });

    //solo para visualizarlas
    //console.log(notes);


    return notes;

}


