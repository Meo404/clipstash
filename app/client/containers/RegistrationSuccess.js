import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RegisterSuccessDialog } from 'components';

export default function RegistrationSuccess() {
    const [show, setShow] = useState(false);
    const location = useLocation();

    useEffect(() => {
        checkRegisterSuccessParam();
    }, [])

    /**
     * Function to check if the account_confirmation_success param is present and equals true.
     * If so it will trigger showing the RegisterSuccessDialog
     */
    function checkRegisterSuccessParam() {
        if (location.search && location.search.includes("account_confirmation_success=true")) {
            setShow(true);
        }
    }

    function closeDialogHandler() {
        setShow(false);
    }

    return (
        <React.Fragment>
            {show ? <RegisterSuccessDialog show={show} closeDialogHandler={closeDialogHandler} /> : null}
        </React.Fragment>
    )
}