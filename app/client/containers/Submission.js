import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import RelatedSubmissionsList from "./RelatedSubmissionsList";
import withErrorHandler from "hoc/withErrorHandler";
import {
    LoadingIndicator,
    MaxWidthContainer,
    SubmissionCard,
    SubmissionCardLinks
} from "components";

const DEFAULT_SORT_METHOD = "hot";

function Submission(props) {
    const { match, location } = props;
    const [data, setData] = useState({ submission: null, isLoading: true });
    const slug = match.params.slug;
    const relatedSortMethod = setRelatedSortMethod();

    useEffect(() => {
        setData({ submission: null, isLoading: true })
        fetchData();
    }, [slug]);

    async function fetchData() {
        const result = await axios("/api/v1/submission/" + slug);
        setData({ submission: result.data.submission, isLoading: false });
    }

    function setRelatedSortMethod() {
        if (location.state && location.state.sortMethod) {
            return location.state.sortMethod;
        }

        return DEFAULT_SORT_METHOD;
    }

    function getAfterScore() {
        return relatedSortMethod === "hot" ? data.submission.hot_score : data.submission.score
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{data.submission ? data.submission.title : ""}</title>
            </Helmet>
            <MaxWidthContainer>
                <LoadingIndicator key="loadingIndicator" show={data.isLoading} />
                {data.isLoading ? null : (
                    <Grid>
                        <SubmissionCard submission={data.submission} />
                        <SubmissionCardLinks submission={data.submission} />
                        <RelatedSubmissionsList
                            displayName={data.submission.subreddit.display_name}
                            sortMethod={relatedSortMethod}
                            afterScore={getAfterScore()}
                        />
                    </Grid>
                )}
            </MaxWidthContainer>
        </React.Fragment>
    );
}

export default withErrorHandler(Submission);