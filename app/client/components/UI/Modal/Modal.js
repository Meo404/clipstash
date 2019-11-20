import React from 'react';
import { Dialog, Button } from '@material-ui/core';

import useStyles from './Styles';

export default function Modal(props) {
    const { children, showModal, showModalHandler } = props;
    const classes = useStyles();

    return (
        <Dialog
            open={showModal}
            onClose={showModalHandler}
            classes={{ paper: classes.modalPager }}
        >
            {children}
            <Button
                onClick={showModalHandler}
                className={classes.closeModalButton}
            >
                Close
            </Button>
        </Dialog>
    )
}