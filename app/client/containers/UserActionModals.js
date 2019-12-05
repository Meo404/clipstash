import React, { useContext } from "react";
import UserActionMenuContext from 'contexts/UserActionMenuContext';
import RequestPasswordModal from 'containers/RequestPasswordModal';
import SignInModal from 'containers/SignInModal';
import SignUpModal from 'containers/SignUpModal';

export default function UserActionModals() {
    const [{ showSignIn, showSignUp, showRequestPassword }, dispatch] = useContext(UserActionMenuContext);

    function showSignUpHandler() {
        const actionType = showSignUp ? 'CLOSE' : 'SIGN_UP'
        dispatch({ type: actionType });
    }

    function showSignInHandler() {
        const actionType = showSignIn ? 'CLOSE' : 'SIGN_IN'
        dispatch({ type: actionType });
    }

    function showRequestPasswordHandler() {
        const actionType = showRequestPassword ? 'CLOSE' : 'REQUEST_PASSWORD'
        dispatch({ type: actionType });
    }

    return (
        <React.Fragment>
            <SignUpModal
                showSignUp={showSignUp}
                showSignUpHandler={showSignUpHandler}
                showSignInHandler={showSignInHandler}
            />
            <SignInModal 
                showSignIn={showSignIn}
                showSignInHandler={showSignInHandler}
                showRequestPasswordHandler={showRequestPasswordHandler}
            />
            <RequestPasswordModal
                showRequestPassword={showRequestPassword}
                showRequestPasswordHandler={showRequestPasswordHandler}
            />
        </React.Fragment>
    );
}