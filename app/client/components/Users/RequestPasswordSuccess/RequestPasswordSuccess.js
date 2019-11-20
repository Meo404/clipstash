import React from 'react';
import { 
    Avatar,
    Container,
    Divider,
    Grid,
    Typography
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import useStyles from './Styles';

export default function RequestPasswordSuccess({ email }) {
    const classes = useStyles();

    return (
        <Container maxWidth="xs">
            <Grid container className={classes.requestPasswordSuccess}>
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
                        An email has been sent to <strong>{email}</strong> containing instructions for resetting your password.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}