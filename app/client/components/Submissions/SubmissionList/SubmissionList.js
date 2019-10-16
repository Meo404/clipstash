import React from "react";
import Grid from "@material-ui/core/Grid";
import { SubmissionListCard } from "components";

export default function SubmissionList(props) {
    const { 
        history,
        submissions, 
        searchState 
    } = props

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
                    submission={submission}
                />
            ))}
        </Grid>
    )
}