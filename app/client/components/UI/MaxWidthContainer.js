import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export default function MaxWidthContainer({ children }) {
    const classes = useStyles();

    return (
        <div className={classes.content}>
            <div className={classes.toolbar} />
            {children}
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    content: {
        width: "100%",
        maxWidth: 1280,
        marginLeft: 'auto',
        marginRight: 'auto',
        flexGrow: 1,
        padding: theme.spacing(0),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(3)
        },
    },
    toolbar: theme.mixins.toolbar,
}));