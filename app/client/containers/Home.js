import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from 'react-router-dom';
import axios from "axios";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import MaxWidthContainer from 'components/UI/MaxWidthContainer';
import LoadingIndicator from 'components/UI/LoadingIndicator';
import Typography from "@material-ui/core/Typography";
import withErrorHandler from "hoc/withErrorHandler";
import SubmissionList from "../components/SubmissionList";

function Home(props) {
    const { history } = props;
    const classes = useStyles();

    const [submissions, setSubmissions] = useState({ submissions: [], isLoading: true });
    const [subreddits, setSubreddits] = useState([]);
    const [showMore, setShowMore] = useState(false);

    let recommendedSubmissions;

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

    function showMoreHandler() {
        setShowMore(true);
    }

    if (submissions.isLoading) {
        recommendedSubmissions = <LoadingIndicator key='loadingIndicator' />;
    } else {
        let showMoreButton = <Button onClick={showMoreHandler} size="small" className={classes.moreButton}>Show More</Button>;
        let displayedSubmissions = submissions.submissions.slice(0, 8)

        if (showMore) {
            showMoreButton = null;
            displayedSubmissions = submissions.submissions;
        }

        recommendedSubmissions = (
            <React.Fragment>
                <Typography variant="h6" className={classes.headingText}>
                    Recommended Videos
                </Typography>
                <SubmissionList
                    submissions={displayedSubmissions}
                    searchState={{}}
                    history={history}
                />
                {showMoreButton}
                <Divider className={classes.Divider} />
            </React.Fragment>
        )
    }

    return (
        <MaxWidthContainer>
            {recommendedSubmissions}
            {subreddits.map((subreddit) => (
                <React.Fragment key={subreddit.id}>
                    <Typography variant="h6" className={classes.headingText}>
                        Recommended from {subreddit.display_name_prefixed}
                    </Typography>
                    <SubmissionList
                        submissions={subreddit.submissions}
                        history={history}
                    />
                    <Divider className={classes.Divider} />
                </React.Fragment>
            ))}
        </MaxWidthContainer>
    );
}

export default withRouter(withErrorHandler(Home));

const useStyles = makeStyles(theme => ({
    Divider: {
        margin: "10px 0",
        [theme.breakpoints.up('sm')]: {
            margin: "0 10px",
            marginTop: 20
        },
    },
    moreButton: {
        marginLeft: 0,
        [theme.breakpoints.up('sm')]: {
            marginLeft: 5
        },
    },
    headingText: {
        paddingTop: 10,
        paddingLeft: 5,
        fontSize: "1rem",
        [theme.breakpoints.up('sm')]: {
            padding: 10,
            fontSize: "1.25rem"
        },
    }
}));