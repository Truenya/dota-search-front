import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ItemType} from "../../shared";
import {Filter, Positions, PositionType} from "../../shared/Types";

export const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        ... new Filter()
    },
    reducers: {
        setItemType: (state: { ItemType: ItemType, MMR: number[], positions: Positions }, action: PayloadAction<ItemType>) => {
            state.ItemType = action.payload;
        },
        togglePos: (state: { ItemType: ItemType, MMR: number[], positions: Positions }, action: PayloadAction<PositionType>) => {
            const pos = action.payload
            state.positions[pos] = !state.positions[pos];
        },
        setMMR: (state: { ItemType: ItemType, MMR: number[], positions: Positions }, action: PayloadAction<number[]>) => {
            state.MMR = action.payload;
        },
    }
})

export type filterState = ReturnType<typeof filtersSlice.getInitialState>;
export const filterActions = filtersSlice.actions;
export const {setItemType, togglePos, setMMR} = filtersSlice.actions;