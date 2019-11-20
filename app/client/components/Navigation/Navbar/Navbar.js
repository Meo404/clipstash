import React from 'react';
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { LoggedInUserMenu, NavbarUserMenu } from 'components';

import useStyles from './Styles';

export default function Navbar(props) {
    const {
        mobileMenuHandler,
        logOutHandler,
        showSignInHandler,
        showSignUpHandler,
        userIsLoggedIn,
        userName
    } = props;
    const classes = useStyles();

    return (
        <header>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        aria-label="menu"
                        color="inherit"
                        edge="start"
                        className={classes.mobileButton}
                        onClick={mobileMenuHandler}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Project Free
                    </Typography>
                    {userIsLoggedIn ? (
                        <LoggedInUserMenu logOutHandler={logOutHandler} userName={userName} />
                    ) : (
                            <NavbarUserMenu
                                logOutHandler={logOutHandler}
                                showSignInHandler={showSignInHandler}
                                showSignUpHandler={showSignUpHandler}
                            />
                    )}
                </Toolbar>
            </AppBar>
        </header>
    );
}

