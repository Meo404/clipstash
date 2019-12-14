import React, { useContext, useEffect, useState } from "react";
import AuthContext from 'contexts/AuthContext';
import UserActionMenuContext from 'contexts/UserActionMenuContext';
import { useLocation, useParams } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { ApiClient } from 'ApiClient';
import { useSnackbar } from 'notistack';
import Grid from "@material-ui/core/Grid";
import RelatedSubmissionsList from "./RelatedSubmissionsList";
import {
    LoadingIndicator,
    MaxWidthContainer,
    SubmissionCard,
    SubmissionCardLinks
} from "components";

const DEFAULT_SORT_METHOD = "hot";

export default function Submission() {
    const [{ isLoggedIn},] = useContext(AuthContext);
    const [{ showSignUp }, dispatch] = useContext(UserActionMenuContext);
    const [data, setData] = useState({ submission: null, isLoading: true });
    const location = useLocation();
    const slug = useParams().slug;
    const relatedSortMethod = setRelatedSortMethod();
    const { enqueueSnackbar } = useSnackbar();
    const client = new ApiClient('/', true);

    useEffect(() => {
        setData({ submission: null, isLoading: true })
        fetchData();
    }, [slug]);

    async function fetchData() {
        await client.get("/api/v1/submission/" + slug).then((response) => {
            setData({ submission: response.data.submission, isLoading: false });
        })
    }

    function setRelatedSortMethod() {
        if (location.state && location.state.sortMethod) {
            return location.state.sortMethod;
        }

        return DEFAULT_SORT_METHOD;
    }

    function saveButtonHandler() {
        if(isLoggedIn) {
            data.submission.is_favorite ? removeFromSavedVideos() : addToSavedVideos()
            return;
        }

        if(!showSignUp) { 
            dispatch({ type: 'SIGN_UP' });
            return;
        }
    }

    function reportButtonHandler() {
        if(isLoggedIn) {
            dispatch({ 
                type: 'REPORT_SUBMISSION',
                submissionFullname: data.submission.reddit_fullname 
            });
            return;
        }

        dispatch({ type: 'SIGN_UP' });
        return;
    }

    async function addToSavedVideos() {
        const params = { submission_fullname: data.submission.reddit_fullname }
        await client.post("/api/v1/favorite_submissions", params).then(() => {
            const submission = { ...data.submission, is_favorite: true };
            setData({ ...data, submission: submission });
            enqueueSnackbar('Successfully added to saved videos', { variant: 'success' });
        })
    }

    async function removeFromSavedVideos() {
        await client.delete("/api/v1/favorite_submissions?submission_fullname=" +  data.submission.reddit_fullname )
            .then(() => {
                const submission = { ...data.submission, is_favorite: false };
                setData({ ...data, submission: submission });
                enqueueSnackbar('Successfully removed from saved videos', { variant: 'success' });
            })
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
                        <SubmissionCard 
                            submission={data.submission}
                            reportButtonHandler={reportButtonHandler}
                            saveButtonHandler={saveButtonHandler} 
                        />
                        <SubmissionCardLinks submission={data.submission} />
                        <RelatedSubmissionsList
                            displayName={data.submission.subreddit.display_name}
                            slug={slug}
                            sortMethod={relatedSortMethod}
                        />
                    </Grid>
                )}
            </MaxWidthContainer>
        </React.Fragment>
    );
}
