import React, { Fragment, useState } from 'react';
import { ApiClient } from 'ApiClient';
import { SignUpForm, SuccessDialog } from 'components';
import { parseValidationErrors, validateSignUpData } from 'utils/UserValidation';

const INITIAL_STATE = {
    userName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    hasErrors: false,
    isSubmitting: false,
    errors: {
        userName: null,
        email: null,
        password: null,
        passwordConfirmation: null
    }
}

export default function SignUp({ showSignInHandler }) {
    const [signUpData, setSignUpdata] = useState(INITIAL_STATE);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const client = new ApiClient();

    function changeHandler(event) {
        const { name, value } = event.target;
        setSignUpdata({ ...signUpData, [name]: value });
    }

    /**
     * Handler for the form submit
     * 
     * It will first check if there are any FE validation errors before reaching out
     * to the actual registration.
     * 
     * @param {object} event 
     */
    function submitHandler(event) {
        event.preventDefault();
        const validatedData = validateSignUpData(signUpData);

        if (validatedData.hasErrors) {
            setSignUpdata({ ...validatedData, isSubmitting: false });
            return;
        }

        setSignUpdata({ ...validatedData, isSubmitting: true });
        registerUser();
    }

    async function registerUser() {
        const params = {
            user: {
                user_name: signUpData.userName,
                email: signUpData.email,
                password: signUpData.password,
                password_confirmation: signUpData.passwordConfirmation,
            },
            confirm_success_url: window.location.origin
        };

        // TODO add proper error handling for generic errors
        await client.post('api/v1/auth', params)
            .then(() => {
                setRegisterSuccess(true);
                setSignUpdata({ ...signUpData, isSubmitting: false });
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    const errors = parseValidationErrors(error.response.data.errors);
                    setSignUpdata({ ...signUpData, errors: errors, hasErrors: true, isSubmitting: false });
                }
            })
    }

    return (
        <React.Fragment>
            {registerSuccess ? (
                <SuccessDialog message={
                    <Fragment>A verification link has been sent to <strong>{signUpData.email}</strong>.
                    Please click on thelink to verify your email address and finalize your registration.
                    </Fragment>}
                />
            ) : (
                    <SignUpForm
                        signUpData={signUpData}
                        changeHandler={changeHandler}
                        submitHandler={submitHandler}
                        showSignInHandler={showSignInHandler}
                    />
                )}
        </React.Fragment>
    )
}