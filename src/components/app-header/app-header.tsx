import './app-header.css';
import FilterPanel from "../filter-panel";
import {Stack} from '@mui/material';
import React from 'react';
import {useAppSelector} from "../app/hooks";

const AppHeader = () => {
    const itemType = useAppSelector(state => state.filter.ItemType);
    const {mCount, pCount, cCount} = useAppSelector(state => state.item);
    const classname = itemType === 'message' ? itemType : '';
    return (
        <Stack direction={"row"} spacing={3} justifyContent={"space-between"}>
            <h2 className={classname}>Dota search</h2>
            <FilterPanel/>
            <h5 className='d-flex justify-content-end'>{mCount} messages, {cCount} commands, {pCount} players</h5>
        </Stack>
    );
};

export default AppHeader;
