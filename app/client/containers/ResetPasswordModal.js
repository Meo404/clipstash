import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import queryString from 'query-string';
import { ApiClient } from 'ApiClient';
import { Modal, ResetPasswordForm } from 'components';
import { parseValidationErrors, validatePasswordResetData } from 'utils/UserValidation';

const INITIAL_STATE = {
    password: '',
    passwordConfirmation: '',
    hasErrors: false,
    isSubmitting: false,
    errors: {
        password: null,
        passwordConfirmation: null
    }
}

export default function ResetPasswordModal(props) {
    const {
        showResetPassword,
        showResetPasswordHandler,
        showResetPasswordSuccessHandler
    } = props;
    const [formData, setFormData] = useState(INITIAL_STATE);
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();
    const resetToken = queryString.parse(location.search).reset_password_token;
    const client = new ApiClient();

    function changeHandler(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function submitHandler(event) {
        event.preventDefault();
        const validatedData = validatePasswordResetData(formData);

        if (validatedData.hasErrors) {
            setFormData({ ...validatedData, isSubmitting: false });
            return;
        }
        setFormData({ ...validatedData, isSubmitting: true });
        resetPassword();
    }

    async function resetPassword() {
        const params = {
            reset_password_token: resetToken,
            password: formData.password,
            password_confirmation: formData.passwordConfirmation
        };

        await client.patch('api/v1/auth/password', params)
            .then(() => {
                showResetPasswordSuccessHandler();
                setFormData(INITIAL_STATE);
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    const errors = parseValidationErrors(error.response.data.errors);
                    setFormData({ ...formData, errors: errors, hasErrors: true, isSubmitting: false });
                    return;
                }

                if (error.response.status == 401) {
                    showResetPasswordHandler();
                    enqueueSnackbar('Invalid reset password token!', { variant: 'error' });
                    return;
                }

                showResetPasswordHandler();
                enqueueSnackbar('Something went wrong. Please try again', { variant: 'error' });
            })
    }

    return (
        <Modal
            showModal={showResetPassword}
            showModalHandler={showResetPasswordHandler}
        >
            <ResetPasswordForm
                changeHandler={changeHandler}
                formData={formData}
                submitHandler={submitHandler}
            />
        </Modal>
    )
}