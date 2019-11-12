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
        showSignUpHandler
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
                    <Button color="inherit" onClick={showSignUpHandler}>
                        Sign Up
                    </Button>
                </Toolbar>
            </AppBar>
        </header>
    );
}

