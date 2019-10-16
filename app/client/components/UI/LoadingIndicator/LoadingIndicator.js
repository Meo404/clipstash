import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import useStyles from "./Styles";

export default function loadingIndicator() {
    const classes = useStyles();
    return <CircularProgress classes={{ root: classes.root }} />
}
