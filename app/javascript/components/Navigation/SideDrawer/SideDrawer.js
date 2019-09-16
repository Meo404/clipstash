import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BaseSidebarList from './BaseSidebarList';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import PopularSubredditsSidebarList from './PopularSubredditsSidebarList';

export default function SideDrawer({ mobileMenu, mobileMenuHandler }) {
    const classes = useStyles();

    function closeDrawerHandler() {
        mobileMenu ? mobileMenuHandler() : null
    }

    const drawerContent = (
        <div className={classes.list} role="presentation">
            <BaseSidebarList closeDrawer={closeDrawerHandler} />
            <Divider />
            <PopularSubredditsSidebarList closeDrawer={closeDrawerHandler} />
        </div>
    );
    /**
     * First <Drawer> is only for xs and sm screen sizes. Else it's hidden
     * Second <Drawer> is for screen sizes >= md. Else it's hidden
     */
    return (
        <React.Fragment>
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
        </React.Fragment>
    );
}

const drawerWidth = 225;
const useStyles = makeStyles(theme => ({
    list: {
        width: drawerWidth,
    },
    desktopDrawer: {
        width: drawerWidth,
        flexShrink: 0,
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block',
        },
    },
    drawerPaper: {
        width: drawerWidth,
        overflow: 'hidden'
    },
    subredditImage: {
        width: "20px",
        height: "20px"
    },
    toolbar: theme.mixins.toolbar,
}));