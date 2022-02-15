import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {

    //const entries =[1,2,3,4,5,6,7,8,9];

    //obtenemos las notes del state
    const { notes } = useSelector( state => state.notes );
    //console.log(notes);

    return (
        //Es el contenedor de los entries
        <div className="journal__entries">
            
            
            {//Creamos el componente basado en el numero de entries
                // entries.map( value => (
                //     <JournalEntry key={ value } />

                // ))

                notes.map( note => (
                    <JournalEntry
                        key= { note.id }
                        { ...note } //Extraemos todas las propiedades
                    />
                ))
            }


        </div>
    )
}
