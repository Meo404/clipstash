import React, { useState, useEffect } from 'react';
import useDebounce from 'utils/useDebounce';
import { FormControl, InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./Styles";

export default function SearchField(props) {
    const { searchChangeHandler } = props;
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState(null);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if (debouncedSearchTerm != null) {
            searchChangeHandler(debouncedSearchTerm);
        }
    },[debouncedSearchTerm]);

    return (
        <FormControl className={classes.formControl}>
            <TextField
                id="standard-search"
                type="search"
                className={classes.searchField}
                margin="normal"
                helperText="Search"
                onChange={e => setSearchTerm(e.target.value)}
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