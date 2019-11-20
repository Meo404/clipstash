import React from 'react';
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import { Button, IconButton, Hidden, Menu, MenuItem } from '@material-ui/core';

import useStyles from './Styles';

export default function NavbarUserMenu(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {
        showSignInHandler,
        showSignUpHandler
    } = props;

    const handleMobileMenuClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setAnchorEl(null);
    };

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
                <MenuItem onClick={showSignInHandler}>Log In</MenuItem>
                <MenuItem onClick={showSignUpHandler}>Sign Up</MenuItem>
            </Menu>
        </React.Fragment>
    )

    const desktopMenu = (
        <React.Fragment>
            <Button
                color="inherit"
                variant="outlined"
                className={classes.desktopButton}
                onClick={showSignInHandler}
            >
                Log In
            </Button>
            <Button
                color="inherit"
                variant="outlined"
                className={classes.desktopButton}
                onClick={showSignUpHandler}
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