import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import SubmissionListCard from "components/SubmissionListCard";
import Typography from "@material-ui/core/Typography";
import withErrorHandler from "hoc/withErrorHandler";

function RelatedSubmissionsList(props) {
    const {
        history,
        displayName,
        sortMethod,
        afterScore
    } = props;
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        fetchRelatedSubmisisons();
    }, []);

    async function fetchRelatedSubmisisons() {
        const params = { sort: sortMethod, after_score: afterScore, max_results: 8 };
        const result = await axios('/api/v1/submissions/' + displayName, { params: params });
        if (result) {
            setSubmissions(result.data.submissions);
        }
    }

    function handleSubmissionClick(slug) {
        history.push({
            pathname: '/submission/' + slug,
            state: { sortMethod: sortMethod }
        });
    }

    return (
        <React.Fragment>
            <Typography
                variant="h6"
                style={{ padding: 10 }}
            >
                More Videos
                </Typography>
            <Grid container spacing={0} >
                {submissions.map((submission) => (
                    <SubmissionListCard
                        submission={submission}
                        key={submission.reddit_fullname}
                        clickHandler={handleSubmissionClick} />
                ))}
            </Grid>
        </React.Fragment>
    );
}

export default withRouter(withErrorHandler(RelatedSubmissionsList));