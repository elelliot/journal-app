import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    const dispatch = useDispatch();

    //referencia a la nota activa, renombramos active a note
    const { active:note } = useSelector( state => state.notes );
    
    //Para poder mostrar la info en los inputs y no tener que modificar directamente la nota activa
    /*Solo el store cambia en cada click a una nueva nota, pero este state no cambia por si mismo y se queda con los mismos valores, 
    para eso es el useEffect, para resetear el form con los nuevos valores de la nota*/
    const [ formValues, handleInputChange,reset ]= useForm( note );
    
    const { body, title, id } = formValues;

    //id de la nota Seleccionada actualmente
    const activeId = useRef( note.id )//almacenamos una variable mutable que no redibuja todo el comp si cambia
    
    /*se dispara solo si el note.id cambió (sería al darle click) y reseteamos el form con los nuevos valores, 
    para eso hicimos el cambio al reset del useForm*/ 
    useEffect(() => {

        if( note.id !== activeId.current ) {
            reset( note );
            //establecemos la nueva nota activa si no, la condicion siempre ejecutaria el effect
            activeId.current = note.id
        }

    }, [reset, note]);

    //Mandamos el cambio del form a la acción y la tendremos en Redux
    //Esto me ejecuta la acción 2 veces al seleccionar la nota
    useEffect(() => {
      
        //console.log(formValues);//afuera se dispararía con el state anterior y el nuevo por el effect de arriba
        dispatch( activeNote( formValues.id, { ...formValues } ) )//no importa que le mandemos el id con el spread a la accion, se sobreescribe en la misma, así que no problem 
    
    }, [formValues, dispatch]);
    
    
    
    //Borrar nota
    const handleDelete = () => {
        
        dispatch( startDeleting(id) );
    }
    
    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">

                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value= { title }
                    onChange={ handleInputChange }
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    name="body"
                    value= { body }
                    onChange={ handleInputChange }
                >

                </textarea>

                {
                    //Mostramos la imagen si existe
                    (note.url) &&
                    <div className="notes__image">
                        <img 
                            src={ note.url }
                            alt="imagen"
                        />
                    </div>
                }
                
            </div>

            <button
                className='btn btn-danger'
                onClick={ handleDelete }   
            >
                Delete
            </button>
        </div>
    )
}
