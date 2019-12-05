import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { activeNav } from "utils/navigationHelper";
import {
    Bookmark as FavoriteIcon,
    History as HistoryIcon
} from "@material-ui/icons";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";

import useStyles from './Styles';

export default function SidebarUserLinks({ closeDrawer }) {
    const classes = useStyles();
    const currentPath = useLocation().pathname;

    return (
        <List>
            <NavLink
                className={classes.navLink}
                onClick={closeDrawer}
                to="/saved_videos"
            >
                <ListItem
                    button
                    key="Saved Videos"
                    className={activeNav("/saved_videos", currentPath) ? classes.activeNav : ""}
                >
                    <ListItemIcon>
                        <FavoriteIcon className={activeNav("/saved_videos", currentPath) ? classes.activeNavIcon : ""} />
                    </ListItemIcon>
                    <ListItemText primary="Saved Videos" />
                </ListItem>
            </NavLink>
            <NavLink
                className={classes.navLink}
                onClick={closeDrawer}
                to="/history"
            >
                <ListItem 
                    button 
                    key="History"
                    className={activeNav("/history", currentPath) ? classes.activeNav : ""}>
                    <ListItemIcon>
                        <HistoryIcon className={activeNav("/history", currentPath) ? classes.activeNavIcon : ""} />
                    </ListItemIcon>
                    <ListItemText primary="History" />
                </ListItem>
            </NavLink>
        </List>
    );
}
