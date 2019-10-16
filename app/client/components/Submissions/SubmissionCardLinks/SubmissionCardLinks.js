import React from "react";
import { Button, Grid, Tooltip } from "@material-ui/core/";
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
                <Tooltip title={`View on ${ submission.media_provider }`} placement="bottom">
                    <Button
                        variant="contained"
                        size="small"
                        className={buttonClass}
                        onClick={openMediaProviderLink}
                    >
                        {icon}
                        {submission.media_provider}
                    </Button>
                </Tooltip>
            )
        }
    }

    return (
        <Grid container spacing={0}>
            <Tooltip title="View on Reddit" placement="bottom">
                <Button
                    variant="contained"
                    size="small"
                    className={classes.redditButton}
                    onClick={openRedditLink}
                >
                    <RedditIcon className={classes.brandIcon} />
                    Reddit
            </Button>
            </Tooltip>
            {mediaProviderButton()}
        </Grid>
    )
}
