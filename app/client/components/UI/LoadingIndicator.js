import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function loadingIndicator() {
    const classes = useStyles();
    return <CircularProgress classes={{ root: classes.root }} />
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'inherit',
        margin: 'auto',
        marginTop: 25
    }
}));