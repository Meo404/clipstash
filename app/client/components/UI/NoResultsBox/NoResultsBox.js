import React from "react";
import { Paper, Typography } from "@material-ui/core";

import useStyles from "./Styles";

export default function NoResultsBox(props) {
    const { headerText, descriptionText } = props;
    const classes = useStyles();

    return (
        <Paper className={classes.noResultsBox}>
            <Typography variant="h6">
                {headerText}
            </Typography>
            <Typography variant="subtitle1">
                {descriptionText}
            </Typography>
        </Paper>
    )
}