import React from "react";
import {
    Card,
    CardActions,
    CardActionArea,
    CardHeader,
    CardMedia,
    Grid,
    Icon,
    Tooltip,
    Typography
} from "@material-ui/core";
import {
    CommentOutlined as CommentOutlinedIcon,
    SwapVerticalCircleOutlined as SwapVerticalCircleOutlinedIcon
} from "@material-ui/icons";

import useStyles from "./Styles";

export default function SubmissionListCard({ submission, clickHandler }) {
    const classes = useStyles();

    return (
        <Grid
            item xs={12} sm={6} md={6} lg={3}
            className={classes.gridItem}
        >
            <Card className={classes.card}>
                <Tooltip  placement="bottom" enterDelay={700} title={submission.title}>
                    <CardActionArea onClick={() => clickHandler(submission.slug)}>
                        <CardMedia
                            className={classes.media}
                            image={submission.thumbnail}
                        />
                        <CardHeader
                            classes={{ root: classes.cardHeader, content: classes.cardContent }}
                            subheader={"by /u/" + submission.author + " - " + submission.created_date_string}
                            subheaderTypographyProps={{ noWrap: true, classes: { body1: classes.subtitleText } }}
                            title={submission.title}
                            titleTypographyProps={{ noWrap: true, variant: "h6", classes: { h6: classes.titleText } }}
                        />
                    </CardActionArea>
                </Tooltip>
                <CardActions disableSpacing className={classes.actions}>
                    <Icon size="small">
                        <SwapVerticalCircleOutlinedIcon
                            classes={{ root: classes.actionButtonIcon }}
                            className={classes.cardIcon}
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
                            classes={{ root: classes.actionButtonIcon }}
                            className={classes.cardIcon}
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

