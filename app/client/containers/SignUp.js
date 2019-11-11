import React, { useState } from 'react';
import SignUpForm from 'components/Users/SignUpForm/SignUpForm';
import SignUpSuccess from 'components/Users/SignUpSuccess/SignUpSuccess';
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