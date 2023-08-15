import ListItem from '../list-item';
import './list.css';
import {FIXMELATER} from "../../shared/Constants";
import {Grid} from "@mui/material";
import React from 'react';
import {useAppSelector} from "../app/hooks";
import {filterBySearch, filterByState} from "./FiltersApply";


const List = () => {
    const itemType = useAppSelector(state => state.filter.ItemType);
    const itemxs = useAppSelector(state => state.item[itemType]);
    const term = useAppSelector(state => state.search.term);
    const items = filterBySearch(filterByState(itemxs), term);

    const elements = items.sort(({Timestamp}, b) => {
        if (Timestamp !== b.Timestamp) {
            if (Timestamp < b.Timestamp)
                return 1;
            return -1;
        }
        return 0;
    }).map((item: FIXMELATER) => {
        const {key, ...itemProps} = item;
        return (
            <Grid item className="list-group-item">
                <ListItem
                    {...itemProps}
                />
            </Grid>
        );
    });

    return (
        <Grid container alignItems="stretch" direction="column" className="list">
            {elements}
        </Grid>
    );
};

export default List;
