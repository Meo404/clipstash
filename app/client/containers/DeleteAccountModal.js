import React, { useContext, useState } from 'react';
import AuthContext from 'contexts/AuthContext';
import { ApiClient } from 'ApiClient';
import { useSnackbar } from 'notistack';
import { Modal } from 'components';
import { validateDeleteAccountData } from 'utils/UserValidation';
import { DeleteAccountForm } from '../components';

const INITIAL_STATE = {
    userName: '',
    deleteConfirmation: '',
    hasErrors: false,
    isSubmitting: false,
    errors: {
        userName: null,
        deleteConfirmation: null
    }
}

export default function DeleteAccountModal(props) {
    const {
        showDeleteAccount,
        showDeleteAccountHandler,
        showDeleteAccountSuccessHandler,
    } = props;
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [{ userName }, dispatch] = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const client = new ApiClient();

    function changeHandler(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function submitHandler(event) {
        event.preventDefault();
        const validatedData = validateDeleteAccountData(formData, userName);

        if (validatedData.hasErrors) {
            setFormData({ ...validatedData, isSubmitting: false });
            return;
        }

        setFormData({ ...validatedData, isSubmitting: true });
        deleteUser();
    }

    async function deleteUser() {
        await client.delete('api/v1/auth')
            .then(() => {
                dispatch({ type: 'LOGOUT' });
                showDeleteAccountSuccessHandler();
                setFormData(INITIAL_STATE);
            })
            .catch((error) => {
                enqueueSnackbar('Something went wrong during account deletion', { variant: 'error' });
                setFormData(INITIAL_STATE);
            })
    }

    return (
        <Modal
            showModal={showDeleteAccount}
            showModalHandler={showDeleteAccountHandler}
        >
            <DeleteAccountForm
                formData={formData}
                changeHandler={changeHandler}
                submitHandler={submitHandler}
            />
        </Modal>
    )
}