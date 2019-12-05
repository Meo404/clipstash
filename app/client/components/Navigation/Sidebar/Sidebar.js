import React from "react";
import { Divider, Drawer } from "@material-ui/core";
import {
    SidebarLinks,
    SidebarSubreddits,
    SidebarUserLinks
} from "components";

import useStyles from "./Styles";

export default function Sidebar(props) {
    const {
        mobileMenu,
        mobileMenuHandler,
        popularSubreddits,
        showMore,
        showMoreHandler,
        userIsLoggedIn
    } = props;
    const classes = useStyles();

    function closeDrawerHandler() {
        mobileMenu ? mobileMenuHandler() : null
    }

    const sideBarContent = (
        <div role="presentation" className={classes.list}>
            <SidebarLinks closeDrawer={closeDrawerHandler} />
            <Divider />
            {userIsLoggedIn ? (
                <React.Fragment>
                    <SidebarUserLinks closeDrawer={closeDrawerHandler} />
                    <Divider />
                </React.Fragment>
            ) : null}
            <SidebarSubreddits
                closeDrawer={closeDrawerHandler}
                subreddits={popularSubreddits}
                showMore={showMore}
                showMoreHandler={showMoreHandler}
            />
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
                classes={{
                    paper: classes.drawerPaper,
                }}
                className={classes.desktopDrawer}
                variant="permanent"
            >
                <div className={classes.toolbar} />
                {sideBarContent}
            </Drawer>
        </React.Fragment>
    );
}
