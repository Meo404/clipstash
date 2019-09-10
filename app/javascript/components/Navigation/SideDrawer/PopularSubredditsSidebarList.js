import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import setSubredditImage from '../../../utils/setSubredditImage';
import { NavLink } from "react-router-dom";
import { activeNav } from "../../../utils/navigationHelpers";

function PopularSubredditsList(props) {
    const classes = useStyles();
    const currentPath = props.location.pathname;
    const [data, setData] = useState({subreddits: []});

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const result = await axios('/api/v1/popular_subreddits');
        setData({subreddits: result.data.subreddits});
    }

    return (
        <List>
            <ListSubheader>Popular Subreddits</ListSubheader>
            {data.subreddits.map((subreddit) => (
                <NavLink
                    to={"/" + subreddit.display_name_prefixed}
                    className={classes.navLink}
                    onClick={props.closeDrawer}
                    key={subreddit.id}>
                    <ListItem
                        button
                        className={activeNav(`/${subreddit.display_name_prefixed}`, currentPath) ? classes.activeNav : ''}>
                        <ListItemIcon>
                            <img
                                src={setSubredditImage(subreddit.icon_image)}
                                className={classes.subredditImage}
                                alt={subreddit.display_name + ' subreddit icon'}/>
                        </ListItemIcon>
                        <ListItemText primary={subreddit.display_name}/>
                    </ListItem>
                </NavLink>
            ))}
        </List>
    );
}

const useStyles = makeStyles({
    subredditImage: {
        width: "20px",
        height: "20px"
    },
    navLink: {
        textDecoration: 'none',
        color: 'inherit'
    },
    activeNav: {
        backgroundColor: '#ebebeb'
    }
});

export default withRouter(PopularSubredditsList);