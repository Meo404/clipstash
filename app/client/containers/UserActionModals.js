import React, { Fragment, useContext, useState } from "react";
import UserActionMenuContext from 'contexts/UserActionMenuContext';
import RequestPasswordModal from 'containers/RequestPasswordModal';
import SignInModal from 'containers/SignInModal';
import SignUpModal from 'containers/SignUpModal';
import { SuccessModal } from 'components';

export default function UserActionModals() {
    const [signUpEmail, setSignUpEmail] = useState('');
    const [{ 
        showSignIn,
        showSignUp,
        showSignUpSuccess,
        showRequestPassword,
    }, dispatch] = useContext(UserActionMenuContext);

    function showSignInHandler() {
        const actionType = showSignIn ? 'CLOSE' : 'SIGN_IN'
        dispatch({ type: actionType });
    }

    function showSignUpHandler() {
        const actionType = showSignUp ? 'CLOSE' : 'SIGN_UP'
        dispatch({ type: actionType });
    }

    function showSignUpSuccessHandler(userEmail = '') {
        setSignUpEmail(userEmail);
        const actionType = showSignUpSuccess ? 'CLOSE' : 'SIGN_UP_SUCCESS'
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
                showSignUpSuccessHandler={showSignUpSuccessHandler}
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
            <SuccessModal
                message={
                    <Fragment>A verification link has been sent to <strong>{signUpEmail.toString()}</strong>.
                    Please click on thelink to verify your email address and finalize your registration.
                    </Fragment>
                }
                showSuccess={showSignUpSuccess}
                showSuccessHandler={showSignUpSuccessHandler}
            />
        </React.Fragment>
    );
}