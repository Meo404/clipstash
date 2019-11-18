import React from 'react';
import { Dialog, Button } from '@material-ui/core';
import SignUp from 'containers/SignUp';

import useStyles from './Styles';

export default function SignUpDialog(props) {
    const { showSignUp, showSignUpHandler } = props;
    const classes = useStyles();

    return (
        <Dialog
            open={showSignUp}
            onClose={showSignUpHandler}
            classes={{ paper: classes.signUpPaper }}
        >
            <SignUp />
            <Button
                onClick={showSignUpHandler}
                className={classes.closeDialogButton}
            >
                Close
            </Button>
        </Dialog>
    )
}