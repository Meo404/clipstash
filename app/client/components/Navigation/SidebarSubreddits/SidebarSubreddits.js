import React from "react";
import { activeNav } from "utils/navigationHelper";
import { NavLink } from "react-router-dom";
import { setSubredditImage } from "utils/subredditHelper";
import { withRouter } from "react-router-dom";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader
} from "@material-ui/core";

import useStyles from "./Styles";

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
                        className={activeNav(`/${subreddit.display_name_prefixed}`, currentPath) ? classes.activeNav : ""}>
                        <ListItemIcon>
                            <img
                                src={setSubredditImage(subreddit.icon)}
                                className={classes.subredditImage}
                                alt={subreddit.display_name + " subreddit icon"} />
                        </ListItemIcon>
                        <ListItemText primary={subreddit.display_name} />
                    </ListItem>
                </NavLink>
            ))}
        </List>
    );
}

export default withRouter(PopularSubredditsList);