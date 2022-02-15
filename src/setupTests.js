import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {createSerializer} from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));


//import Swal from 'sweetalert2';
/*En caso de tener errores como QuerySelector, puede ser por sweetAlert, y como son muchos archivos donde lo usé, mejor hago
un mock global.
Como es importación por defecto, solo necesitamos poner el nombre de la propiedad o método (no lo usamos así que lo comento)*/
// jest.mock('sweetalert2', ()=> ({
//     fire: jest.fn(),
//     close: jest.fn()
// }))

/*window.scrollTo error fix 1: 
  alteramos el objeto window en su propiedad scrollTo haciendo que básicamente no haga nada gracias a 
  la función noScroll que definimos y el writable ponerlo en true por si acaso (no sé que es tbh)*/
// const noScroll = () => {};
// Object.defineProperty( window, 'scrollTo', { value: noScroll, writable: true } );