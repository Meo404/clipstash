import React from "react";
import { Route, Switch } from "react-router-dom";

export default function routes() {
    return (
        <Switch>
            <Route path='/subreddits' exact component={SubredditGrid} />
            <Route path='/r/:displayName' component={SubmissionGrid} />
        </Switch>
    )
}