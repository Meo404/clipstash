import React from 'react';
import { NavLink } from 'react-router-dom';
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import { Divider, IconButton, Menu, MenuItem } from '@material-ui/core';

import useStyles from './Styles';

export default function NavbarUserMenu(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { logOutHandler, userName } = props;

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <IconButton
                onClick={handleClick}
                className={classes.iconButton}
            >
                <AccountCircleIcon className={classes.menuIcon} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem disabled>{userName}</MenuItem>
                <Divider />
                <NavLink to='/profile' className={classes.navLink}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                </NavLink>
                <MenuItem onClick={logOutHandler}>Logout</MenuItem>
            </Menu>
        </React.Fragment>
    )
}