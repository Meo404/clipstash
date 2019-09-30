import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import RedditIcon from 'components/UI/Icons/RedditIcon';
import TwitchIcon from 'components/UI/Icons/TwitchIcon';
import YoutubeIcon from 'components/UI/Icons/YoutubeIcon';

export default function SubmissionCardLinks({ submission }) {
    const classes = useStyles();

    function openRedditLink() {
        window.open('https://www.reddit.com' + submission.permalink)
    }

    function openMediaProviderLink() {
        window.open(submission.medium.url);
    }

    function mediaProviderButton() {
        let icon, buttonClass = null;

        if (submission.media_provider === 'YouTube') {
            buttonClass = classes.youtubeButton;
            icon = <YoutubeIcon className={classes.brandIcon} />;
        }

        if (submission.media_provider === 'Twitch') {
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
        <Grid container spacing={0} >
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

const useStyles = makeStyles({
    brandIcon: {
        marginRight: 10,
    },
    redditButton: {
        marginRight: 10,
        marginLeft: "auto"
    },
    youtubeButton: {
        marginRight: 10,
        backgroundColor: "#ff0000",
        color: "#FFF"
    },
    twitchButton: {
        marginRight: 10,
        backgroundColor: "#6441a5",
        color: "#FFF"
    }
});