import React from "react";
import { Link } from "react-router-dom";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Tooltip,
    Typography
} from "@material-ui/core"
import { setSubredditImage } from "utils/subredditHelper";
import PersonIcon from "@material-ui/icons/Person";

import useStyles from "./Styles";

export default function SubredditCard({ subreddit }) {
    const classes = useStyles();

    return (
        <Grid 
            item 
            xs={6} sm={4} md={3} lg={2}
            className={classes.gridItem}
        >
            <Card className={classes.card}>
                <Link
                    className={classes.subredditLink}
                    to={"/" + subreddit.display_name_prefixed} 
                >
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={setSubredditImage(subreddit.icon)}
                            title={subreddit.display_name}
                        />
                        <CardContent>
                            <Typography gutterBottom component="h6" noWrap>
                                {subreddit.display_name}
                            </Typography>
                            <Tooltip title="Subscribers" placement="bottom-start">
                                <div className={classes.subscribers}>
                                    <PersonIcon fontSize="small" className={classes.subscriberIcon} />
                                    <Typography component="p" color="textSecondary" variant="body2">
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

