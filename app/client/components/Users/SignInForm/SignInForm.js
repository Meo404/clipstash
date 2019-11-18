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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from './Styles';

export default function SignInForm(props) {
    const { changeHandler, signInData, submitHandler } = props;
    const classes = useStyles();

    return (
        <Container maxWidth="xs">
            <div className={classes.signUpContainer}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
               </Typography>
                <form className={classes.signUpForm} onSubmit={submitHandler} noValidate>
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
                                error={signInData.errors.email != null}
                                helperText={
                                    signInData.errors.email != null ? signInData.errors.email : null
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
                                error={signInData.errors.password != null}
                                helperText={
                                    signInData.errors.password != null ? signInData.errors.password : null
                                }
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