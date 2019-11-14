import React, { useReducer } from 'react';
import authReducer from 'reducers/authReducer';
import Cookies from 'js-cookie';

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
    const initialState = setInitialState();
    const [state, dispatch] = useReducer(authReducer, initialState);

    const setInitialState = () => {
        authCookie = Cookies.get('userAuth')
        if (authCookie) {
            return {
                isLoggedIn: true,
                userName: authCookie.userName,
                authHeaders: authCookie.authHeaders
            }
        }

        return { isLoggedIn: false, userName: null, authHeaders: null }
    }

    return (
        <AuthContext.Provider value={[state, dispatch]}>
            {children}
        </AuthContext.Provider>
    )
}

export const AuthConsumer = AuthContext.Consumer;
export default AuthContext;