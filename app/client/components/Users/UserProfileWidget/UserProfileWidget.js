import React, { useContext } from 'react';
import UserActionMenuContext from 'contexts/UserActionMenuContext';
import {
    Avatar,
    Button,
    Container,
    Typography
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import useStyles from './Styles';

export default function UserProfileWidget() {
    const [, dispatch] = useContext(UserActionMenuContext);
    const classes = useStyles();

    const handleShowChangePassword = () => {
        dispatch({ type: 'CHANGE_PASSWORD' });
    }

    return (
        <Container maxWidth="sm">
            <div className={classes.userProfileContainer}>
                <Avatar className={classes.avatar}>
                    <AccountCircleIcon />
                </Avatar>
                <Typography component="h1" variant="h5" className={classes.userName}>
                    UserName
                </Typography>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.actionButton}
                >
                    Change Email
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.actionButton}
                    onClick={handleShowChangePassword}
                >
                    Change Password
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.actionButton}
                >
                    Delete Account
                </Button>
            </div>
        </Container>
    )
}

