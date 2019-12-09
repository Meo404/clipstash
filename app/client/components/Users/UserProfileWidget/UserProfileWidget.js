import React from 'react';
import {
    Avatar,
    Button,
    Container,
    Divider,
    Typography
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import useStyles from './Styles';

export default function UserProfileWidget() {
    const classes = useStyles();

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
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.actionButton}
                >
                    Change Email
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.actionButton}
                >
                    Change Password
                </Button>
                <Button
                    type="submit"
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

