import React from 'react';
import {
    Button,
    TextField,
    Container,
    Grid,
    Typography
} from '@material-ui/core';

import useStyles from './Styles';

export default function ReportSubmissionForm(props) {
    const { 
        changeHandler,
        formData,
        submitHandler
    } = props;
    const classes = useStyles();

    return (
        <Container maxWidth="xs">
            <div className={classes.reportSubmissionContainer}>
                <Typography component="h1" variant="h5" className={classes.formTitle}>
                    Report Content
               </Typography>
               <Typography component="p" variant="body2" className={classes.instructionText}>
                    Please explain why this content should be removed from Clipstash.
               </Typography>
                <form className={classes.reportSubmissionForm} onSubmit={submitHandler} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                value={formData.email}
                                variant="outlined"
                                required
                                fullWidth
                                multiline={true}
                                rows={4}
                                rowsMax={10}
                                id="reason"
                                label="Enter reason"
                                name="reason"
                                autoComplete="reason"
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
                        Submit Report
                    </Button>
                </form>
            </div>
        </Container>
    )
}