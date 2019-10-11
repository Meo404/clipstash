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

export default function SubmissionListCard({ submission, clickHandler }) {
    const classes = useStyles();

    return (
        <Grid item xs={12} lg={3} md={6} sm={6} className={classes.gridItem}>
            <Card className={classes.card}>
                <CardActionArea onClick={() => clickHandler(submission.slug)}> 
                    <CardMedia
                        className={classes.media}
                        image={submission.thumbnail}
                        title="Paella dish"
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
                </CardActions>
            </Card>
        </Grid>
    );
}

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: "auto",
        borderRadius: 0,
        [theme.breakpoints.up('sm')]: {
            maxWidth: 345,
            borderRadius: 4
        },
    },
    cardHeader: {
        padding: "10px 16px"
    },
    gridItem: {
        padding: "10px 0px",
        [theme.breakpoints.up('sm')]: {
            padding: 10
        },
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
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
        fontSize: "1.25rem"
    },
    titleText: {
        fontSize: "1rem"
    },
    subtitleText: {
        fontSize: "0.8rem",
        marginRight: 10,
        marginTop: 2
    }
}));
