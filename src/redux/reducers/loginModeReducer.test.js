import loginModeReducer from './loginModeReducer';

describe('testing the loginModeReducer...', () =>{


    test( 'test initial state is login', () =>{
        //testing initialization, don't really care about the action
        const action = { type: 'test' };
        //testing initialization, so state should previously be undefined
        const previousState = undefined;
        //output should be our default state value
        let newState = loginModeReducer( previousState, action );
        expect ( newState ).toEqual('login');
    } )

    test( 'switch to register mode', () => {
        //testing the switch to register mode action
        const action = { type: `SET_TO_REGISTER_MODE` };
        //previous state was initial state, login
        const previousState = `login`;
        //output shoulld be switched to register mode
        let newState = loginModeReducer(previousState, action);
        expect ( newState ).toEqual( 'register' );
    } )

})