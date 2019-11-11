import React from 'react';
import { MaxWidthContainer } from 'components';
import { Avatar, Grid, Paper, Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import useStyles from './Styles';

export default function SignUpSuccess({ email, userName }) {
    const classes = useStyles();

    return (
        <MaxWidthContainer>
            <Paper className={classes.regSuccess}>
                <Grid container>
                    <Avatar className={classes.successIcon}>
                        <CheckCircleIcon />
                    </Avatar>
                        <Typography variant="h6" component="h3" className={classes.headingText}>
                            Welcome {userName},
                        </Typography>
                    <Grid item xs={12}>
                        <Typography component="p" className={classes.helperText}>
                            A verification link has been sent to <strong>{email}</strong>. Please click on the
                            link to verify your email address and finalize your registration.
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </MaxWidthContainer>
    )
}