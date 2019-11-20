import cookieTokenizer from 'utils/cookieTokenizer';

const Cookie = cookieTokenizer();
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            Cookie.set('userToken', action.payload);
            
            return {
                isLoggedIn: true,
                userName: action.payload.userName,
                authHeaders: action.payload.authHeaders
            };
        case 'LOGOUT':
            Cookie.remove('userToken');    

            return {
                isLoggedIn: false,
                userName: null,
                authHeaders: null
            };
        default:
            return state;
    }
};

export default authReducer;