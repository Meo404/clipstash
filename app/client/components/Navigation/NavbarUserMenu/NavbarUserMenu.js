import React, { useContext } from 'react';
import UserActionMenuContext from 'contexts/UserActionMenuContext';
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import { Button, IconButton, Hidden, Menu, MenuItem } from '@material-ui/core';

import useStyles from './Styles';

export default function NavbarUserMenu(props) {
    const classes = useStyles();
    const [, dispatch] = useContext(UserActionMenuContext);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMobileMenuClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleShowSignIn = () => {
        setAnchorEl(null);
        dispatch({ type: 'SIGN_IN' });
    }

    const handleShowSignUp = () => {
        setAnchorEl(null);
        dispatch({ type: 'SIGN_UP' });
    }

    const mobileMenu = (
        <React.Fragment>
            <IconButton
                onClick={handleMobileMenuClick}
                className={classes.iconButton}
            >
                <AccountCircleIcon className={classes.menuIcon} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMobileMenuClose}
            >
                <MenuItem onClick={handleShowSignIn}>Log In</MenuItem>
                <MenuItem onClick={handleShowSignUp}>Sign Up</MenuItem>
            </Menu>
        </React.Fragment>
    )

    const desktopMenu = (
        <React.Fragment>
            <Button
                color="inherit"
                variant="outlined"
                className={classes.desktopButton}
                onClick={handleShowSignIn}
            >
                Log In
            </Button>
            <Button
                color="inherit"
                variant="outlined"
                className={classes.desktopButton}
                onClick={handleShowSignUp}
                endIcon={<AccountCircleIcon />}
            >
                Sign Up
            </Button>
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <Hidden smUp>
                {mobileMenu}
            </Hidden>
            <Hidden only='xs'>
                {desktopMenu}
            </Hidden>
        </React.Fragment>
    )
}