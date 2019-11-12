import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { RegisterSuccessDialog } from 'components';

function RegistrationSuccess({ location }) {
    const [show, setShow] = useState(false);

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

export default withRouter(RegistrationSuccess);