import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

export default function SectionHeader({ headerText }) {
    const classes = useStyles();

    return (
        <Typography variant="h6" className={classes.headingText}>
            {headerText}
        </Typography>
    )
}

const useStyles = makeStyles(theme => ({
    headingText: {
        paddingTop: 10,
        paddingLeft: 5,
        fontSize: "1rem",
        [theme.breakpoints.up('sm')]: {
            padding: 10,
            fontSize: "1.25rem"
        },
    }
}));