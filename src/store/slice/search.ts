import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        term: ''
    },
    reducers: {
        setTerm: (state: { term: string }, action: PayloadAction<string>) => {
            state.term = action.payload;
        },
    }
})

export const searchActions = searchSlice.actions;