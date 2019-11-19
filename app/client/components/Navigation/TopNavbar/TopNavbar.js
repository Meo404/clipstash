import React from "react";
import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Typography
} from "@material-ui/core";
import {
    AccountCircle as AccountCircleIcon,
    Menu as MenuIcon
} from "@material-ui/icons";

import useStyles from "./Styles";

export default function TopNavbar(props) {
    const {
        mobileMenuHandler,
        logOutHandler,
        showSignInHandler,
        showSignUpHandler,
        userIsLoggedIn
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
                        <Button
                            color="inherit"
                            variant="outlined"
                            className={classes.desktopButton}
                            onClick={logOutHandler}
                        >
                            Log Out
                        </Button>
                    ) : (
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
                        )}
                </Toolbar>
            </AppBar>
        </header>
    );
}

