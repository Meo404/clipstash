import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    list: {
        width: 250,
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
    toolbar: theme.mixins.toolbar,
}));

export default function SideDrawer({ mobileMenu, mobileMenuHandler }) {
    const classes = useStyles();

    const mobileDrawer = (
        <div
            className={classes.list}
            role="presentation"
            onClick={mobileMenuHandler}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <Drawer
                open={mobileMenu}
                onClose={mobileMenuHandler}>
                {mobileDrawer}
            </Drawer>
            <Drawer className={classes.desktopDrawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}>
                <div className={classes.toolbar} />
                {mobileDrawer}
            </Drawer>
        </div>
    );
}