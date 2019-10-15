import React from "react";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardHeader,
    CardMedia,
    Grid,
    Hidden,
    IconButton,
} from "@material-ui/core";
import {
    CommentOutlined as CommentOutlinedIcon,
    FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
    MoreHoriz as MoreHorizIcon,
    Share as ShareIcon,
    SwapVerticalCircleOutlined as SwapVerticalCircleOutlinedIcon
} from "@material-ui/icons";
import useStyles from './Styles';

export default function SubmissionListCard({ submission }) {
    const classes = useStyles();

    return (
        <Grid 
            item xs={12} sm={12} md={12} lg={12}
            className={classes.gridItem}
        >
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        component="iframe"
                        src={submission.medium.embed_url + "?autoplay=1"}
                        allowFullScreen
                        frameBorder={0}
                    />
                    <CardHeader
                        title={submission.title}
                        titleTypographyProps={{ noWrap: true, variant: "h6", classes: { h6: classes.titleText } }}
                        subheader={"by /u/" + submission.author + " - " + submission.created_date_string}
                        subheaderTypographyProps={{ noWrap: true, classes: { body1: classes.subtitleText } }}
                        classes={{ root: classes.cardHeader, content: classes.cardContent }}
                    />
                </CardActionArea>
                <CardActions
                    disableSpacing
                    className={classes.actions}
                >
                    <Button
                        disabled
                        size="small"
                        className={classes.displayButton}
                    >
                        <SwapVerticalCircleOutlinedIcon classes={{ root: classes.actionButtonIcon }} />
                        {submission.score}
                    </Button>
                    <Button 
                        disabled 
                        size="small" 
                        className={classes.displayButton}
                    >
                        <CommentOutlinedIcon classes={{ root: classes.actionButtonIcon }} />
                        {submission.comment_count}
                    </Button>
                    <div className={classes.cardActionIcons}>
                        <Button
                            aria-label="share"
                            size="small"
                            className={classes.actionButton}
                        >
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
