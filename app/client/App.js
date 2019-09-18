import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from "react-router-dom";
import AppNavigation from 'containers/AppNavigation';
import SubmissionList from 'containers/SubmissionList';
import SubredditList from 'containers/SubredditList';

export default function App() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppNavigation />
            <Switch>
                <Route path='/subreddits' exact component={SubredditList} />
                <Route path='/r/:displayName' component={SubmissionList} />
            </Switch>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    }
}));