import React from 'react'
import { useSelector } from 'react-redux';
import { NoteScreen } from '../notes/NoteScreen'
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {

    const { active } = useSelector( state => state.notes );
    
    return (
        <div className="journal__main-content animate__animated animate__fadeIn animate__faster">
            <Sidebar />

            <main>
                {
                    //Si active es true (en este caso no se maneja un boolean cuando está activa, si no que se declara el objeto, ver notesReducer),
                    // se muestra el noteScreen, si no, la pantalla morada <NothingSelected />
                    ( active )
                        ? ( <NoteScreen /> )
                        : ( <NothingSelected /> )
                }

            </main>
        </div>
    )
}
