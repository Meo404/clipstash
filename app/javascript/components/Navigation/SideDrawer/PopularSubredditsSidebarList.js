import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import setSubredditImage from '../../../utils/setSubredditImage';

export default function PopularSubredditsList() {
    const classes = useStyles();
    const [data, setData] = useState({ subreddits: [] });

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const result = await axios('/api/v1/subreddits/popular');
        setData({ subreddits: result.data.subreddits });
    }

    return (
        <List>
            <ListSubheader>Popular Subreddits</ListSubheader>
            {data.subreddits.map((subreddit) => (
                <ListItem button key={subreddit.id}>
                    <ListItemIcon>
                        <img
                            src={setSubredditImage(subreddit.icon_image)}
                            className={classes.subredditImage}
                            alt={subreddit.display_name + ' subreddit icon'} />
                    </ListItemIcon>
                    <ListItemText primary={subreddit.display_name} />
                </ListItem>
            ))}
        </List>
    );
}

const useStyles = makeStyles({
    subredditImage: {
        width: "20px",
        height: "20px"
    }
});