import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import axios from "axios";
import MaxWidthContainer from 'components/UI/MaxWidthContainer';
import LoadingIndicator from 'components/UI/LoadingIndicator';
import withErrorHandler from "hoc/withErrorHandler";
import RecommendedSubmissions from "components/RecommendedSubmissions";
import RecommendedSubreddits from "components/RecommendedSubreddits";

function Home(props) {
    const { history } = props;
    const [submissions, setSubmissions] = useState({ submissions: [], isLoading: true });
    const [subreddits, setSubreddits] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        fetchRecommendedSubmissions();
        fetchRecommendedSubreddits();
    }, []);

    async function fetchRecommendedSubmissions() {
        const result = await axios('/api/v1/recommended_submissions/', { params: { max_results: 16 } });
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

    function displayedSubmissions() {
        return showMore ? submissions.submissions : submissions.submissions.slice(0,8)
    }

    function showMoreHandler() {
        setShowMore(true);
    }

    let recommendedSubmissions = (
        <RecommendedSubmissions 
            submissions={displayedSubmissions()} 
            history={history}
            showMore={showMore}
            showMoreHandler={showMoreHandler} 
        />
    )

    if (submissions.isLoading) {
        recommendedSubmissions = <LoadingIndicator />;
    }

    return (
        <MaxWidthContainer>
            {recommendedSubmissions}
            <RecommendedSubreddits subreddits={subreddits} history={history} />
        </MaxWidthContainer>
    );
}

export default withRouter(withErrorHandler(Home));
