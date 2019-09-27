import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import Icon from '@material-ui/core/Icon';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
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
                    <Icon size="small">
                        <SwapVerticalCircleOutlinedIcon
                            style={{ marginBottom: 2 }}
                            classes={{ root: classes.actionButtonIcon }}
                        />
                    </Icon>
                    <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        classes={{ subtitle1: classes.subtitleText }}
                    >
                        {submission.score}
                    </Typography>
                    <Icon size="small">
                        <CommentOutlinedIcon
                            style={{ marginBottom: 2 }}
                            classes={{ root: classes.actionButtonIcon }}
                        />
                    </Icon>
                    <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        classes={{ subtitle1: classes.subtitleText }}
                    >
                        {submission.comment_count}
                    </Typography>
                    <div className={classes.cardActionIcons}>
                        <IconButton
                            aria-label="add to favorites"
                            size="small"
                            className={classes.actionButton}
                        >
                            <FavoriteBorderOutlinedIcon classes={{ root: classes.actionButtonIcon }} />
                        </IconButton>
                        <IconButton aria-label="share" size="small" className={classes.actionButton}>
                            <ShareIcon classes={{ root: classes.actionButtonIcon }} />
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
    actions: {
        padding: 10
    },
    actionButton: {
        margin: "0 3px",
    },
    actionButtonIcon: {
        fontSize: "1.5rem"
    },
    titleText: {
        fontSize: "1.2rem"
    },
    subtitleText: {
        fontSize: "0.9rem",
        marginRight: 10,
        marginLeft: 5,
        marginTop: 2
    }
}));
