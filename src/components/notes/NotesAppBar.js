import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector( state => state.notes );

    //Mandamos la nota Activa para grabarla/actualizarla
    const handleSave = () => {
        //console.log(active);
        dispatch( startSaveNote( active ) )
    }

    //Para subir imagen, con esto hacemos que el botón trabaje como input file y no usarlo tal cual por razones de diseño etc.
    const handlePictureUpload = () => {
        //seleccionamos el input file al dar click al boton de picture y simulamos el click ahí, por eso es invisible.
        document.querySelector('#fileSelector').click();

    }

    const handleFileChange = (e) => {
        //console.log(e.target.files); //pa ver el archivo que enviamos,también puede ser length 0 si no enviamos la imagen
        const file = e.target.files[0]; //tendrá indice 0 si se subió la imagen

        if ( file ) {
            //mandamos el archivo a la action
            dispatch( startUploading( file ) );
        }
    }

    return (
        <div className="notes_appbar">
            <span>28 de Agosto 2021</span>

            <input 
                id = "fileSelector"
                type="file"
                name="file"
                style={ { display: 'none' } }
                onChange={ handleFileChange }
            />
            
            <div>
                <button 
                    className="btn"
                    onClick={ handlePictureUpload }
                    >
                    Picture
                </button>
                <button 
                    className="btn"
                    onClick={ handleSave }
                >
                    Save
                </button>
            </div>
        </div>
    )
}


/*Para subir imagenes con Cloudinary: https://api.cloudinary.com/v1_1/dnumevud1/upload , ese es nuestro url (Ver documentación)
y es POST (Pruebas con POSTMAN)
Necesitamos 2keys y values que agregaremos en Body/form-data:
Keys: file (Lo seteamos en tipo file) ----- upload_preset (tipo texto)
Values: Seleccionamos la imagen que queramos ----- react-journal (nombre del upload preset que usaremos)

-Obtenemos la imagen subida del secureUrl que te da el resultado 
*/