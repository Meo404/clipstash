import React from 'react';
import { 
    Avatar,
    Button,
    Container,
    Dialog,
    Divider,
    Grid,
    Typography
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import useStyles from './Styles';

export default function RegisterSuccessDialog(props) {
    const { show, closeDialogHandler } = props;
    const classes = useStyles();

    return (
        <Dialog
            open={show}
            onClose={closeDialogHandler}
            classes={{ paper: classes.registerSuccessPaper }}
        >
            <Container maxWidth="xs">
                <Grid container className={classes.registerSuccess}>
                    <Avatar className={classes.successIcon}>
                        <CheckCircleIcon />
                    </Avatar>
                    <Typography variant="h6" component="h3" className={classes.headingText}>
                        Welcome on board!
                    </Typography>
                    <Divider
                        orientation="horizontal"
                        variant="fullWidth"
                        className={classes.divider}
                    />
                    <Grid item xs={12}>
                        <Typography component="p" className={classes.helperText}>
                            You have successfully confirmed your Email address. You can now log in using your credentials.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
            <Button
                onClick={closeDialogHandler}
                className={classes.closeDialogButton}
            >
                Close
            </Button>
        </Dialog>
    )
}