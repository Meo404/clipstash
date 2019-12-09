import React, { useReducer } from 'react';
import authReducer from 'reducers/authReducer';
import cookieTokenizer from 'utils/cookieTokenizer';

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
    const Cookies = cookieTokenizer();
    const initialState = setInitialState();
    const [state, dispatch] = useReducer(authReducer, initialState);

    function setInitialState() {
        const authCookie = Cookies.get('userToken');
        
        if (authCookie) {
            return {
                isLoggedIn: true,
                userName: authCookie.userName,
                email: authCookie.email,
                authHeaders: authCookie.authHeaders
            }
        }

        return { isLoggedIn: false, userName: null, email: null, authHeaders: null }
    }

    return (
        <AuthContext.Provider value={[state, dispatch]}>
            {children}
        </AuthContext.Provider>
    )
}

export const AuthConsumer = AuthContext.Consumer;
export default AuthContext;