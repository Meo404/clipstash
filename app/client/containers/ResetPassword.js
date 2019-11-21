import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import queryString from 'query-string';
import { ApiClient } from 'ApiClient';
import { Modal, ResetPasswordForm, SuccessDialog } from 'components';
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

export default function ResetPassword() {
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [showModal, setShowModal] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();
    const client = new ApiClient();
    const resetToken = queryString.parse(location.search).reset_password_token;

    useEffect(() => {
        if (resetToken) { setShowModal(true) }
    }, [])

    const showModalHandler = () => {
        setShowModal(!showModal);
    }

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
                setResetSuccess(true);
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    const errors = parseValidationErrors(error.response.data.errors);
                    setFormData({ ...formData, errors: errors, hasErrors: true, isSubmitting: false });
                    return;
                }

                if (error.response.status == 401) {
                    setShowModal(false);
                    enqueueSnackbar('Invalid reset password token!', { variant: 'error' });
                    return;
                }
                
                setShowModal(false);
                enqueueSnackbar('Something went wrong. Please try again', { variant: 'error' });
            })
    }

    return (
        <React.Fragment>
            {resetToken ? (
                <Modal
                    showModal={showModal}
                    showModalHandler={showModalHandler}
                >
                    {resetSuccess ? (
                        <SuccessDialog message="Your password has been successfully updated." />
                    ) : (
                            <ResetPasswordForm
                                changeHandler={changeHandler}
                                formData={formData}
                                submitHandler={submitHandler}
                            />
                        )}
                </Modal>
            ) : null}
        </React.Fragment>
    )
}