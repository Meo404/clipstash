import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import SwapVertIcon from '@material-ui/icons/SwapVert';
import Grid from "@material-ui/core/Grid";

export default function SubmissionGridItem({ submission }) {
    const classes = useStyles();

    return (
        <Grid item xs={12} lg={3} md={6} sm={6} className={classes.gridItem}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={submission.thumbnail}
                        title="Paella dish"
                    />
                    <CardHeader
                        title={submission.title}
                        titleTypographyProps={{ noWrap: true, variant: "h6" }}
                        subheader={"u/" + submission.author}
                        className={classes.mw100}
                        classes={{ content: classes.mw100 }}
                    >
                    </CardHeader>
                </CardActionArea>
                    <CardActions disableSpacing className={classes.actions}>
                        <IconButton aria-label="share" size="small">
                            <SwapVertIcon />
                        </IconButton>
                        <Typography variant="subtitle1" color="textSecondary">
                            {submission.score}
                        </Typography>
                        <div style={{ marginLeft: "auto" }}>
                            <IconButton aria-label="add to favorites" size="small" className={classes.actionButton}>
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share" size="small" className={classes.actionButton}>
                                <ShareIcon />
                            </IconButton>
                        </div>
                    </CardActions>

            </Card>
        </Grid>
    );
}

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
        margin: "auto"
    },
    gridItem: {
        padding: 10
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: "rotate(180deg)"
    },
    avatar: {
        backgroundColor: red[500]
    },
    mw100: {
        maxWidth: "100%",
    },
    actions: {
        padding: 10
    },
    actionButton: {
        margin: "0 3px"
    }
}));
