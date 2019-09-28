import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import LoadingIndicator from 'components/UI/LoadingIndicator';
import MaxWidthContainer from "components/UI/MaxWidthContainer";
import RelatedSubmissionsList from "./RelatedSubmissionsList";
import SubmissionCard from 'components/SubmissionCard';
import withErrorHandler from "hoc/withErrorHandler";

const DEFAULT_SORT_METHOD = 'hot';

function Submission(props) {
    const [data, setData] = useState({ submission: null, isLoading: true });
    const slug = props.match.params.slug;
    const relatedSortMethod = setRelatedSortMethod();

    let title = '';
    let content;

    useEffect(() => {
        setData({ submission: null, isLoading: true })
        fetchData();
    }, [slug]);

    async function fetchData() {
        const result = await axios('/api/v1/submission/' + slug);
        setData({ submission: result.data.submission, isLoading: false });
    }

    function setRelatedSortMethod() {
        if (props.location.state && props.location.state.sortMethod) {
            return props.location.state.sortMethod;
        }
       
        return DEFAULT_SORT_METHOD;
    }

    function getAfterScore() {
        return relatedSortMethod === 'hot' ? data.submission.hot_score : data.submission.score
    }

    if (data.submission != null) {
        title = data.submission.title
    }

    if (data.isLoading) {
        content = <LoadingIndicator key='loadingIndicator' />;
    } else {
        content = (
            <Grid>
                <SubmissionCard submission={data.submission} />
                <RelatedSubmissionsList 
                    displayName={data.submission.subreddit.display_name}
                    sortMethod={relatedSortMethod}
                    afterScore={getAfterScore()} 
            />
            </Grid>
        )
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <MaxWidthContainer>
                {content}
            </MaxWidthContainer>
        </React.Fragment>
    );
}

export default withErrorHandler(Submission);