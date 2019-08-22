import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import DefaultIcon from 'images/default_subreddit_icon.png';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const useStyles = makeStyles({
    card: {
        maxWidth: 200,
        margin: "auto"
    },
    gridItem: {
        padding: 10
    },
    media: {
        height: 150,
        backgroundSize: "contain",
        backgroundColor: '#E0E0E0'
    }
});

export default function MediaCard() {
    const classes = useStyles();
    const [data, setData] = useState({subreddits: []});

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const result = await axios('/api/v1/subreddits');
        setData({subreddits: result.data.data});
    }

    function setImage(iconImage) {
        return iconImage ? iconImage : DefaultIcon;
    }

    return (
        <div className={classes.root}>
                <Grid container spacing={0}>
                    {data.subreddits.map((subreddit) => (
                        <Grid item xs={6} lg={2} md={3} sm={4} className={classes.gridItem} key={subreddit.id}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={setImage(subreddit.attributes.icon_image)}
                                        title={subreddit.attributes.display_name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom component="h6" noWrap>
                                            {subreddit.attributes.display_name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {subreddit.attributes.subscribers} Subscribers
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
        </div>
    );
}