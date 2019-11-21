import React from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    IconButton,
    Toolbar
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { LoggedInUserMenu, NavbarLogo, NavbarUserMenu } from 'components';

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
                    <Link to='/' className={classes.logoLink}>
                        <NavbarLogo className={classes.logo} />
                    </Link>
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

