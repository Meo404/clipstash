import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import withErrorHandler from "hoc/withErrorHandler";
import { 
    LoadingIndicator, 
    MaxWidthContainer, 
    SectionHeader,
    SubmissionList
} from "components";

function Trending(props) {
    const { history } = props;
    const [data, setData] = useState({ submissions: [], hasMore: true, page: 1 });

    async function fetchSubmissionsData() {
        const params = { max_results: 40, page: data.page };
        const result = await axios("/api/v1/recommended_submissions/", { params: params });
        if (result) {
            const newData = {
                submissions: [...data.submissions, ...result.data.submissions],
                page: data.page + 1,
                hasMore: result.data.meta.next_page != null
            };
            setData(newData);
        }
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>Trending Videos</title>
            </Helmet>
            <MaxWidthContainer>
                <SectionHeader headerText="Trending Videos" />
                <InfiniteScroll
                    initialLoad={true}
                    loadMore={fetchSubmissionsData}
                    hasMore={data.hasMore}
                    loader={<LoadingIndicator key="loadingIndicator" show={true}/>}
                >
                    <SubmissionList
                        submissions={data.submissions}
                        searchState={{}}
                        history={history} 
                    />
                </InfiniteScroll>
            </MaxWidthContainer>
        </React.Fragment>

    );
}

export default withErrorHandler(Trending);