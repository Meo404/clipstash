import React from 'react';
import {
    Avatar,
    Container,
    Divider,
    Grid,
    Typography
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Modal } from 'components';

import useStyles from './Styles';

export default function SuccessModal(props) {
    const { message, showSuccess, showSuccessHandler } = props;
    const classes = useStyles();

    return (
        <Modal
            showModal={showSuccess}
            showModalHandler={showSuccessHandler}
        >
            <Container maxWidth="xs">
                <Grid container className={classes.successDialogContainer}>
                    <Avatar className={classes.successIcon}>
                        <CheckCircleIcon />
                    </Avatar>
                    <Typography variant="h6" component="h3" className={classes.headingText}>
                        Success!
                    </Typography>
                    <Divider
                        orientation="horizontal"
                        variant="fullWidth"
                        className={classes.divider}
                    />
                    <Grid item xs={12}>
                        <Typography component="p" className={classes.helperText}>
                            {message}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Modal>
    )
}