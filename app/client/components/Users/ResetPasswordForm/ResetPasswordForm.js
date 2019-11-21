import React from 'react';
import {
    Button,
    TextField,
    Container,
    Grid,
    Typography
} from '@material-ui/core';

import useStyles from './Styles';

export default function ResetPasswordForm(props) {
    const { changeHandler, formData, submitHandler } = props;
    const classes = useStyles();

    return (
        <Container maxWidth="xs">
            <div className={classes.resetPasswordContainer}>
                <Typography component="h1" variant="h5" className={classes.formTitle}>
                    Reset Password
               </Typography>
                <Typography component="p" variant="body2" className={classes.instructionText}>
                    Please enter your new password.
               </Typography>
                <form className={classes.resetPasswordForm} onSubmit={submitHandler} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                value={formData.password}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={changeHandler}
                                error={formData.errors.password != null}
                                helperText={
                                    formData.errors.password != null ? formData.errors.password : null
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={formData.passwordConfirmation}
                                variant="outlined"
                                required
                                fullWidth
                                name="passwordConfirmation"
                                label="Confirm password"
                                type="password"
                                id="passwordConfirmation"
                                autoComplete="current-password"
                                onChange={changeHandler}
                                error={formData.errors.passwordConfirmation != null}
                                helperText={
                                    formData.errors.passwordConfirmation != null ? formData.errors.passwordConfirmation : null
                                }
                            />
                        </Grid>
                    </Grid>
                    <Button
                        disabled={formData.isSubmitting}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Reset Password
                    </Button>
                </form>
            </div>
        </Container>
    )
}