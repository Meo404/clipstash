import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';

const drawerWidth = 225;
const useStyles = makeStyles(theme => ({
    list: {
        width: drawerWidth,
    },
    desktopDrawer: {
        width: drawerWidth,
        flexShrink: 0,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    drawerPaper: {
        zIndex: "-1"
    },
    subredditImage: {
        width: "20px",
        height: "20px"
    },
    toolbar: theme.mixins.toolbar,
}));

export default function SideDrawer({ mobileMenu, mobileMenuHandler }) {
    const classes = useStyles();
    const [data, setData] = useState({ subreddits: [] });

    const drawerContent = (
        <div className={classes.list} role="presentation">
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
            <Divider />
            <List>
                <ListSubheader>Popular Subreddits</ListSubheader>
                {data.subreddits.map((subreddit, index) => (
                    <ListItem button key={subreddit.id}>
                        <ListItemIcon>
                            <img src={subreddit.attributes.icon_image} className={classes.subredditImage} />
                        </ListItemIcon>
                        <ListItemText primary={subreddit.attributes.display_name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    async function fetchData() {
        const result = await axios('/api/v1/subreddits/popular');
        setData({ subreddits: result.data.data });
    };

    useEffect(() => {
        fetchData();
    }, []);
    /**
     * First <Drawer> is only for mobile screen size. Else it's hidden
     * Second <Drawer> is for non mobile screen size. On mobile it's hidden
     */
    return (
        <div>
            <Drawer
                open={mobileMenu}
                onClose={mobileMenuHandler}>
                {drawerContent}
            </Drawer>
            <Drawer
                className={classes.desktopDrawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}>
                <div className={classes.toolbar} />
                {drawerContent}
            </Drawer>
        </div>
    );
}