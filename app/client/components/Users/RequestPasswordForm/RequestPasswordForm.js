import React from 'react';
import {
    Button,
    TextField,
    Container,
    Grid,
    Typography
} from '@material-ui/core';

import useStyles from './Styles';

export default function RequestPasswordForm(props) {
    const { changeHandler, formData, submitHandler } = props;
    const classes = useStyles();

    return (
        <Container maxWidth="xs">
            <div className={classes.requestPasswordContainer}>
                <Typography component="h1" variant="h5" className={classes.formTitle}>
                    Reset Password
               </Typography>
               <Typography component="p" variant="body2" className={classes.instructionText}>
                    Enter your email address and we will send you instructions on how to reset your password
               </Typography>
                <form className={classes.requestPasswordForm} onSubmit={submitHandler} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                value={formData.email}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={changeHandler}
                                error={formData.hasErrors}
                                helperText={
                                    formData.hasErrors ? formData.error : null
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