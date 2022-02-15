import { authReducer } from "../../reducers/authReducer";
import { types } from '../../types/types';





describe('authReducer Tests', () => {

    test('login action debe regresar uid y displayName', () => {
        
        const initState = {};
        //action manda el tipo de acción y el payload con lo que le demos
        const action = {
            type: types.login,
            payload: {
                uid: 'abc123',
                displayName: 'ElElliot'
            }
        };
        //lo mandamos al reducer
        const state = authReducer( initState, action );
        //console.log( state );
        expect( state ).toEqual( { uid:'abc123', name: 'ElElliot'} )
    });


    test('Logout action debe retornar un objeto vacío', () => {
        const initState = { uid: '321cba', name: 'LORELLIO' };
        const action = {
            type: types.logout
        };
        const state = authReducer( initState, action );
        //console.log(state);
        expect( state ).toEqual( {} );

    });

    test('Action default debe retornar el mismo estado', () => {
        const initState = { uid: '666777', name: 'ELELIO' };
        const action = {
            type: '564gd'
        };
        const state = authReducer( initState, action );
        expect( state ).toEqual( initState );

    });
    
    
});
