import React, { Fragment, useContext, useState } from "react";
import ChangePasswordModal from 'containers/ChangePasswordModal';
import DeleteAccountModal from 'containers/DeleteAccountModal';
import RegistrationSuccess from "containers/RegistrationSuccess";
import ReportSubmissionModal from "containers/ReportSubmissionModal";
import RequestPasswordModal from 'containers/RequestPasswordModal';
import ResetPasswordModal from 'containers/ResetPasswordModal';
import SignInModal from 'containers/SignInModal';
import SignUpModal from 'containers/SignUpModal';
import UserActionMenuContext from 'contexts/UserActionMenuContext';
import { SuccessModal } from 'components';

export default function UserActionModals() {
    const [successEmail, setSuccessEmail] = useState('');
    const [{
        showSignIn,
        showSignUp,
        showSignUpSuccess,
        showChangePassword,
        showChangePasswordSuccess,
        showResetPassword,
        showResetPasswordSuccess,
        showRequestPassword,
        showRequestPasswordSuccess,
        showDeleteAccount,
        showDeleteAccountSuccess,
        showReportSubmission,
        showReportSubmissionSuccess
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

    function showChangePasswordHandler() {
        const actionType = showChangePassword ? 'CLOSE' : 'CHANGE_PASSWORD'
        dispatch({ type: actionType });
    }

    function showChangePasswordSuccessHandler() {
        const actionType = showChangePasswordSuccess ? 'CLOSE' : 'CHANGE_PASSWORD_SUCCESS'
        dispatch({ type: actionType });
    }

    function showResetPasswordHandler() {
        const actionType = showResetPassword ? 'CLOSE' : 'RESET_PASSWORD'
        dispatch({ type: actionType });
    }

    function showResetPasswordSuccessHandler() {
        const actionType = showResetPasswordSuccess ? 'CLOSE' : 'RESET_PASSWORD_SUCCESS'
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

    function showDeleteAccountHandler() {
        const actionType = showDeleteAccount ? 'CLOSE' : 'DELETE_ACCOUNT'
        dispatch({ type: actionType });
    }

    function showDeleteAccountSuccessHandler() {
        const actionType = showDeleteAccountSuccess ? 'CLOSE' : 'DELETE_ACCOUNT_SUCCESS'
        dispatch({ type: actionType });
    }

    function showReportSubmissionHandler() {
        const actionType = showReportSubmission ? 'CLOSE' : 'REPORT_SUBMISSION'
        dispatch({ type: actionType });
    }

    function showReportSubmissionSuccessHandler() {
        const actionType = showReportSubmissionSuccess ? 'CLOSE' : 'REPORT_SUBMISSION_SUCCESS'
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
            <ChangePasswordModal
                showChangePassword={showChangePassword}
                showChangePasswordHandler={showChangePasswordHandler}
                showChangePasswordSuccessHandler={showChangePasswordSuccessHandler}
            />
            <ResetPasswordModal
                showResetPassword={showResetPassword}
                showResetPasswordHandler={showResetPasswordHandler}
                showResetPasswordSuccessHandler={showResetPasswordSuccessHandler}
            />
            <RequestPasswordModal
                showRequestPassword={showRequestPassword}
                showRequestPasswordHandler={showRequestPasswordHandler}
                showRequestPasswordSuccessHandler={showRequestPasswordSuccessHandler}
            />
            <DeleteAccountModal
                showDeleteAccount={showDeleteAccount}
                showDeleteAccountHandler={showDeleteAccountHandler}
                showDeleteAccountSuccessHandler={showDeleteAccountSuccessHandler}
            />
            <ReportSubmissionModal
                showReportSubmission={showReportSubmission}
                showReportSubmissionHandler={showReportSubmissionHandler}
                showReportSubmissionSuccessHandler={showReportSubmissionSuccessHandler}
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
            {/* ChangePassword success modal */}
            <SuccessModal
                message='Your password has been successfully updated.'
                showSuccess={showChangePasswordSuccess}
                showSuccessHandler={showChangePasswordSuccessHandler}
            />
            {/* ResetPassword success modal */}
            <SuccessModal
                message='Your password has been successfully updated.'
                showSuccess={showResetPasswordSuccess}
                showSuccessHandler={showResetPasswordSuccessHandler}
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
            {/* DeleteAccount success modal */}
            <SuccessModal
                message='Your account has been deleted.'
                showSuccess={showDeleteAccountSuccess}
                showSuccessHandler={showDeleteAccountSuccessHandler}
            />
            {/* Report submission success modal */}
            <SuccessModal
                message='Submission was successfully reported'
                showSuccess={showReportSubmissionSuccess}
                showSuccessHandler={showReportSubmissionSuccessHandler}
            />
            {/* Show Registration Success modal on successful registration */}
            <RegistrationSuccess />
        </React.Fragment>
    );
}