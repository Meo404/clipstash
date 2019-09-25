import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import LoadingIndicator from 'components/UI/LoadingIndicator';
import MaxWidthContainer from "components/UI/MaxWidthContainer";
import withErrorHandler from "hoc/withErrorHandler";

function Submission(props) {
    const [data, setData] = useState({ submission: null, isLoading: true });
    const slug = props.match.params.slug;

    useEffect(() => {
        setData({ submission: null, isLoading: true })
        fetchData();
    }, [slug]);

    async function fetchData() {
        const result = await axios('/api/v1/submission/' + slug);
        setData({ submission: result.data.submission, isLoading: false });
    }

    let title = '';
    if (data.submission != null) {
        title = data.submission.title
    }

    let content;
    if (data.isLoading) {
        content = <LoadingIndicator key='loadingIndicator' />;
    } else {
        content = (
            <Grid>
                {title}
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