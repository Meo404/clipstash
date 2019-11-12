import React, { useState } from 'react';
import { SignUpForm, SignUpSuccess } from 'components';
import { validateSignUpData } from 'utils/Users/UserValidation';
import registerUser from 'utils/Users/RegisterUser';

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

export default function SignUp() {
    const [signUpData, setSignUpdata] = useState(INITIAL_STATE);
    const [registerSuccess, setRegisterSuccess] = useState(false);

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
        submitRegistration();
    }
    
    /**
     * Function to actually submit the registration to the Backend
     * 
     * In case the registration is successfull it will set the registerSuccess state to true,
     * thus rendering the SignUpSuccess component.
     * If the registration is not successfull it will either show field errors or alternatively
     * a generic error if the error response was != 422.
     */
    function submitRegistration() {
        registerUser(signUpData).then(data => {
            if (data.success) {
                setRegisterSuccess(true);
            };

            if (!data.success) {
                if (data.errors) {
                    setSignUpdata({ ...signUpData, errors: data.errors, hasErrors: true, isSubmitting: false });
                } else {
                    // TODO: Add proper handling (e.g. displaying error snackbar)
                    setSignUpdata({ ...signUpData, isSubmitting: false }); 
                }  
            }
        })
    }

    return (
        <React.Fragment>
            {registerSuccess ? (
                <SignUpSuccess email={signUpData.email} />
            ) : (
                <SignUpForm 
                    signUpData={signUpData} 
                    changeHandler={changeHandler}
                    submitHandler={submitHandler} 
                />
        )}
        </React.Fragment>
    )
}