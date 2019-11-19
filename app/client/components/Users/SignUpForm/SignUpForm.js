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
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import useStyles from './Styles';

export default function SignUpForm(props) {
    const { changeHandler, signUpData, submitHandler } = props;
    const classes = useStyles();

    return (
        <Container maxWidth="xs">
            <div className={classes.signUpContainer}>
                <Avatar className={classes.avatar}>
                    <PersonAddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
               </Typography>
                <form className={classes.signUpForm} onSubmit={submitHandler} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                value={signUpData.userName}
                                onChange={changeHandler}
                                name="userName"
                                variant="outlined"
                                required
                                fullWidth
                                id="userName"
                                label="User Name"
                                autoFocus
                                error={signUpData.errors.userName != null}
                                helperText={
                                    signUpData.errors.userName != null ? signUpData.errors.userName : null
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={signUpData.email}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={changeHandler}
                                error={signUpData.errors.email != null}
                                helperText={
                                    signUpData.errors.email != null ? signUpData.errors.email : null
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={signUpData.password}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={changeHandler}
                                error={signUpData.errors.password != null}
                                helperText={
                                    signUpData.errors.password != null ? signUpData.errors.password : null
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={signUpData.passwordConfirmation}
                                variant="outlined"
                                required
                                fullWidth
                                name="passwordConfirmation"
                                label="Confirm password"
                                type="password"
                                id="passwordConfirmation"
                                autoComplete="current-password"
                                onChange={changeHandler}
                                error={signUpData.errors.passwordConfirmation != null}
                                helperText={
                                    signUpData.errors.passwordConfirmation != null ? signUpData.errors.passwordConfirmation : null
                                }
                            />
                        </Grid>
                    </Grid>
                    <Button
                        disabled={signUpData.isSubmitting}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}