import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import AppNavigation from 'containers/AppNavigation';

export default function App() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppNavigation />
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    }
}));