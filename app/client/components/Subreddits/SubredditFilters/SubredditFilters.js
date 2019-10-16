import React from 'react';
import { SubredditSortMethods } from 'constants/SortMethods';
import { SortDropDown } from "components";

export default function SubredditFilters(props) {
    const { sortChangeHandler, sortMethod } = props;

    return (
        <SortDropDown
            selectedMethod={sortMethod}
            sortChangeHandler={sortChangeHandler}
            sortMethods={SubredditSortMethods}
         />
    )
}