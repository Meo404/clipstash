import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import Hidden from '@material-ui/core/Hidden';
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ShareIcon from "@material-ui/icons/Share";
import Grid from "@material-ui/core/Grid";
import SwapVerticalCircleOutlinedIcon from '@material-ui/icons/SwapVerticalCircleOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

export default function SubmissionListCard({ submission }) {
    const classes = useStyles();

    return (
        <Grid item xs={12} lg={12} md={12} sm={12} className={classes.gridItem}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        component="iframe"
                        src={submission.medium.embed_url + '?autoplay=1'}
                        allowFullScreen
                        frameBorder={0}
                    />
                    <CardHeader
                        title={submission.title}
                        titleTypographyProps={{ noWrap: true, variant: "h6", classes: { h6: classes.titleText } }}
                        subheader={"by /u/" + submission.author + " - " + submission.created_date_string}
                        subheaderTypographyProps={{ noWrap: true, classes: { body1: classes.subtitleText } }}
                        classes={{ root: classes.cardHeader, content: classes.mw100 }}
                    />
                </CardActionArea>
                <CardActions disableSpacing className={classes.actions}>
                    <Button disabled size="small" className={classes.displayButton}>
                        <SwapVerticalCircleOutlinedIcon classes={{ root: classes.actionButtonIcon }} />
                        {submission.score}
                    </Button>
                    <Button disabled size="small" className={classes.displayButton}>
                        <CommentOutlinedIcon classes={{ root: classes.actionButtonIcon }} />
                        {submission.comment_count}
                    </Button>
                    <div className={classes.cardActionIcons}>
                        <Button aria-label="share" size="small" className={classes.actionButton}>
                            <ShareIcon classes={{ root: classes.actionButtonIcon }} />
                            <Hidden xsDown>
                                Share
                            </Hidden>
                        </Button>
                        <Button
                            aria-label="add to favorites"
                            size="small"
                            className={classes.actionButton}
                        >
                            <FavoriteBorderOutlinedIcon classes={{ root: classes.actionButtonIcon }} />
                            <Hidden xsDown>
                                Favorite
                            </Hidden>
                        </Button>
                        <IconButton aria-label="more actions" size="small" className={classes.actionButton}>
                            <MoreHorizIcon />
                        </IconButton>
                    </div>
                </CardActions>
            </Card>
        </Grid>
    );
}

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: "100%",
        margin: "auto",
        borderRadius: 0,
        [theme.breakpoints.up('sm')]: {
            maxWidth: "100%",
            borderRadius: 4
        },
    },
    cardHeader: {
        padding: "10px 16px"
    },
    cardActionIcons: {
        marginLeft: "auto"
    },
    gridItem: {
        padding: "10px 0px",
        [theme.breakpoints.up('sm')]: {
            padding: 10
        },
    },
    media: {
        height: 250,
        [theme.breakpoints.up('sm')]: {
            height: 350,
        },
        [theme.breakpoints.up('md')]: {
            height: 450,
        },
        [theme.breakpoints.up('lg')]: {
            height: 550,
        },
    },
    mw100: {
        maxWidth: "100%",
    },
    ml5: {
        marginLeft: 5,
    },
    actions: {
        padding: 10
    },
    actionButton: {
        color: "rgba(0, 0, 0, 0.54)",
        minWidth: 0
    },
    actionButtonIcon: {
        fontSize: "1.25rem",
        marginRight: 5,
        [theme.breakpoints.up('sm')]: {
            fontSize: "1.5rem",
        },
    },
    displayButton: {
        color: "rgba(0, 0, 0, 0.87) !important"
    },
    titleText: {
        fontSize: "1rem",
        [theme.breakpoints.up('md')]: {
            fontSize: "1.2rem",
        },
    },
    subtitleText: {
        fontSize: "0.8rem",
        [theme.breakpoints.up('md')]: {
            fontSize: "0.9rem",
        },
        marginRight: 10,
        marginTop: 2
    }
}));
