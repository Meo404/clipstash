import React, { useReducer } from 'react';
import userActionMenuReducer from 'reducers/userActionMenuReducer';

const UserActionMenuContext = React.createContext({});
const initialState = {
    showSignIn: false,
    showSignUp: false,
    showSignUpSuccess: false,
    showChangePassword: false,
    showChangePasswordSuccess: false,
    showResetPassword: false,
    showResetPasswordSuccess: false,
    showRequestPassword: false,
    showRequestPasswordSuccess: false,
    showDeleteAccount: false,
    showDeleteAccountSuccess: false,
    showReportSubmission: false,
    showReportSubmissionSuccess: false
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