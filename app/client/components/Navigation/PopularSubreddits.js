import React from 'react';
import { activeNav } from "utils/navigationHelper";
import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { setSubredditImage } from 'utils/subredditHelper';
import { withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

function PopularSubredditsList(props) {
    const { location, subreddits, closeDrawer } = props;
    const classes = useStyles();
    const currentPath = location.pathname;
    
    return (
        <List>
            <ListSubheader>Popular Subreddits</ListSubheader>
            {subreddits.map((subreddit) => (
                <NavLink
                    to={"/" + subreddit.display_name_prefixed}
                    className={classes.navLink}
                    onClick={closeDrawer}
                    key={subreddit.id}>
                    <ListItem
                        button
                        className={activeNav(`/${subreddit.display_name_prefixed}`, currentPath) ? classes.activeNav : ''}>
                        <ListItemIcon>
                            <img
                                src={setSubredditImage(subreddit.icon)}
                                className={classes.subredditImage}
                                alt={subreddit.display_name + ' subreddit icon'} />
                        </ListItemIcon>
                        <ListItemText primary={subreddit.display_name} />
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