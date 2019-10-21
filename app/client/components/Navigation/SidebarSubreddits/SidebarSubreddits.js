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
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import useStyles from "./Styles";

function PopularSubredditsList(props) {
    const {
        closeDrawer,
        location,
        showMore,
        showMoreHandler,
        subreddits
    } = props;
    const classes = useStyles();
    const currentPath = location.pathname;

    let showMoreListItem = (
        <ListItem button onClick={showMoreHandler}>
            <ListItemIcon>
                <KeyboardArrowDownIcon />
            </ListItemIcon>
            <ListItemText primary="Show more" />
        </ListItem>
    )

    if (showMore) {
        showMoreListItem = (
            <ListItem button onClick={showMoreHandler}>
                <ListItemIcon>
                    <KeyboardArrowUpIcon />
                </ListItemIcon>
                <ListItemText primary="Show less" />
            </ListItem>
        )
    }

    return (
        <List>
            <ListSubheader disableSticky={true}>Popular Subreddits</ListSubheader>
            {subreddits.map((subreddit) => (
                <NavLink
                    to={"/" + subreddit.display_name_prefixed}
                    className={classes.navLink}
                    onClick={closeDrawer}
                    key={subreddit.id}>
                    <ListItem
                        button
                        className={activeNav(`/${ subreddit.display_name_prefixed }`, currentPath) ? classes.activeNav : ""}>
                        <ListItemIcon>
                            <img
                                src={setSubredditImage(subreddit.icon)}
                                className={classes.subredditImage}
                                alt={subreddit.display_name + " subreddit icon"} />
                        </ListItemIcon>
                        <ListItemText
                            primary={subreddit.display_name}
                            primaryTypographyProps={{ noWrap: true, display: 'block' }}
                        />
                    </ListItem>
                </NavLink>
            ))}
            {showMoreListItem}
        </List>
    );
}

export default withRouter(PopularSubredditsList);