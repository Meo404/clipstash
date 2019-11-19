import React from 'react';
import {
    Avatar,
    Button,
    TextField,
    Container,
    Link,
    Grid,
    Typography
} from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import useStyles from './Styles';

export default function SignInForm(props) {
    const { changeHandler, signInData, submitHandler } = props;
    const classes = useStyles();

    return (
        <Container maxWidth="xs">
            <div className={classes.signInContainer}>
                <Avatar className={classes.avatar}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
               </Typography>
                <form className={classes.signInForm} onSubmit={submitHandler} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                value={signInData.email}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={changeHandler}
                                error={signInData.hasErrors}
                                helperText={
                                    signInData.hasErrors ? "Invalid login credentials. Please try again." : null
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={signInData.password}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={changeHandler}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        disabled={signInData.isSubmitting}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Forgot your password? Click here
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}