import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from 'cloudinary';

/*PARA BORRAR IMAGENES AL SUBIRLAS A CLOUDINARY...
1-instalamos "npm install cloudinary --save-dev" (Ver la Documentación).*/
//2-configuramos el SDK de NODE con los valores propios.
cloudinary.config({ 
    cloud_name: 'dnumevud1', 
    api_key: '378192777425981', 
    api_secret: 'rcPOtcz4fcH-Q2JccS6u9TIFk28',
    secure: true
  });

describe('Pruebas en fileUpload.js', () => {
  
    test('Debe de cargar un archivo y retornar el url', /*async*/( done ) => {

        //img de prueba (Si da error de Cross Origins, poner otra imagen)
        //const resp = await fetch('https://images.unsplash.com/photo-1536596662079-12ab3d957913?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFpbnklMjBuaWdodHxlbnwwfHwwfHw%3D&w=1000&q=80');

        //creamos el archivo
        //const blob = await resp.blob(); //wth is dis?
        //const file = new File([blob], 'foto.jpg'); 

        //lo mandamos a la función para subirla a cloudinary
        //const url = await fileUpload( file );
        //console.log(url);// confirmamos el url

        //Prueba
        //expect( typeof url ).toBe('string');

        
        //3-Necesitamos el public id (qué sería el nombre que le pone cloudinary a la imagen que subimos)
        //const segments = url.split('/'); //Partmos el url por "/" y obtenemos sus elementos en un array
        //console.log(segments); //Para ver que index es el ID.
        
        //El url está en la última posición del array así que lo obtenemos y como solo queremos el ID sin la extensión, se la quitamos.
        //const imageId = segments[ segments.length - 1 ].replace('.jpg','');

        //4-Buscamos el Delete Resources en la documentación y como estas pruebas corren con Node, seleccionamos esa opción.
        // await cloudinary.v2.api.delete_resources(imageId, {}, (error, result)=>{
        //     console.log(error, result);
        //     done(); //el done puede ir en los args del test y no hay problema si es async la func.
        // });


        //Error: Test functions cannot both take a 'done' callback and return something. Ether use a 'done' callback or return a Promise
        //Alternativa manejando promises a causa del error con async await, (que en teoría funciona, pero la prueba no pasa)
        fetch('https://images.unsplash.com/photo-1536596662079-12ab3d957913?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFpbnklMjBuaWdodHxlbnwwfHwwfHw%3D&w=1000&q=80')
            .then( resp => resp.blob() )
            .then( blob => {
                
                const file = new File([blob], 'foto.jpg');
                fileUpload( file ).then( url => {
                    
                    //console.log(url)
                    expect( typeof url ).toBe('string');


                    //Ya teniendo el url sabemos que se subió, y ahora borramos la imagen para que no se acumulen archivos basura en cloudinary
                    const segments = url.split('/');
                    const imageId = segments[ segments.length - 1 ].replace('.jpg','');
                    cloudinary.v2.api.delete_resources(imageId, {}, (error, result)=>{
                        //console.log(error, result);
                        done();
                    });
                });
            })
            .catch(console.warn);

        
    });


    test('Debe retornar un error', async() => {

        //Un archivo sin blob para que de error
        const file = new File([], 'foto.jpg'); 
        //lo mandamos a la función
        const url = await fileUpload( file );
        
        //Prueba
        expect( url ).toBe( null )
    });
    
});
