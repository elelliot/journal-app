import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { Toast } from '../../alerts/alert';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

    //Obtenemos el username
    const {name} = useSelector( state => state.auth );

    //Manejando el Logout
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch( startLogout() );
        Toast.fire({
            iconColor: '#41D70C',
            icon: 'success',
            title: 'Byeee ^u^/'
          })
    }


    //
    const handleAddNew = () => {
        dispatch( startNewNote() );
    }

    return (
        <aside className="journal__sidebar">
            
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    {/* Icono de lunita de sidebar */}
                    <i className="far fa-moon"></i>
                    <span> {name} </span>
                </h3>

                <button 
                    className="btn"
                    onClick={ handleLogout }
                >
                    Logout
                </button>
            </div>

            <div 
                className="journal__new-entry pointer"
                onClick={ handleAddNew }
                >
                
                {/* Ícono del calendario con signo de + */}
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    New Entry
                </p>
            </div>
            
            <JournalEntries />


        </aside>
    )
}
