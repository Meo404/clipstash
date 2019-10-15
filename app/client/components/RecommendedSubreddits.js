import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import SectionHeader from "components/UI/SectionHeader";
import { SubmissionList } from "components/Submissions";

export default function RecommendedSubreddits(props) {
    const { history, subreddits } = props;
    const classes = useStyles();

    return (
        <React.Fragment>
            {subreddits.map((subreddit) => (
                <React.Fragment key={subreddit.id}>
                    <Divider className={classes.Divider} />
                    <SectionHeader headerText={`Recommended from ${subreddit.display_name_prefixed}`} />
                    <SubmissionList
                        submissions={subreddit.submissions}
                        history={history}
                    />
                </React.Fragment>
            ))}
        </React.Fragment>
    )
}

const useStyles = makeStyles(theme => ({
    Divider: {
        margin: "10px 0",
        [theme.breakpoints.up('sm')]: {
            margin: "0 10px",
            marginTop: 20
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