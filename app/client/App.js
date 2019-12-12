import React from "react"
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import AppNavigation from "containers/AppNavigation";
import Home from "containers/Home";
import NotFound from "components/NotFound";
import ProtectedRoute from 'hoc/ProtectedRoute';
import SavedVideos from "containers/SavedVideos";
import Submission from "containers/Submission";
import Subreddit from "containers/Subreddit";
import SubredditOverview from "containers/SubredditOverview";
import Trending from "containers/Trending";
import UserActionModals from "containers/UserActionModals";
import UserHistory from 'containers/UserHistory';
import UserSettings from 'containers/UserSettings';

export default function App() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppNavigation />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/trending" exact component={Trending} />
                <Route path="/subreddits" exact component={SubredditOverview} />
                <Route path="/r/:displayName" component={Subreddit} />
                <Route path="/submission/:slug" component={Submission} />
                <ProtectedRoute path="/history" component={UserHistory} />
                <ProtectedRoute path="/settings" component={UserSettings} />
                <ProtectedRoute path="/saved_videos" component={SavedVideos} />
                <Route component={NotFound} />
            </Switch>
            <UserActionModals />
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
    }
}));