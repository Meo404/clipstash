import React from "react";
import { Button, Grid } from "@material-ui/core/";
import { RedditIcon, TwitchIcon, YoutubeIcon } from "components/UI/Icons";

import useStyles from "./Styles";

export default function SubmissionCardLinks({ submission }) {
    const classes = useStyles();

    function openRedditLink() {
        window.open("https://www.reddit.com" + submission.permalink)
    }

    function openMediaProviderLink() {
        window.open(submission.medium.url);
    }

    function mediaProviderButton() {
        let icon, buttonClass = null;

        if (submission.media_provider === "YouTube") {
            buttonClass = classes.youtubeButton;
            icon = <YoutubeIcon className={classes.brandIcon} />;
        }

        if (submission.media_provider === "Twitch") {
            buttonClass = classes.twitchButton;
            icon = <TwitchIcon className={classes.brandIcon} />
        }

        if (icon && buttonClass) {
            return (
                <Button
                    variant="contained"
                    size="small"
                    className={buttonClass}
                    onClick={openMediaProviderLink}
                 >
                    {icon}
                    {submission.media_provider}
                </Button>
            )
        }
    }

    return (
        <Grid container spacing={0}>
            <Button
                variant="contained"
                size="small"
                className={classes.redditButton}
                onClick={openRedditLink}
            >
                <RedditIcon className={classes.brandIcon} />
                Reddit
            </Button>
            {mediaProviderButton()}
        </Grid>
    )
}
