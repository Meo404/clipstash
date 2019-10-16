import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import withErrorHandler from "hoc/withErrorHandler";
import { 
    LoadingIndicator, 
    MaxWidthContainer, 
    SubredditList 
} from "components";

const INITIAL_STATE = {
    subreddits: [],
    hasMore: true,
    page: 1
};

function SubredditOverview() {
    const [data, setData] = useState(INITIAL_STATE);
    const [sortMethod, setSortMethod] = useState("popular");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchSubredditData();
    }, [sortMethod, searchTerm]);

    async function fetchSubredditData() {
        const params = { sort: sortMethod, page: data.page, q: searchTerm }
        const result = await axios("/api/v1/subreddits", { params: params });
        if (result) {
            const newData = {
                subreddits: [...data.subreddits, ...result.data.subreddits],
                page: data.page + 1,
                hasMore: result.data.meta.next_page != null
            };
            setData(newData);
        }
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>All Subreddits</title>
            </Helmet>
            <MaxWidthContainer>
                <InfiniteScroll
                    initialLoad={true}
                    loadMore={fetchSubredditData}
                    hasMore={data.hasMore}
                    loader={<LoadingIndicator key="loadingIndicator" />}
                >
                    <SubredditList subreddits={data.subreddits} />
                </InfiniteScroll>
            </MaxWidthContainer>
        </React.Fragment>
    );
}

export default withErrorHandler(SubredditOverview);