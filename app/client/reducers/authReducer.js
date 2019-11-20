import cookieTokenizer from 'utils/cookieTokenizer';
import moment from 'moment';

const Cookie = cookieTokenizer();
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            // Cookie expires one day before the actual login tokens expire
            Cookie.set('userToken', action.payload, { 
                expires:  moment.unix(action.payload.authHeaders.expiry).subtract(1, 'days').toDate()
            })
            
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