import React, { useRef } from "react";
import { FormControl, InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./Styles";

export default function SearchField(props) {
    const { searchChangeHandler } = props;
    const classes = useStyles();

    function testFunction(event) {
    }

    return (
        <FormControl className={classes.formControl}>
            <TextField
                id="standard-search"
                type="search"
                className={classes.searchField}
                margin="normal"
                helperText="Search"
                onChange={testFunction}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon className={classes.searchIcon} />
                        </InputAdornment>
                    )
                }}
            />
        </FormControl>
    )
}