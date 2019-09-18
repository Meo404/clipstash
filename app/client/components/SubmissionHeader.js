import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default function SubmissionHeader(props) {
    const { handleSortingChange, sortMethod } = props;
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <Select
                name="sorting"  
                value={sortMethod}
                onChange={handleSortingChange}
                className={classes.selectEmpty}
            >
                <MenuItem value={"hot"}>Hot</MenuItem>
                <MenuItem value={"top_day"}>Top - Daily</MenuItem>
                <MenuItem value={"top_week"}>Top - Weekly</MenuItem>
                <MenuItem value={"top_month"}>Top - Monthly</MenuItem>
                <MenuItem value={"top_year"}>Top - Yearly</MenuItem>
                <MenuItem value={"top_all"}>Top - All</MenuItem>
            </Select>
            <FormHelperText>Sorting</FormHelperText>
        </FormControl>
    )
}

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        float: "right"
    }
}));