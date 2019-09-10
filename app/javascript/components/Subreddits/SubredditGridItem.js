import React from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Tooltip from '@material-ui/core/Tooltip';
import Typography from "@material-ui/core/Typography";
import PersonIcon from '@material-ui/icons/Person';
import setSubredditImage from '../../utils/setSubredditImage';

export default function SubredditGridItem({ subreddit }) {
    const classes = useStyles();

    return (
        <Grid item xs={6} lg={2} md={3} sm={4} className={classes.gridItem}>
            <Card className={classes.card}>
                <Link 
                to={"/" + subreddit.display_name_prefixed}
                className={classes.subredditLink}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={setSubredditImage(subreddit.icon_image)}
                            title={subreddit.display_name}
                        />
                        <CardContent>
                            <Typography gutterBottom component="h6" noWrap>
                                {subreddit.display_name}
                            </Typography>
                            <Tooltip title="Subscribers" placement="bottom-start">
                                <div className={classes.subscribers}>
                                    <PersonIcon fontSize="small" className={classes.subscriberIcon} />
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {subreddit.subscribers}
                                    </Typography>
                                </div>
                            </Tooltip>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </Grid>
    );
}

const useStyles = makeStyles({
    card: {
        maxWidth: 175,
        margin: "auto"
    },
    gridItem: {
        padding: 10
    },
    media: {
        height: 150,
        backgroundSize: "contain",
        backgroundColor: '#E0E0E0',
        padding: 5
    },
    subscribers: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    subscriberIcon: {
        marginLeft: '-5px',
        marginRight: 3
    },
    subredditLink: {
        textDecoration: 'none',
        color: 'inherit'
    }
});
