import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navigation from './Navigation/Navigation';
import SubredditGrid from "./Subreddits/SubredditGrid";

export default function App() {
    const classes = useStyles();

    return (
        <MuiThemeProvider theme={theme}>
            <Router>
                <div className={classes.root}>
                    <CssBaseline/>
                    <Navigation/>
                    <main className={classes.content}>
                        <div className={classes.toolbar}/>
                        <Switch>
                            <Route path='/subreddits' exact component={SubredditGrid}/>
                        </Switch>
                    </main>
                </div>
            </Router>
        </MuiThemeProvider>
    )
}

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