import React from "react";
import Divider from "@material-ui/core/Divider";
import { SectionHeader, SubmissionList } from "components";

import useStyles from "./Styles";

export default function RecommendedSubreddits(props) {
    const { history, subreddits } = props;
    const classes = useStyles();

    return (
        <React.Fragment>
            {subreddits.map((subreddit) => (
                <React.Fragment key={subreddit.id}>
                    <Divider className={classes.divider} />
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
