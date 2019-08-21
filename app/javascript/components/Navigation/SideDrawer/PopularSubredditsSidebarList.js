import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import DefaultIcon from 'images/default_subreddit_icon.png';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles({
    subredditImage: {
        width: "20px",
        height: "20px"
    }
});

export default function PopularSubredditsList() {
    const classes = useStyles();
    const [data, setData] = useState({subreddits: []});

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const result = await axios('/api/v1/subreddits/popular');
        setData({subreddits: result.data.data});
    }

    function setIcon(iconImage, displayName) {
        const icon = iconImage ? iconImage : DefaultIcon;
        return (
            <img
                src={icon}
                className={classes.subredditImage}
                alt={displayName + ' subreddit icon'}/>
        );
    }

    return (
        <List>
            <ListSubheader>Popular Subreddits</ListSubheader>
            {data.subreddits.map((subreddit) => (
                <ListItem button key={subreddit.id}>
                    <ListItemIcon>
                        {setIcon(subreddit.attributes.icon_image, subreddit.attributes.display_name)}
                    </ListItemIcon>
                    <ListItemText primary={subreddit.attributes.display_name}/>
                </ListItem>
            ))}
        </List>
    );
}