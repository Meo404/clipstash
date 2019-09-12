import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export default function MaxWidthContainer(props) {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            {props.children}
        </main>
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