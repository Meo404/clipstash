import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroller';
import MaxWidthContainer from 'components/UI/MaxWidthContainer';
import LoadingIndicator from 'components/UI/LoadingIndicator';
import withErrorHandler from "hoc/withErrorHandler";
import RecommendedSubmissions from "components/RecommendedSubmissions";
import RecommendedSubreddits from "components/RecommendedSubreddits";

function Home(props) {
    const { history } = props;
    const [submissions, setSubmissions] = useState({ submissions: [], isLoading: true });
    const [subreddits, setSubreddits] = useState({ subreddits: [], hasMore: true, page: 1 });
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
        const params = { page: subreddits.page };
        const result = await axios('/api/v1/recommended_subreddits/', { params: params });
        if (result) {
            const newData = {
                subreddits: [...subreddits.subreddits, ...result.data.subreddits],
                page: subreddits.page + 1,
                hasMore: result.data.meta.next_page != null
            };
            setSubreddits(newData);
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
            <InfiniteScroll
                    initialLoad={true}
                    loadMore={fetchRecommendedSubreddits}
                    hasMore={subreddits.hasMore}
                    loader={<LoadingIndicator key='loadingIndicator' />}
                >
                    <RecommendedSubreddits subreddits={subreddits.subreddits} history={history} />
                </InfiniteScroll>
        </MaxWidthContainer>
    );
}

export default withRouter(withErrorHandler(Home));
