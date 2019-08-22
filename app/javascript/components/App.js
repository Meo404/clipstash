import React from "react"
import { createMuiTheme, MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navigation from './Navigation/Navigation';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#b71c1c',
        },
        secondary: {
            main: '#b71c1c',
        },
    },
});

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    toolbar: theme.mixins.toolbar,
}));

export default function App() {
    const classes = useStyles();

    return (
        <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline/>
                <Navigation />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                </main>
            </div>
        </MuiThemeProvider>
    )
}