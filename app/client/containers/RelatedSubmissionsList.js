import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import LoadingIndicator from 'components/UI/LoadingIndicator';
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
    const [data, setData] = useState({ submissions: [], isLoading: true });

    let content;

    useEffect(() => {
        fetchRelatedSubmisisons();
    }, []);

    async function fetchRelatedSubmisisons() {
        const params = { sort: sortMethod, after_score: afterScore, max_results: 8 };
        const result = await axios('/api/v1/submissions/' + displayName, { params: params });
        if (result) {
            setData({submissions: result.data.submissions, isLoading: false});
        }
    }

    function handleSubmissionClick(slug) {
        history.push({
            pathname: '/submission/' + slug,
            state: { sortMethod: sortMethod }
        });
    }

    if (data.isLoading) {
        content = <LoadingIndicator key='loadingIndicator' />;
    } else {
        content = (
            <Grid container spacing={0} >
                {data.submissions.map((submission) => (
                    <SubmissionListCard
                        submission={submission}
                        key={submission.reddit_fullname}
                        clickHandler={handleSubmissionClick} />
                ))}
            </Grid>
        )
    }

    return (
        <React.Fragment>
            <Typography
                variant="h6"
                style={{ padding: 10 }}
            >
                More Videos
                </Typography>
            {content}
        </React.Fragment>
    );
}

export default withRouter(withErrorHandler(RelatedSubmissionsList));