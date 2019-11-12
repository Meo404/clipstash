import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { RegisterSuccessDialog } from 'components';

function RegistrationSuccess({ location }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        successParam();
    }, [])

    function successParam() {
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