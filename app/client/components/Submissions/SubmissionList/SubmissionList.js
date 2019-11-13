import React from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { SubmissionListCard } from "components";

export default function SubmissionList(props) {
    const { 
        submissions, 
        searchState,
        showSubreddits,
    } = props;
    const history = useHistory();

    function handleSubmissionClick(slug) {
        history.push({
            pathname: "/submission/" + slug,
            state: searchState
        });
    }

    return (
        <Grid container spacing={0}>
            {submissions.map((submission) => (
                <SubmissionListCard
                    key={submission.reddit_fullname}
                    clickHandler={handleSubmissionClick} 
                    showSubreddit={showSubreddits}
                    submission={submission} 
                />
            ))}
        </Grid>
    )
}
