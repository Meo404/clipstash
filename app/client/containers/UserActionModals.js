import React, { Fragment, useContext, useState } from "react";
import UserActionMenuContext from 'contexts/UserActionMenuContext';
import RequestPasswordModal from 'containers/RequestPasswordModal';
import SignInModal from 'containers/SignInModal';
import SignUpModal from 'containers/SignUpModal';
import { SuccessModal } from 'components';

export default function UserActionModals() {
    const [successEmail, setSuccessEmail] = useState('');
    const [{
        showSignIn,
        showSignUp,
        showSignUpSuccess,
        showRequestPassword,
        showRequestPasswordSuccess
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
        setSuccessEmail(userEmail);
        const actionType = showSignUpSuccess ? 'CLOSE' : 'SIGN_UP_SUCCESS'
        dispatch({ type: actionType });
    }

    function showRequestPasswordHandler() {
        const actionType = showRequestPassword ? 'CLOSE' : 'REQUEST_PASSWORD'
        dispatch({ type: actionType });
    }

    function showRequestPasswordSuccessHandler(userEmail = '') {
        setSuccessEmail(userEmail);
        const actionType = showRequestPasswordSuccess ? 'CLOSE' : 'REQUEST_PASSWORD_SUCCESS'
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
                showRequestPasswordSuccessHandler={showRequestPasswordSuccessHandler}
            />
            {/* SignUp success modal */}
            <SuccessModal
                message={
                    <Fragment>A verification link has been sent to <strong>{successEmail.toString()}</strong>.
                    Please click on thelink to verify your email address and finalize your registration.
                    </Fragment>
                }
                showSuccess={showSignUpSuccess}
                showSuccessHandler={showSignUpSuccessHandler}
            />
            {/* RequestPassword success modal */}
            <SuccessModal
                message={
                    <Fragment>
                        An email has been sent to <strong>{successEmail.toString()}</strong> containing instructions for resetting your password.
                    </Fragment>
                }
                showSuccess={showRequestPasswordSuccess}
                showSuccessHandler={showRequestPasswordSuccessHandler}
            />
        </React.Fragment>
    );
}