import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { withRouter } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import withErrorHandler from "hoc/withErrorHandler";
import {
    LoadingIndicator,
    MaxWidthContainer,
    RecommendedSubmissions,
    RecommendedSubreddits
} from "components";

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
        const result = await axios("/api/v1/recommended_submissions/", { params: { max_results: 16 } });
        if (result) {
            setSubmissions({ submissions: result.data.submissions, isLoading: false });
        }
    }

    async function fetchRecommendedSubreddits() {
        const params = { page: subreddits.page };
        const result = await axios("/api/v1/recommended_subreddits/", { params: params });
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
        return showMore ? submissions.submissions : submissions.submissions.slice(0, 8)
    }

    function showMoreHandler() {
        setShowMore(true);
    }

    let homeContent = (
        <MaxWidthContainer>
            <RecommendedSubmissions
                history={history}
                showMore={showMore}
                showMoreHandler={showMoreHandler}
                submissions={displayedSubmissions()}
            />
            <InfiniteScroll
                hasMore={subreddits.hasMore}
                initialLoad={true}
                loader={<LoadingIndicator key="loadingIndicator" />}
                loadMore={fetchRecommendedSubreddits}
            >
                <RecommendedSubreddits subreddits={subreddits.subreddits} history={history} />
            </InfiniteScroll>
        </MaxWidthContainer>
    )

    if (submissions.isLoading) {
        homeContent = (
            <MaxWidthContainer>
                <LoadingIndicator />
            </MaxWidthContainer>
        )
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>ProjectFree - Gaming Videos from Reddit</title>
            </Helmet>
            {homeContent}
        </React.Fragment>
    );
}

export default withRouter(withErrorHandler(Home));
