import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import SidebarHeader from './SidebarHeader';
import PopularSubreddits from './PopularSubreddits';

export default function Sidebar(props) {
    const { 
        mobileMenu, 
        mobileMenuHandler, 
        popularSubreddits 
    } = props;
    const classes = useStyles();

    function closeDrawerHandler() {
        mobileMenu ? mobileMenuHandler() : null
    }

    const sideBarContent = (
        <div className={classes.list} role="presentation">
            <SidebarHeader closeDrawer={closeDrawerHandler} />
            <Divider />
            <PopularSubreddits subreddits={popularSubreddits} />
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
                onClose={mobileMenuHandler}
            >
                {sideBarContent}
            </Drawer>
            <Drawer
                className={classes.desktopDrawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                {sideBarContent}
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
    toolbar: theme.mixins.toolbar,
}));