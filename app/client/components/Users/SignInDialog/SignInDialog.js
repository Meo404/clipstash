import React from 'react';
import { Dialog, Button } from '@material-ui/core';
import SignIn from 'containers/SignIn';

import useStyles from './Styles';

export default function SignInDialog(props) {
    const { showSignIn, showSignInHandler } = props;
    const classes = useStyles();

    return (
        <Dialog
            open={showSignIn}
            onClose={showSignInHandler}
            classes={{ paper: classes.signInPager }}
        >
            <SignIn closeDialog={showSignInHandler} />
            <Button
                onClick={showSignInHandler}
                className={classes.closeDialogButton}
            >
                Close
            </Button>
        </Dialog>
    )
}