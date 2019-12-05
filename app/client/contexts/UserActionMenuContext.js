import React, { useReducer } from 'react';
import userActionMenuReducer from 'reducers/userActionMenuReducer';

const UserActionMenuContext = React.createContext({});
const initialState = {
    showSignIn: false,
    showSignUp: false,
    showSignUpSuccess: false,
    showRequestPassword: false,
    showRequestPasswordSuccess: false
}

export const UserActionMenuProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userActionMenuReducer, initialState);

    return (
        <UserActionMenuContext.Provider value={[state, dispatch]}>
            {children}
        </UserActionMenuContext.Provider>
    )
}

export const UserActionMenuConsumer = UserActionMenuContext.Consumer;
export default UserActionMenuContext;