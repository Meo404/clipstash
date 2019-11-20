import React, { useState } from 'react';
import { ApiClient } from 'ApiClient';
import { validateEmail } from 'utils/UserValidation';
import { RequestPasswordForm } from 'components';

const INITIAL_STATE = {
    email: '',
    hasErrors: false,
    isSubmitting: false,
    error: null
}

export default function RequestPassword() {
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [requestSuccess, setRequestSuccess] = useState(false);
    const client = new ApiClient();

    function changeHandler(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    /**
     * Handler for the form submit
     * 
     * It will first check if there are any FE validation errors before reaching out
     * to the reset password endpoint.
     * 
     * @param {object} event 
     */
    function submitHandler(event) {
        event.preventDefault();
        const validatedEmail = validateEmail(formData.email);

        if (validatedEmail != null) {
            setFormData({ ...formData, hasErrors: true, error: validatedEmail, isSubmitting: false });
            return;
        }

        setFormData({ ...formData, hasErrors: false, error: null, isSubmitting: true });
        requestPassword();
    }

    async function requestPassword() {
        const params = {
            email: formData.email,
            redirect_url: window.location.origin
        };

        // TODO add proper error handling for generic errors
        await client.post('api/v1/auth/password', params)
            .then(() => {
                setRequestSuccess(true);
                setFormData({ ...formData, isSubmitting: false });
            })
            .catch((error) => {
                if (error.response.status = 404) {
                    const errors = parseValidationErrors(error.response.data.error);
                    setSignUpdata({ ...formData, error: errors, hasErrors: true, isSubmitting: false });
                }
            })
    }

    return (
        <React.Fragment>
            {requestSuccess ? (
                <h1>yay</h1>
            ) : (
                    <RequestPasswordForm
                        formData={formData}
                        changeHandler={changeHandler}
                        submitHandler={submitHandler}
                    />
                )}
        </React.Fragment>
    )
}