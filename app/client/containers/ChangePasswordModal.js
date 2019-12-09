import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { ApiClient } from 'ApiClient';
import { ChangePasswordForm, Modal } from 'components';
import { parseValidationErrors, validatePasswordChangeData } from 'utils/UserValidation';

const INITIAL_STATE = {
    currentPassword: '',
    password: '',
    passwordConfirmation: '',
    hasErrors: false,
    isSubmitting: false,
    errors: {
        currentPassword: null,
        password: null,
        passwordConfirmation: null
    }
}

export default function ChangePasswordModal(props) {
    const {
        showChangePassword,
        showChangePasswordHandler,
        showChangePasswordSuccessHandler
    } = props;
    const [formData, setFormData] = useState(INITIAL_STATE);
    const { enqueueSnackbar } = useSnackbar();
    const client = new ApiClient();

    function changeHandler(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function submitHandler(event) {
        event.preventDefault();
        const validatedData = validatePasswordChangeData(formData);

        if (validatedData.hasErrors) {
            setFormData({ ...validatedData, isSubmitting: false });
            return;
        }
        setFormData({ ...validatedData, isSubmitting: true });
        changePassword();
    }

    async function changePassword() {
        const params = {
            current_password: formData.currentPassword,
            password: formData.password,
            password_confirmation: formData.passwordConfirmation
        };

        await client.patch('api/v1/auth/password', params)
            .then(() => {
                showChangePasswordSuccessHandler();
                setFormData(INITIAL_STATE);
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    const errors = parseValidationErrors(error.response.data.errors);
                    setFormData({ ...formData, errors: errors, hasErrors: true, isSubmitting: false });
                    return;
                }

                if (error.response.status == 401) {
                    showChangePasswordHandler();
                    enqueueSnackbar('Invalid reset password token!', { variant: 'error' });
                    return;
                }

                showChangePasswordHandler();
                enqueueSnackbar('Something went wrong. Please try again', { variant: 'error' });
            })
    }

    return (
        <Modal
            showModal={showChangePassword}
            showModalHandler={showChangePasswordHandler}
        >
            <ChangePasswordForm
                changeHandler={changeHandler}
                formData={formData}
                submitHandler={submitHandler}
            />
        </Modal>
    )
}