import React from 'react';
import {
    Avatar,
    Button,
    Container,
    Grid,
    TextField,
    Typography
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import useStyles from './Styles';

export default function DeleteAccountForm(props) {
    const {
        changeHandler,
        formData,
        submitHandler
    } = props;
    const classes = useStyles();

    return (
        <Container maxWidth="xs">
            <div className={classes.deleteAccountContainer}>
                <Avatar className={classes.avatar}>
                    <DeleteForeverIcon />
                </Avatar>
                <Typography component="h1" variant="h5" className={classes.formTitle}>
                    Delete Account
               </Typography>
                <Typography component="p" variant="body2" className={classes.instructionText}>
                    THIS ACTION WILL PERMANENTLY DELETE YOUR ACCOUNT. CONTINUE WITH CAUTION
               </Typography>
                <form className={classes.deleteAccountForm} onSubmit={submitHandler} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                value={formData.userName}
                                variant="outlined"
                                required
                                fullWidth
                                id="userName"
                                label="Enter your user name"
                                name="userName"
                                onChange={changeHandler}
                                error={formData.errors.userName != null}
                                helperText={
                                    formData.errors.userName != null ? formData.errors.userName : null
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={formData.deleteConfirmation}
                                variant="outlined"
                                required
                                fullWidth
                                id="deleteConfirmation"
                                label="TYPE: 'DELETE'"
                                name="deleteConfirmation"
                                onChange={changeHandler}
                                error={formData.errors.deleteConfirmation != null}
                                helperText={
                                    formData.errors.deleteConfirmation != null ? formData.errors.deleteConfirmation : null
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
                        DELETE MY ACCOUNT
                    </Button>
                </form>
            </div>
        </Container>
    )
}