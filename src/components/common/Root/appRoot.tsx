import {Stack} from "@mui/material";
import AppHeader from "../../app-header";
import SearchPanel from "../../search-panel";
import ItemStatusFilter from "../../item-status-filter";
import List from "../../list";
import ItemAdd from "../../item-add";
import React from "react";

export function AppRoot() {
    return (
        <Stack padding={2}>
            <AppHeader/>
            <div className="top-panel d-flex">
                <SearchPanel/>
                <ItemStatusFilter/>
            </div>
            <List/>
            <ItemAdd/>
        </Stack>
    );
}