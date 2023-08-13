import {createSlice} from "@reduxjs/toolkit";
import {ItemTypeC} from "../../shared";

export const itemSlice = createSlice({
    name: 'items',
    initialState: {
        [ItemTypeC.MESSAGE]: [],
        mCount: 0,
        [ItemTypeC.PLAYER]: [],
        pCount: 0,
        [ItemTypeC.COMMAND]: [],
        cCount: 0,
    },
    reducers: {
        addMessage: (state, action) => {
            state.mCount++;
            state[ItemTypeC.MESSAGE].push(action.payload);
        },
        addPlayer: (state, action) => {
            state.pCount++;
            state[ItemTypeC.PLAYER].push(action.payload);
        },
        addCommand: (state, action) => {
            state.cCount++;
            state[ItemTypeC.COMMAND].push(action.payload);
        },
    }
})

export const itemActions = itemSlice.actions;