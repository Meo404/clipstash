import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import axios from "axios";
import MaxWidthContainer from 'components/UI/MaxWidthContainer';
import LoadingIndicator from 'components/UI/LoadingIndicator';
import Typography from "@material-ui/core/Typography";
import withErrorHandler from "hoc/withErrorHandler";
import SubmissionList from "../components/SubmissionList";

function Home(props) {
    const { history } = props;
    const [submissions, setSubmissions] = useState({ submissions: [], isLoading: true });
    const [subreddits, setSubreddits] = useState([]);

    let recommendedSubmissions, recommendedSubreddits;

    useEffect(() => {
        fetchRecommendedSubmissions();
        fetchRecommendedSubreddits();
    }, []);

    async function fetchRecommendedSubmissions() {
        const result = await axios('/api/v1/recommended_submissions/');
        if (result) {
            setSubmissions({ submissions: result.data.submissions, isLoading: false });
        }
    }

    async function fetchRecommendedSubreddits() {
        const result = await axios('/api/v1/recommended_subreddits/');
        if (result) {
            setSubreddits(result.data.subreddits);
        }
    }

    if (submissions.isLoading) {
        recommendedSubmissions = <LoadingIndicator key='loadingIndicator' />;
    } else {
        recommendedSubmissions = (
            <React.Fragment>
                <Typography
                    variant="h6"
                    style={{ padding: 10 }}
                >
                    Recommended Videos
            </Typography>
                <SubmissionList
                    submissions={submissions.submissions}
                    searchState={{}}
                    history={history}
                />
            </React.Fragment>
        )
    }

    return (
        <MaxWidthContainer>
            {recommendedSubmissions}

            {subreddits.map((subreddit) => (
                <h1>{subreddit.display_name}</h1>
            ))}
        </MaxWidthContainer>
    );
}

export default withRouter(withErrorHandler(Home));