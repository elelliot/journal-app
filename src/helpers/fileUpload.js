

//SUBIMOS FILE A CLOUDINARY
export const fileUpload = async ( file ) => {

    //API de Cloudinary, BASE/CloudName/action
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dnumevud1/upload';

    //creamos el form-data como el de POSTMAN
    const formData = new FormData();

    //le agregamos los datos al FormData
    formData.append('file', file ); //Key, Value
    formData.append('upload_preset','react-journal');

    try {
        /*Hacemos la petición y por defecto el fetch es GET, pero esta petición debe ser POST, el 2do arg inicializa el fetch.*/
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData //así como en POSTMAN, le damos la info del form-data
        });

        //si la respuesta es ok..., así como POSTMAN con el status supongo, también da el codigo pero whatever
        if ( resp.ok ) {
            //obtenemos el json de la respuesta
            const cloudResp = await resp.json();


            return cloudResp.secure_url; //URL de la imagen subida a Cloudinary para actualizar en firebase

        } else {
            //throw await resp.json();
            return null;
        }

    } catch (error) {
        throw error
    }
    
}