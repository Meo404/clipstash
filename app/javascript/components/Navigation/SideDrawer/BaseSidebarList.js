import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';

export default function BaseSidebarList() {
    return (
        <List>
            <ListItem button key="Home">
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button key="Trending">
                <ListItemIcon><WhatshotIcon /></ListItemIcon>
                <ListItemText primary="Trending" />
            </ListItem>
        </List>
    );
}