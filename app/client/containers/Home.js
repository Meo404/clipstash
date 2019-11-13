import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ApiClient } from "ApiClient";
import InfiniteScroll from "react-infinite-scroller";
import RegistrationSuccess from "containers/RegistrationSuccess";
import {
    LoadingIndicator,
    MaxWidthContainer,
    RecommendedSubmissions,
    RecommendedSubreddits
} from "components";

export default function Home() {
    const [submissions, setSubmissions] = useState({ submissions: [], isLoading: true });
    const [subreddits, setSubreddits] = useState({ subreddits: [], hasMore: true, page: 1 });
    const [showMore, setShowMore] = useState(false);
    const client = new ApiClient();

    useEffect(() => {
        fetchRecommendedSubmissions();
        fetchRecommendedSubreddits();
    }, []);

    async function fetchRecommendedSubmissions() {
        await client.get("/api/v1/recommended_submissions/", { params: { max_results: 16 } })
            .then((response) => {
                setSubmissions({ submissions: response.data.submissions, isLoading: false });
            });
    }

    async function fetchRecommendedSubreddits() {
        const params = { page: subreddits.page };
        await client.get("/api/v1/recommended_subreddits/", { params: params })
            .then((response) => {
                const newData = {
                    subreddits: [...subreddits.subreddits, ...response.data.subreddits],
                    page: subreddits.page + 1,
                    hasMore: response.data.meta.next_page != null
                };
                setSubreddits(newData);
            })
    }

    function displayedSubmissions() {
        return showMore ? submissions.submissions : submissions.submissions.slice(0, 8)
    }

    function showMoreHandler() {
        setShowMore(true);
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>ProjectFree - Gaming Videos from Reddit</title>
            </Helmet>
            <MaxWidthContainer>
                <LoadingIndicator show={submissions.isLoading} />
                {submissions.isLoading ? null : (
                    <React.Fragment>
                        <RecommendedSubmissions
                            showMore={showMore}
                            showMoreHandler={showMoreHandler}
                            submissions={displayedSubmissions()}
                        />
                        <InfiniteScroll
                            hasMore={subreddits.hasMore}
                            initialLoad={true}
                            loader={<LoadingIndicator key="loadingIndicator" show={true} />}
                            loadMore={fetchRecommendedSubreddits}
                        >
                            <RecommendedSubreddits subreddits={subreddits.subreddits} history={history} />
                        </InfiniteScroll>
                    </React.Fragment>
                )}
            </MaxWidthContainer>
            {/* RegistrationSuccess will only be displayed on mail confirmation */}
            <RegistrationSuccess />
        </React.Fragment>
    );
}

