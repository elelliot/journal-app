import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';


export const JournalEntry = ({ id, date, title, body, url}) => {
    
    //para manejar las fechas de los entries
    const noteDate = moment(date);
    //console.log(noteDate);

    const dispatch = useDispatch();
    const note = {
        date,
        title,
        body,
        url
    }

    //al hacer click activamos la nota (Faltaría cargar la info, solo es para Redux)
    const handleEntryClick = () => {
        dispatch( activeNote(id, note) );
    }

    return (
        //cada entrada renderizada básada en la cantidad del array entries del JournalEntries.js
        <div className="journal__entry pointer animate__animated animate__fadeIn animate__faster" onClick={ handleEntryClick }>
            {/* Foto del entry */}
            {
                //Si el url de la imagen existe, muestra la imagen, de lo contrario, no muestra nada
                url && 
                <div 
                className="journal__entry-picture"
                //Los estilos en react se ponen como objeto de javascript por eso las 2 llaves, es expresión y objeto
                //si el estilo tiene nombre con guión, se usa camelCase
                style={{
                    backgroundSize:'cover',
                    backgroundImage:`url(${ url })`
                }}
                ></div>
            }

            {/* Cuerpo (Contenedor), titulo y contenido de cada entry */}
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                  { title }  
                </p>
                <p className="journal__entry-content">
                    { body }
                </p>
            </div>

            {/* Fecha del entry */}
            <div className="journal__entry-date-box">
                <span> {`${noteDate.format('dddd')} ${noteDate.format('Do')} `  /*Día de la semana(e.g Sunday) Ver la doc de moment, Día del mes(e.g 26th) */ } </span>
                <h4>{`${noteDate.format('MMM')} ${noteDate.format('YYYY')}` /* Mes y Año */ }</h4>
                
            </div>

        </div>
    )
}
