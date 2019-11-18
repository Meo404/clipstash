import React from "react";
import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

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
                        className={classes.menuButton}
                        onClick={mobileMenuHandler}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Project Free
                    </Typography>
                    {userIsLoggedIn ? (
                        <Button color="inherit" onClick={logOutHandler}>
                            Log Out
                        </Button>
                    ) : (
                        <React.Fragment>
                            <Button color="inherit" onClick={showSignUpHandler}>
                                Sign Up
                            </Button>
                            <Button color="inherit" onClick={showSignInHandler}>
                                Sign In
                            </Button>
                        </React.Fragment>
                        )}
                </Toolbar>
            </AppBar>
        </header>
    );
}

